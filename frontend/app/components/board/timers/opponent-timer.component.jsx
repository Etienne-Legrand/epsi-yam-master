import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { colors } from "../../../constants/colors";

const OpponentTimer = () => {
  const socket = useContext(SocketContext);
  const [opponentTimer, setOpponentTimer] = useState(0);

  useEffect(() => {
    socket.on("game.timer", (data) => {
      setOpponentTimer(data["opponentTimer"]);
    });
  }, []);
  return (
    <View style={styles.opponentTimerContainer}>
      <Text style={styles.opponentTimerText}>Temps : {opponentTimer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  opponentTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: colors.indigo,
  },
  opponentTimerText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default OpponentTimer;
