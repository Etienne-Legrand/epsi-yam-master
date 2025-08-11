import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import Board from "../components/board/board.component";
import Header from "../components/header";
import Button from "../components/button";
import { colors } from "../constants/colors";

export default function VsBotGameController({ navigation }) {
  const socket = useContext(SocketContext);
  const [inGame, setInGame] = useState(false);
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    socket.on("game.start", (data) => {
      console.log("[listen][game.start]:", data);
      setInGame(data["inGame"]);
    });

    // Quand jeu est terminé
    socket.on("game.end", (data) => {
      navigation.navigate("GameSummaryScreen", { data });
    });
  }, []);

  const handleDifficultyChange = (diff) => {
    setDifficulty(diff);
    socket.emit("vsbot.join", { difficulty: diff });
  };

  return (
    <View style={styles.container}>
      {!inGame && !difficulty && (
        <>
          <Header />
          <Text style={[styles.paragraph, styles.spacing]}>
            Sélectionnez la difficulté
          </Text>
          <Button
            style={styles.mb20}
            onPress={() => {
              handleDifficultyChange(1);
            }}
            text="Facile"
            iconNameMaterial="robot-happy"
          />
          <Button
            style={styles.mb20}
            onPress={() => {
              handleDifficultyChange(2);
            }}
            text="Normal"
            iconNameMaterial="robot"
          />
          <Button
            style={styles.mb20}
            onPress={() => {
              handleDifficultyChange(3);
            }}
            text="Difficile"
            iconNameMaterial="robot-angry"
            disabled={true}
          />
          <Button
            onPress={() => navigation.navigate("HomeScreen")}
            text="Revenir au menu"
            iconName="home"
            style={{ marginTop: 50 }}
          />
        </>
      )}

      {!inGame && difficulty && (
        <>
          <Header />
          <Text style={[styles.paragraph, styles.spacing]}>
            En attente du serveur...
          </Text>
          <Button
            onPress={() => navigation.navigate("HomeScreen")}
            text="Revenir au menu"
            iconName="home"
          />
        </>
      )}

      {inGame && <Board navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: colors.darkBlue,
  },
  paragraph: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.mauve,
  },
  spacing: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  mb20: {
    marginBottom: 20,
  },
});
