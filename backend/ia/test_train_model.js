const trainModel = require("./model.js");

const dataPath = "./data/data_lock_dices.json";
const modelPath = "./models/model_lock_dices.json";

trainModel(dataPath, modelPath);
