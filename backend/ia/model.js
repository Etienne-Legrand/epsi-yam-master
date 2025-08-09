const brain = require("./libs/brain.js");
const fs = require("fs");

// Entraîner un modèle
const trainModel = (dataPath, modelPath) => {
  const trainingData = loadJSON(dataPath);
  const net = new brain.NeuralNetwork({
    hiddenLayers: [10, 7, 5],
    outputSize: 5,
    learningRate: 0.01,
    iterations: 40000,
  });
  net.train(trainingData);

  saveModel(modelPath, net);
};

// Lancer un modèle
const runModel = (modelPath, inputValues) => {
  const model = loadJSON(modelPath);
  const net = new brain.NeuralNetwork();
  net.fromJSON(model);

  return net.run(inputValues);
};

// Sauvegarder un modèle dans un fichier JSON
const saveModel = (modelPath, net) => {
  fs.writeFileSync(modelPath, JSON.stringify(net.toJSON()));
};

// Charger un fichier JSON
const loadJSON = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

module.exports = { trainModel, runModel };
