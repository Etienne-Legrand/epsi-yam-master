import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import Dice from "./dice.component";
import Button from "../../button";

const PlayerDeck = () => {
  const socket = useContext(SocketContext);
  const [displayPlayerDeck, setDisplayPlayerDeck] = useState(false);
  const [dices, setDices] = useState(Array(5).fill(false));
  const [displayRollButton, setDisplayRollButton] = useState(false);
  const [rollsCounter, setRollsCounter] = useState(0);
  const [rollsMaximum, setRollsMaximum] = useState(3);

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      setDisplayPlayerDeck(data["displayPlayerDeck"]);
      if (data["displayPlayerDeck"]) {
        setDisplayRollButton(data["displayRollButton"]);
        setRollsCounter(data["rollsCounter"]);
        setRollsMaximum(data["rollsMaximum"]);
        setDices(data["dices"]);
      }
    });
  }, []);

  const toggleDiceLock = (index, opponent) => {
    if (!opponent) {
      const newDices = [...dices];
      if (newDices[index].value !== "" && displayRollButton) {
        socket.emit("game.dices.lock", newDices[index].id);
      }
    }
  };

  const rollDices = () => {
    if (rollsCounter <= rollsMaximum) {
      socket.emit("game.dices.roll");
    }
  };

  return (
    <View style={styles.deckPlayerContainer}>
      {displayPlayerDeck && (
        <>
          <View style={styles.diceContainer}>
            {dices.map((diceData, index) => (
              <View key={diceData.id}>
                <Dice
                  key={diceData.id}
                  index={index}
                  locked={diceData.locked}
                  value={diceData.value}
                  onPress={toggleDiceLock}
                  opponent={false}
                  rollsCounter={rollsCounter}
                />
              </View>
            ))}
          </View>

          {displayRollButton && (
            <>
              <Button
                onPress={rollDices}
                text={`Lancer ${rollsCounter} / ${rollsMaximum}`}
                iconName="dice"
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deckPlayerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  diceContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default PlayerDeck;
