const runModel = require("./model.js");

const modelPath = "./models/model_lock_dices.json";
const inputValues = [1, 6, 1, 1, 2];
const output = runModel(modelPath, inputValues);
console.log("Run :", output);
