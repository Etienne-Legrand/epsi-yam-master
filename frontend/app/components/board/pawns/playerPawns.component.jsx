import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { colors } from "../../../constants/colors";

const PlayerPawns = () => {
  const socket = useContext(SocketContext);
  const [playerPawns, setPlayerPawns] = useState(0);

  useEffect(() => {
    socket.on("game.pawns", (data) => {
      setPlayerPawns(data["playerPawns"]);
    });
  }, []);

  return (
    <View style={styles.playerPawnsContainer}>
      <Text style={styles.playerPawnsText}>Pions : {playerPawns}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerPawnsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.indigo,
  },
  playerPawnsText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PlayerPawns;
