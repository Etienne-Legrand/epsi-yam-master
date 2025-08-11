const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const uniqid = require("uniqid");
const GameService = require("./services/game.service.js");
const { formatDicesTrainingAI, formatDicesRunAI } = require("./ia/utils.js");
const { runModel } = require("./ia/model.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

server.listen(3000, function () {
  console.log("listening on *:3000");
});

// ---------------------------------------------------
// -------- CONSTANTS AND GLOBAL VARIABLES -----------
// ---------------------------------------------------

let queue = [];
let games = [];
const modelLockDices = "./ia/models/model_lock_dices.json";

// ---------------------------------
// -------- EMIT METHODS -----------
// ---------------------------------

const emitToPlayers = (game, event, argsPlayer1, argsPlayer2) => {
  game.player1Socket.emit(event, argsPlayer1);
  if (!game.player2Socket.isBot) {
    game.player2Socket.emit(event, argsPlayer2);
  }
};

const emitClientsViewGameStart = (game) =>
  emitToPlayers(
    game,
    "game.start",
    GameService.send.forPlayer.gameViewState("player:1", game),
    GameService.send.forPlayer.gameViewState("player:2", game)
  );

const updateClientsViewTimers = (game) =>
  emitToPlayers(
    game,
    "game.timer",
    GameService.send.forPlayer.gameTimer("player:1", game.gameState),
    GameService.send.forPlayer.gameTimer("player:2", game.gameState)
  );

const updateClientsViewPawns = (game) =>
  emitToPlayers(
    game,
    "game.pawns",
    GameService.send.forPlayer.gamePawns("player:1", game.gameState),
    GameService.send.forPlayer.gamePawns("player:2", game.gameState)
  );

const updateClientsViewDecks = (game) =>
  emitToPlayers(
    game,
    "game.deck.view-state",
    GameService.send.forPlayer.deckViewState("player:1", game.gameState),
    GameService.send.forPlayer.deckViewState("player:2", game.gameState)
  );

const updateClientsViewChoices = (game) =>
  emitToPlayers(
    game,
    "game.choices.view-state",
    GameService.send.forPlayer.choicesViewState("player:1", game.gameState),
    GameService.send.forPlayer.choicesViewState("player:2", game.gameState)
  );

const updateClientsViewGrid = (game) =>
  emitToPlayers(
    game,
    "game.grid.view-state",
    GameService.send.forPlayer.gridViewState("player:1", game.gameState),
    GameService.send.forPlayer.gridViewState("player:2", game.gameState)
  );

function updateClientsViewScore(game) {
  emitToPlayers(
    game,
    "score.update",
    GameService.send.forPlayer.gameScore("player:1", game.gameState),
    GameService.send.forPlayer.gameScore("player:2", game.gameState)
  );
}

function updateClientsViewEnd(game) {
  emitToPlayers(
    game,
    "game.end",
    GameService.send.forPlayer.gameSummary("player:1", game),
    GameService.send.forPlayer.gameSummary("player:2", game)
  );
}

// ---------------------------------
// -------- GAME METHODS -----------
// ---------------------------------

const updateGameInterval = (game) => {
  game.gameState.timer--;

  // if timer is down to 0, we end turn
  if (game.gameState.timer === 0) {
    // switch currentTurn variable
    game.gameState.currentTurn =
      game.gameState.currentTurn === "player:1" ? "player:2" : "player:1";

    // Reset timer, deck, choices and grid
    game.gameState.timer = GameService.timer.getTurnDuration();
    game.gameState.deck = GameService.init.deck();
    game.gameState.choices = GameService.init.choices();
    game.gameState.grid = GameService.grid.resetCanBeCheckedCells(
      game.gameState.grid
    );

    // Update clients view decks, choices and grid
    updateClientsViewDecks(game);
    updateClientsViewChoices(game);
    updateClientsViewGrid(game);

    // Bot turn
    botPlay(game);
  }
  // Update clients view timers
  updateClientsViewTimers(game);
};

const handlePlayersDisconnects = (game, gameInterval) => {
  const disconnect = (playerKey, reason = "disconnect") => {
    // Marquer qui a quitté et pourquoi
    game.gameState.disconnection.reason = reason;
    game.gameState.disconnection.playerKey = playerKey;

    clearInterval(gameInterval);
    updateClientsViewEnd(game);
    games = GameService.utils.deleteGame(games, game);
  };

  game.player1Socket.on("disconnect", () =>
    disconnect("player:1", "disconnect")
  );
  game.player1Socket.on("game.leave", () => disconnect("player:1", "leave"));

  if (!game.player2Socket.isBot) {
    game.player2Socket.on("disconnect", () =>
      disconnect("player:2", "disconnect")
    );
    game.player2Socket.on("game.leave", () => disconnect("player:2", "leave"));
  }
};

const createGame = (player1Socket, player2Socket, data) => {
  // init objet (game) with this first level of structure:
  // - gameState : { .. evolutive object .. }
  // - idGame : just in case ;)
  // - player1Socket: socket instance key "joueur:1"
  // - player2Socket: socket instance key "joueur:2"
  const newGame = JSON.parse(JSON.stringify(GameService.init.gameState()));
  newGame["idGame"] = uniqid();
  newGame["player1Socket"] = player1Socket;

  if (player2Socket === "bot") {
    newGame["player2Socket"] = { id: "bot-" + newGame["idGame"], isBot: true };
    newGame.gameState.bot.hasBot = true;
    newGame.gameState.bot.difficulty = data.difficulty;
  } else {
    newGame["player2Socket"] = player2Socket;
  }

  games.push(newGame);

  // Send game start event to players
  emitClientsViewGameStart(newGame);

  // Update clients view with a small delay to ensure all connections are ready
  setTimeout(() => {
    updateClientsViewGrid(newGame);
    updateClientsViewDecks(newGame);
    updateClientsViewTimers(newGame);
    updateClientsViewPawns(newGame);
  }, 150);

  // Timer every second
  const gameInterval = setInterval(() => updateGameInterval(newGame), 1000);

  // When a player disconnects, we clear the timer
  handlePlayersDisconnects(newGame, gameInterval);
};

const newPlayerInQueue = (socket) => {
  queue.push(socket);

  // Queue management
  if (queue.length >= 2) {
    const player1Socket = queue.shift();
    const player2Socket = queue.shift();
    createGame(player1Socket, player2Socket, null);
  } else {
    socket.emit("queue.added", GameService.send.forPlayer.queueViewState());
  }
};

const leaveQueue = (socket) => {
  const index = queue.indexOf(socket);
  if (index > -1) queue.splice(index, 1);

  socket.emit("queue.removed", GameService.send.forPlayer.queueViewState());
};

const rollDices = (game) => {
  // Enlève la surbrillance des cases précédemment cliquables
  game.gameState.grid = GameService.grid.resetCanBeCheckedCells(
    game.gameState.grid
  );

  // Roll dices
  const dices = GameService.dices.roll(game.gameState.deck.dices);
  game.gameState.deck.dices = dices;
  game.gameState.deck.rollsCounter++;

  // Constants for rolls management
  const rollsCounter = game.gameState.deck.rollsCounter;
  const rollsMaximum = game.gameState.deck.rollsMaximum;
  const isDefi = false;
  const isSec = rollsCounter === 2;
  const combinations = GameService.choices.findCombinations(
    dices,
    isDefi,
    isSec
  );

  // Update available choices
  game.gameState.choices.availableChoices = combinations;

  // if last roll we lock every dice
  if (rollsCounter - 1 === rollsMaximum) {
    // game.gameState.deck.dices = GameService.dices.lockEveryDice(dices);
    if (game.gameState.timer < 5 || combinations.length === 0) {
      game.gameState.timer = 5;
    }
  }

  // Update clients view with a small delay to ensure animations sync
  setTimeout(() => {
    updateClientsViewDecks(game);
  }, 100);
  updateClientsViewChoices(game);
  updateClientsViewGrid(game);
};

const selectChoice = (game, idChoice) => {
  // Gestion des choix
  game.gameState.choices.idSelectedChoice = idChoice;

  // Enlève la surbrillance des cases précédemment cliquables et met en surbrillance les cases cliquables (quand on change de choix)
  game.gameState.grid = GameService.grid.resetCanBeCheckedCells(
    game.gameState.grid
  );
  game.gameState.grid = GameService.grid.updateGridAfterSelectingChoice(
    idChoice,
    game.gameState.grid
  );

  updateClientsViewChoices(game);
  updateClientsViewGrid(game);
};

const selectCell = (game, cellId, rowIndex, cellIndex) => {
  // La sélection d'une cellule signifie la fin du tour (ou plus tard le check des conditions de victoires)
  // On reset l'état des cases qui étaient précédemment cliquables.
  game.gameState.grid = GameService.grid.resetCanBeCheckedCells(
    game.gameState.grid
  );
  game.gameState.grid = GameService.grid.selectCell(
    cellId,
    rowIndex,
    cellIndex,
    game.gameState.currentTurn,
    game.gameState.grid
  );

  // Calcul du score d'un joueur et du gagnant
  const { score, winner } = GameService.utils.calculateScore(
    game.gameState.currentTurn,
    game.gameState.grid
  );

  // Décrementation des pionts lorsqu'un joueur en place un + Mise à jour du score
  if (game.gameState.currentTurn === "player:1") {
    game.gameState.player1Pawns--;
    game.gameState.player1Score = score;
  } else if (game.gameState.currentTurn === "player:2") {
    game.gameState.player2Pawns--;
    game.gameState.player2Score = score;
  }

  // Puis check si la partie s'arrête (plus de pions ou gagnant trouvé avec calculateScore)
  const hasNoMorePawns =
    game.gameState.player1Pawns === 0 || game.gameState.player2Pawns === 0; // Plus de pions

  // Mise à jour du gagnant
  if (hasNoMorePawns || winner) {
    if (winner) {
      game.gameState.winner = winner;
    } else if (game.gameState.player1Score > game.gameState.player2Score) {
      game.gameState.winner = "player:1";
    } else if (game.gameState.player1Score < game.gameState.player2Score) {
      game.gameState.winner = "player:2";
    } else {
      game.gameState.winner = null;
    }
  }

  // Si la partie est terminée, on met à jour la vue de fin
  if (game.gameState.winner || hasNoMorePawns) {
    updateClientsViewEnd(game);
  } // Sinon on finit le tour
  else {
    game.gameState.currentTurn =
      game.gameState.currentTurn === "player:1" ? "player:2" : "player:1";

    // On remet le timer, le deck et les choix par défaut (la grille ne change pas)
    game.gameState.timer = GameService.timer.getTurnDuration();
    game.gameState.deck = GameService.init.deck();
    game.gameState.choices = GameService.init.choices();

    // et on remet à jour les vues
    updateClientsViewTimers(game);
    updateClientsViewPawns(game);
    updateClientsViewScore(game);
    updateClientsViewDecks(game);
    updateClientsViewChoices(game);
    updateClientsViewGrid(game);
  }
};

// Unlock or lock dice
const toggleDice = (game, idDice) => {
  const diceIndex = GameService.utils.findDiceIndexByDiceId(
    game.gameState.deck.dices,
    idDice
  );
  game.gameState.deck.dices[diceIndex].locked =
    !game.gameState.deck.dices[diceIndex].locked;
  updateClientsViewDecks(game);
};

const lockDice = (game, idDice) => {
  const diceIndex = GameService.utils.findDiceIndexByDiceId(
    game.gameState.deck.dices,
    idDice
  );
  game.gameState.deck.dices[diceIndex].locked = true;
  updateClientsViewDecks(game);
};

const botLockDices = async (game) => {
  await delay(1000);
  const { dices } = game.gameState.deck;

  if (game.gameState.deck.rollsCounter <= game.gameState.deck.rollsMaximum) {
    // Unlocked all dices
    game.gameState.deck.dices = GameService.dices.unlockEveryDice(dices);

    // Run AI model to calculate which dices to lock
    const dicesFormatted = formatDicesRunAI(dices);
    const output = runModel(modelLockDices, dicesFormatted);
    // Lock dices
    for (let i = 0; i < output.length; i++) {
      if (output[i] >= 0.85) {
        await delay(300);
        lockDice(game, dices[i].id);
      }
    }
    setTimeout(() => {
      updateClientsViewDecks(game);
    }, 100);
  }
};

const botEasyMakeDecision = async (game) => {
  // Loop through all choices available
  for (let i = 0; i < game.gameState.choices.availableChoices.length; i++) {
    const choice = game.gameState.choices.availableChoices[i];
    await delay(1500);
    selectChoice(game, choice.id);
    await delay(1500);

    // Find cell that can be checked
    const resultFindCell = GameService.grid.findCellCanBeChecked(
      game.gameState.grid
    );
    if (resultFindCell) {
      const { cell, rowIndex, cellIndex } = resultFindCell;
      selectCell(game, cell.id, rowIndex, cellIndex);
      break; // Exit loop
    }
  }
};

const botNormalMakeDecision = async (game) => {
  await botLockDices(game);
  await botEasyMakeDecision(game);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const botPlay = async (game) => {
  if (game.gameState.bot.hasBot && game.gameState.currentTurn === "player:2") {
    // 3 rolls max
    for (let i = 0; i < 3; i++) {
      if (
        game.gameState.bot.hasBot &&
        game.gameState.currentTurn === "player:2"
      ) {
        await delay(1500);
        rollDices(game);

        // make decision based on difficulty
        if (game.gameState.bot.difficulty === 1) {
          await botEasyMakeDecision(game);
        } else if (game.gameState.bot.difficulty === 2) {
          await botNormalMakeDecision(game);
        }
      } else break;
    }
  }
};

// ---------------------------------------
// -------- SOCKETS MANAGEMENT -----------
// ---------------------------------------

io.on("connection", (socket) => {
  console.log(`[${socket.id}] socket connected`);

  socket.on("queue.join", () => {
    console.log(`[${socket.id}] new player in queue `);
    newPlayerInQueue(socket);
  });

  socket.on("queue.leave", () => {
    console.log(`[${socket.id}] player leave the queue`);
    leaveQueue(socket);
  });

  socket.on("vsbot.join", (data) => {
    console.log(`[${socket.id}] player start a game against the bot`);
    createGame(socket, "bot", data);
  });

  socket.on("game.dices.roll", () => {
    const game = GameService.utils.findGameBySocketId(games, socket.id);

    // DEV: format dices for AI training
    // const dices = game.gameState.deck.dices;
    // const dicesFormatted = formatDicesTrainingAI(dices);
    // if (dicesFormatted) {
    //   console.log(dicesFormatted, ",");
    // }

    rollDices(game);
  });

  socket.on("game.dices.lock", (idDice) => {
    const game = GameService.utils.findGameBySocketId(games, socket.id);
    toggleDice(game, idDice);
  });

  socket.on("game.choices.selected", (idChoice) => {
    const game = GameService.utils.findGameBySocketId(games, socket.id);
    selectChoice(game, idChoice);
  });

  socket.on("game.grid.selected", ({ cellId, rowIndex, cellIndex }) => {
    const game = GameService.utils.findGameBySocketId(games, socket.id);
    selectCell(game, cellId, rowIndex, cellIndex);
    // Bot turn
    botPlay(game);
  });

  socket.on("disconnect", (reason) => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
    queue = GameService.utils.removePlayerFromQueue(queue, socket);
  });
});
