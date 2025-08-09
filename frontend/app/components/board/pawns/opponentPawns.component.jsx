import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { colors } from "../../../constants/colors";

const OpponentPawns = () => {
  const socket = useContext(SocketContext);
  const [opponentPawns, setOpponentPawns] = useState(0);

  useEffect(() => {
    socket.on("game.pawns", (data) => {
      setOpponentPawns(data["opponentPawns"]);
    });
  }, []);

  return (
    <View style={styles.opponentPawnsContainer}>
      <Text style={styles.opponentPawnsText}>Pions : {opponentPawns}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  opponentPawnsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.indigo,
  },
  opponentPawnsText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default OpponentPawns;
