import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { colors } from "../../../constants/colors";

const PlayerScore = () => {
  const socket = useContext(SocketContext);
  const [playerScore, setPlayerScore] = useState(0);

  useEffect(() => {
    socket.on("score.update", (data) => {
      setPlayerScore(data["playerScore"]);
    });
  }, []);

  return (
    <View style={styles.playerScoreContainer}>
      <Text style={styles.playerScoreText}>Score: {playerScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerScoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.indigo,
  },
  playerScoreText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PlayerScore;
