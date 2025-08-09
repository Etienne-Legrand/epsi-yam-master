import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import Button from "../components/button";

const GameSummaryScreen = ({ route, navigation }) => {
  const [gameSummary, setGameSummary] = useState(null);

  useEffect(() => {
    setGameSummary(route.params.data);
  }, []);

  // Pour info gameSummary = {isOpponentDisconnected, isWinner, isLoser, isDraw, playerScore, opponentScore }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résumé de la partie</Text>
      {gameSummary ? (
        <>
          {gameSummary.isOpponentDisconnected && (
            <Text style={styles.text}>L'adversaire s'est déconnecté.</Text>
          )}
          {gameSummary.isWinner && (
            <Text style={styles.text}>Vous avez gagné !</Text>
          )}
          {gameSummary.isLoser && (
            <Text style={styles.text}>Vous avez perdu...</Text>
          )}
          {gameSummary.isDraw && <Text style={styles.text}>Match nul !</Text>}
          <Text style={styles.text}>
            Votre score : {gameSummary.playerScore}
          </Text>
          <Text style={styles.text}>
            Score de l'adversaire : {gameSummary.opponentScore}
          </Text>
          <Button
            onPress={() => navigation.navigate("HomeScreen")}
            text="Revenir au menu"
            iconName="home"
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkBlue,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.beige,
  },
  text: {
    fontSize: 22,
    marginBottom: 30,
    fontWeight: "bold",
    color: colors.mauve,
  },
});

export default GameSummaryScreen;
