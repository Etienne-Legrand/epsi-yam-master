import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import VsBotGameController from "../controllers/vs-bot-game.controller";

export default function VsBotGameScreen({ navigation }) {
  const socket = useContext(SocketContext);

  return (
    <View style={styles.container}>
      {!socket && (
        <>
          <Text style={styles.paragraph}>No connection with server...</Text>
          <Text style={styles.footnote}>
            Restart the app and wait for the server to be back again.
          </Text>
        </>
      )}

      {socket && <VsBotGameController navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#272744",
  },
});
