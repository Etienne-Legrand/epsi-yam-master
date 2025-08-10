import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import Dice from "./dice.component";

const OpponentDeck = () => {
  const socket = useContext(SocketContext);
  const [displayDeck, setDisplayDeck] = useState(false);
  const [dices, setDices] = useState([
    { id: 1, value: "", locked: false },
    { id: 2, value: "", locked: false },
    { id: 3, value: "", locked: false },
    { id: 4, value: "", locked: false },
    { id: 5, value: "", locked: false },
  ]);
  const [rollsCounter, setRollsCounter] = useState(0);

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      // console.log("game.deck.view-state", data);
      setDisplayDeck(data["displayOpponentDeck"]);
      if (data["displayOpponentDeck"]) {
        setRollsCounter(data["rollsCounter"]);
        setDices(data["dices"]);
      }
    });
  }, []);

  return (
    <View style={styles.deckOpponentContainer}>
      {displayDeck && (
        <View style={styles.diceContainer}>
          {dices.map((diceData, index) => (
            <Dice
              key={diceData.id}
              index={index}
              locked={diceData.locked}
              value={diceData.value}
              onPress={() => {}} // No-op for opponent dices
              opponent={true}
              rollsCounter={rollsCounter}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deckOpponentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  diceContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default OpponentDeck;
