//Fonction permettant de formater les données des dés pour l'IA
const formatDicesTrainingAI = (dices) => {
  let inputValues = [];
  let outputValues = [];

  // Ne rien renvoyer si les dés ne sont pas définis
  if (!dices[0].value) {
    return null;
  }

  dices.forEach((item) => {
    inputValues.push(parseInt(item.value)); // Conversion des chiffres des dés en entiers
    outputValues.push(item.locked ? 1 : 0); // Conversion des valeurs booléennes en entiers
  });

  return JSON.stringify({
    input: inputValues,
    output: outputValues,
  });
};

const formatDicesRunAI = (dices) => {
  let inputValues = [];

  if (!dices[0].value) {
    return null;
  }

  dices.forEach((item) => {
    inputValues.push(parseInt(item.value));
  });

  return inputValues;
};

module.exports = { formatDicesTrainingAI, formatDicesRunAI };
