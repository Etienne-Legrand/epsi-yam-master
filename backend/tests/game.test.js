const GameService = require("../services/game.service.js");

const grid = [
  [
    { viewContent: "1", id: "brelan1", owner: null, canBeChecked: false },
    { viewContent: "3", id: "brelan3", owner: "player:1", canBeChecked: false },
    { viewContent: "Défi", id: "defi", owner: "player:1", canBeChecked: false },
    { viewContent: "4", id: "brelan4", owner: "player:1", canBeChecked: false },
    { viewContent: "6", id: "brelan6", owner: "player:1", canBeChecked: false },
  ],
  [
    { viewContent: "2", id: "brelan2", owner: "player:1", canBeChecked: false },
    {
      viewContent: "Carré",
      id: "carre",
      owner: "player:1",
      canBeChecked: false,
    },
    { viewContent: "Sec", id: "sec", owner: "player:1", canBeChecked: false },
    { viewContent: "Full", id: "full", owner: null, canBeChecked: false },
    { viewContent: "5", id: "brelan5", owner: "player:1", canBeChecked: false },
  ],
  [
    { viewContent: "≤8", id: "moinshuit", owner: null, canBeChecked: false },
    { viewContent: "Full", id: "full", owner: null, canBeChecked: false },
    { viewContent: "Yam", id: "yam", owner: "player:1", canBeChecked: false },
    { viewContent: "Défi", id: "defi", owner: "player:1", canBeChecked: false },
    { viewContent: "Suite", id: "suite", owner: null, canBeChecked: false },
  ],
  [
    { viewContent: "6", id: "brelan6", owner: "player:1", canBeChecked: false },
    { viewContent: "Sec", id: "sec", owner: null, canBeChecked: false },
    {
      viewContent: "Suite",
      id: "suite",
      owner: "player:1",
      canBeChecked: false,
    },
    { viewContent: "≤8", id: "moinshuit", owner: null, canBeChecked: false },
    { viewContent: "1", id: "brelan1", owner: "player:1", canBeChecked: false },
  ],
  [
    { viewContent: "3", id: "brelan3", owner: null, canBeChecked: false },
    { viewContent: "2", id: "brelan2", owner: "player:1", canBeChecked: false },
    {
      viewContent: "Carré",
      id: "carre",
      owner: null,
      canBeChecked: false,
    },
    { viewContent: "5", id: "brelan5", owner: "player:1", canBeChecked: false },
    { viewContent: "4", id: "brelan4", owner: null, canBeChecked: false },
  ],
];

const grid2 = [
  [
    {
      viewContent: "1",
      id: "brelan1",
      owner: null,
      canBeChecked: false,
    },
    {
      viewContent: "3",
      id: "brelan3",
      owner: null,
      canBeChecked: false,
    },
    {
      viewContent: "Défi",
      id: "defi",
      owner: null,
      canBeChecked: false,
    },
    {
      viewContent: "4",
      id: "brelan4",
      owner: null,
      canBeChecked: false,
    },
    {
      viewContent: "6",
      id: "brelan6",
      owner: null,
      canBeChecked: false,
    },
  ],
  [
    {
      viewContent: "2",
      id: "brelan2",
      owner: "player:1",
      canBeChecked: false,
    },
    {
      viewContent: "Carré",
      id: "carre",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "Sec",
      id: "sec",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "Full",
      id: "full",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "5",
      id: "brelan5",
      owner: "player:2",
      canBeChecked: false,
    },
  ],
  [
    {
      viewContent: "≤8",
      id: "moinshuit",
      owner: "player:1",
      canBeChecked: false,
    },
    {
      viewContent: "Full",
      id: "full",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "Yam",
      id: "yam",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "Défi",
      id: "defi",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "Suite",
      id: "suite",
      owner: "player:2",
      canBeChecked: false,
    },
  ],
  [
    {
      viewContent: "6",
      id: "brelan6",
      owner: "player:1",
      canBeChecked: false,
    },
    {
      viewContent: "Sec",
      id: "sec",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "Suite",
      id: "suite",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "≤8",
      id: "moinshuit",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "1",
      id: "brelan1",
      owner: "player:2",
      canBeChecked: false,
    },
  ],
  [
    {
      viewContent: "3",
      id: "brelan3",
      owner: "player:2",
      canBeChecked: false,
    },
    {
      viewContent: "2",
      id: "brelan2",
      owner: "player:1",
      canBeChecked: false,
    },
    {
      viewContent: "Carré",
      id: "carre",
      owner: "player:1",
      canBeChecked: false,
    },
    {
      viewContent: "5",
      id: "brelan5",
      owner: "player:1",
      canBeChecked: false,
    },
    {
      viewContent: "4",
      id: "brelan4",
      owner: "player:1",
      canBeChecked: false,
    },
  ],
];

const displayGrid = (grid) => {
  let output = "";
  for (let row of grid) {
    let rowOutput = "| ";
    for (let cell of row) {
      if (cell.owner === "player:1") {
        rowOutput += "X | ";
      } else if (cell.owner === "player:2") {
        rowOutput += "O | ";
      } else {
        rowOutput += "  | ";
      }
    }
    output += rowOutput + "\n";
    output += "-".repeat(rowOutput.length) + "\n";
  }
  console.log(output);
};

// Affichage du tableau
displayGrid(grid2);

// Test de la fonction calculateScore
describe("GameService", () => {
  describe("calculateScore", () => {
    it("should correctly calculate the score of grid", () => {
      const scorePlayer1 = GameService.utils.calculateScore("player:1", grid);
      const scorePlayer2 = GameService.utils.calculateScore("player:2", grid);
      expect(scorePlayer1.score).toEqual(9);
      expect(scorePlayer2.score).toEqual(0);
      expect(scorePlayer1.winner).toEqual(null);
    });

    it("should correctly calculate the score of grid2", () => {
      const scorePlayer1 = GameService.utils.calculateScore("player:1", grid2);
      const scorePlayer2 = GameService.utils.calculateScore("player:2", grid2);
      expect(scorePlayer1.score).toEqual(3);
      expect(scorePlayer2.score).toEqual(15);
      expect(scorePlayer1.winner).toEqual(null);
    });

    it("should return 0 when no cells are owned by the player", () => {
      const grid = [
        [{ owner: null }, { owner: null }, { owner: null }, { owner: null }],
        [{ owner: null }, { owner: null }, { owner: null }, { owner: null }],
      ];
      const scorePlayer1 = GameService.utils.calculateScore("player:1", grid);
      expect(scorePlayer1.score).toEqual(0);
    });

    it("should return 0 when the player is not specified", () => {
      const grid = [
        [{ owner: "player:1" }, { owner: "player:2" }, { owner: "player:1" }],
        [{ owner: "player:1" }, { owner: "player:1" }, { owner: "player:1" }],
      ];
      const scoreNoPlayer = GameService.utils.calculateScore(null, grid);
      expect(scoreNoPlayer.score).toEqual(0);
    });

    it("should return the winner when lining up 5 pawns", () => {
      const grid = [
        [
          { owner: "player:1" },
          { owner: "player:2" },
          { owner: "player:1" },
          { owner: "player:2" },
          { owner: "player:1" },
        ],
        [
          { owner: "player:1" },
          { owner: "player:1" },
          { owner: "player:1" },
          { owner: "player:1" },
          { owner: "player:1" },
        ],
      ];
      const scorePlayer1 = GameService.utils.calculateScore("player:1", grid);
      expect(scorePlayer1.winner).toEqual("player:1");
    });
  });
});
