import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import Board from "../components/board/board.component";

export default function OnlineGameController({ navigation }) {
  const socket = useContext(SocketContext);

  const [inQueue, setInQueue] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [idOpponent, setIdOpponent] = useState(null);

  // Écouter l'événement 'game.end'
  useEffect(() => {
    socket.on("game.end", (data) => {
      navigation.navigate("GameSummaryScreen", { data });
    });

    // Supprimer l'écouteur d'événement lorsque le composant est démonté
    return () => {
      socket.off("game.end");
    };
  }, [navigation, socket]);

  // fonction pour quitter la queue
  const leaveQueue = () => {
    console.log("[emit][queue.leave]:", socket.id);
    socket.emit("queue.leave");
    navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    console.log("[emit][queue.join]:", socket.id);
    socket.emit("queue.join");
    setInQueue(false);
    setInGame(false);

    socket.on("queue.added", (data) => {
      console.log("[listen][queue.added]:", data);
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
    });

    socket.on("game.start", (data) => {
      console.log("[listen][game.start]:", data);
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
      setIdOpponent(data["idOpponent"]);
    });

    socket.on("queue.removed", (data) => {
      console.log("[listen][queue.leave]:", data);
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
    });
  }, []);

  return (
    <View style={styles.container}>
      {!inQueue && !inGame && (
        <>
          <Text style={styles.paragraph}>Waiting for server datas...</Text>
        </>
      )}

      {inQueue && (
        <>
          <Text style={styles.paragraph}>Waiting for another player...</Text>
          <Button title="Revenir au menu" onPress={leaveQueue} />
        </>
      )}

      {inGame && <Board />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  paragraph: {
    fontSize: 16,
  },
});
