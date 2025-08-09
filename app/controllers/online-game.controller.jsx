import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import Board from "../components/board/board.component";
import Header from "../components/header";
import Button from "../components/button";
import { colors } from "../constants/colors";

export default function OnlineGameController({ navigation }) {
  const socket = useContext(SocketContext);

  const [inQueue, setInQueue] = useState(false);
  const [inGame, setInGame] = useState(false);

  // fonction pour quitter la queue
  const leaveQueue = () => {
    console.log("[emit][queue.leave]:", socket.id);
    socket.emit("queue.leave");
    navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    // Rejoindre la queue
    console.log("[emit][queue.join]:", socket.id);
    socket.emit("queue.join");
    setInQueue(false);
    setInGame(false);

    // Quand le joueur est dans la queue
    socket.on("queue.added", (data) => {
      console.log("[listen][queue.added]:", data);
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
    });

    // Quand le joueur est en jeu
    socket.on("game.start", (data) => {
      console.log("[listen][game.start]:", data);
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
    });

    // Quand le joueur quitte la queue
    socket.on("queue.removed", (data) => {
      console.log("[listen][queue.leave]:", data);
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
    });

    // Quand jeu est terminé
    socket.on("game.end", (data) => {
      navigation.navigate("GameSummaryScreen", { data });
    });
  }, []);

  return (
    <View style={styles.container}>
      {!inQueue && !inGame && (
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

      {inQueue && (
        <>
          <Header />
          <Text style={[styles.paragraph, styles.spacing]}>
            En attente d'un autre joueur...
          </Text>
          <Button onPress={leaveQueue} text="Quitter la file" iconName="home" />
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
});
