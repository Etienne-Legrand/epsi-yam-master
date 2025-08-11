import { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SocketContext } from "../../contexts/socket.context";
import PlayerDeck from "./decks/player-deck.component";
import OpponentDeck from "./decks/opponent-deck.component";
import PlayerTimer from "./timers/player-timer.component";
import OpponentTimer from "./timers/opponent-timer.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";
import PlayerPawns from "./pawns/playerPawns.component";
import PlayerScore from "./scores/playerScore.component";
import OpponentScore from "./scores/opponentScore.component";
import OpponentPawns from "./pawns/opponentPawns.component";
import Button from "../button";
import { colors } from "../../constants/colors";

const OpponentInfos = () => {
  return (
    <View style={styles.opponentInfosContainer}>
      <Text style={styles.opponentInfosText}>Adversaire</Text>
    </View>
  );
};

const PlayerInfos = () => {
  return (
    <View style={styles.playerInfosContainer}>
      <Text style={styles.playerInfosText}>Joueur</Text>
    </View>
  );
};

const Board = ({ navigation }) => {
  const socket = useContext(SocketContext);

  const backToHome = () => {
    // Disconnect from the game
    socket.emit("game.leave");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "6%",
          marginBottom: Platform.OS === "web" ? -10 : 15,
        }}
      >
        <Button
          onPress={backToHome}
          iconName="arrow-left"
          style={{
            width: 50,
            height: 50,
            margin: 10,
            padding: 8,
            paddingRight: 0,
          }}
        />
      </View>
      <View style={[styles.rowOpponentCard, { height: "6%" }]}>
        <View>
          <OpponentInfos />
        </View>
        <View style={styles.opponentTimerScoreContainer}>
          <OpponentScore />
          <OpponentTimer />
          <OpponentPawns />
        </View>
      </View>
      <View style={[styles.row, { height: "13%" }]}>
        <OpponentDeck />
      </View>
      <View style={[styles.row, { height: "35%" }]}>
        <Grid />
      </View>
      <View style={[styles.row, { height: "8%" }]}>
        <Choices />
      </View>
      <View style={[styles.row, { height: "20%" }]}>
        <PlayerDeck />
      </View>
      <View style={[styles.rowOpponentCard, { height: "6%" }]}>
        <View>
          <PlayerInfos />
        </View>
        <View style={styles.opponentTimerScoreContainer}>
          <PlayerScore />
          <PlayerTimer />
          <PlayerPawns />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
    height: "100%",
    backgroundColor: colors.darkBlue,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    color: "white",
    borderRadius: 10,
  },
  rowOpponentCard: {
    flexDirection: "column",
    width: "100%",
    color: "white",
    borderRadius: 10,
  },
  opponentInfosContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.indigo,
  },
  opponentInfosText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  opponentTimerScoreContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: colors.indigo,
  },
  playerInfosContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: colors.indigo,
  },
  playerInfosText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Board;
