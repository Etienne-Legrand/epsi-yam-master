import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { colors } from "../../../constants/colors";

const PlayerTimer = () => {
  const socket = useContext(SocketContext);
  const [playerTimer, setPlayerTimer] = useState(0);

  useEffect(() => {
    socket.on("game.timer", (data) => {
      setPlayerTimer(data["playerTimer"]);
    });
  }, []);

  return (
    <View style={styles.playerTimerContainer}>
      <Text style={styles.playerTimerText}>Temps : {playerTimer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: colors.indigo,
  },
  playerTimerText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PlayerTimer;
