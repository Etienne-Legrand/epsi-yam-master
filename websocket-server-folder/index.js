const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
var uniqid = require("uniqid");
const GameService = require("./services/game.service.js");

// ---------------------------------------------------
// -------- CONSTANTS AND GLOBAL VARIABLES -----------
// ---------------------------------------------------

let queue = [];
let games = [];

// ---------------------------------
// -------- GAME METHODS -----------
// ---------------------------------

const emitGameStart = (game) => {
  game.player1Socket.emit(
    "game.start",
    GameService.send.forPlayer.viewGameState("player:1", game)
  );
  game.player2Socket.emit(
    "game.start",
    GameService.send.forPlayer.viewGameState("player:2", game)
  );
};

const updateClientViewTimer = (game) => {
  game.player1Socket.emit(
    "game.timer",
    GameService.send.forPlayer.gameTimer("player:1", game.gameState)
  );
  game.player2Socket.emit(
    "game.timer",
    GameService.send.forPlayer.gameTimer("player:2", game.gameState)
  );
};

const updateGameInterval = (game) => {
  game.gameState.timer--;

  // Si le timer tombe à zéro
  if (game.gameState.timer === 0) {
    // On change de tour en inversant le clé dans 'currentTurn'
    game.gameState.currentTurn =
      game.gameState.currentTurn === "player:1" ? "player:2" : "player:1";

    // Méthode du service qui renvoie la constante 'TURN_DURATION'
    game.gameState.timer = GameService.timer.getTurnDuration();
  }

  // On notifie finalement les clients que les données sont mises à jour.
  updateClientViewTimer(game);
};

const newPlayerInQueue = (socket) => {
  queue.push(socket);

  // Queue management
  if (queue.length >= 2) {
    const player1Socket = queue.shift();
    const player2Socket = queue.shift();
    createGame(player1Socket, player2Socket);
  } else {
    socket.emit("queue.added", GameService.send.forPlayer.viewQueueState());
  }
};

const createGame = (player1Socket, player2Socket) => {
  const newGame = GameService.init.gameState();
  newGame["idGame"] = uniqid();
  newGame["player1Socket"] = player1Socket;
  newGame["player2Socket"] = player2Socket;

  games.push(newGame);

  const gameIndex = GameService.utils.findGameIndexById(games, newGame.idGame);
  const game = games[gameIndex];

  // On execute une fonction toutes les secondes (1000 ms)
  const gameInterval = setInterval(() => updateGameInterval(game), 1000);

  // Send game start event to players
  emitGameStart(game);

  // On prévoit de couper l'horloge
  // pour le moment uniquement quand le socket se déconnecte
  player1Socket.on("disconnect", () => {
    clearInterval(gameInterval);
  });

  player2Socket.on("disconnect", () => {
    clearInterval(gameInterval);
  });
};

const leaveQueue = (socket) => {
  console.log("queue before: ", queue);
  const index = queue.indexOf(socket);
  if (index > -1) {
    queue.splice(index, 1);
  }
  console.log("queue after: ", queue);

  socket.emit("queue.removed", GameService.send.forPlayer.viewQueueState());
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

  socket.on("disconnect", (reason) => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});

// -----------------------------------
// -------- SERVER METHODS -----------
// -----------------------------------

app.get("/", (req, res) => res.sendFile("index.html"));

http.listen(3000, function () {
  console.log("listening on *:3000");
});
