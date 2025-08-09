import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { colors } from "../../../constants/colors";

const OpponentScore = () => {
  const socket = useContext(SocketContext);
  const [opponentScore, setOpponentScore] = useState(0);

  useEffect(() => {
    socket.on("score.update", (data) => {
      setOpponentScore(data["opponentScore"]);
    });
  }, []);

  return (
    <View style={styles.playerScoreContainer}>
      <Text style={styles.opponentScoreText}>Score: {opponentScore}</Text>
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
  opponentScoreText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default OpponentScore;
