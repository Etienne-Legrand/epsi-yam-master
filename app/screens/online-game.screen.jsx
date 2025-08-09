import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import OnlineGameController from "../controllers/online-game.controller";
import { colors } from "../constants/colors";

export default function OnlineGameScreen({ navigation }) {
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

      {socket && <OnlineGameController navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkBlue,
  },
});
