import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

const Choice = ({ choice, idSelectedChoice, canMakeChoice, onPress }) => {
  const handlePress = () => onPress(choice.id);

  return (
    <TouchableOpacity
      key={choice.id}
      style={[
        styles.choiceButton,
        idSelectedChoice === choice.id && styles.selectedChoice,
        !canMakeChoice && styles.disabledChoice,
      ]}
      onPress={handlePress}
      disabled={!canMakeChoice}
    >
      <Text style={styles.choiceText}>{choice.value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choiceButton: {
    backgroundColor: colors.beige,
    borderRadius: 5,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 40,
  },
  selectedChoice: {
    backgroundColor: colors.lightPink,
  },
  disabledChoice: {
    opacity: 0.5,
  },
  choiceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.indigo,
  },
});

export default Choice;
