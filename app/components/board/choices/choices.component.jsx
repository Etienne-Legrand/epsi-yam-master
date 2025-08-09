import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import Choice from "./choice.component";
import { colors } from "../../../constants/colors";

const Choices = () => {
  const socket = useContext(SocketContext);

  const [displayChoices, setDisplayChoices] = useState(false);
  const [canMakeChoice, setCanMakeChoice] = useState(false);
  const [idSelectedChoice, setIdSelectedChoice] = useState(null);
  const [availableChoices, setAvailableChoices] = useState([]);

  useEffect(() => {
    socket.on("game.choices.view-state", (data) => {
      setDisplayChoices(data["displayChoices"]);
      setCanMakeChoice(data["canMakeChoice"]);
      setIdSelectedChoice(data["idSelectedChoice"]);
      setAvailableChoices(data["availableChoices"]);
    });
  }, []);

  const handleSelectChoice = (choiceId) => {
    if (canMakeChoice) {
      setIdSelectedChoice(choiceId);
      socket.emit("game.choices.selected", choiceId);
    }
  };

  return (
    <View style={styles.choicesContainer}>
      <Text style={styles.choiceTitle}>Choix:</Text>
      {availableChoices.length === 0 ? (
        <View style={styles.noChoicesContainer}>
          <Text style={styles.noChoicesText}>Pas de choix disponibles</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.choicesScrollView}
        >
          {displayChoices &&
            availableChoices.map((choice) => (
              <Choice
                key={choice.id}
                choice={choice}
                idSelectedChoice={idSelectedChoice}
                canMakeChoice={canMakeChoice}
                onPress={handleSelectChoice}
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  choicesContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderRadius: 25,
    borderColor: colors.indigo,
    backgroundColor: colors.indigo,
  },
  choicesText: {
    marginLeft: 10,
  },
  noChoicesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  choicesScrollView: {
    flex: 1,
  },
  choiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    marginLeft: 15,
  },
  noChoicesText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.white,
  },
});

export default Choices;
