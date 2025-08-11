import { StyleSheet, View } from "react-native";
import Header from "../components/header";
import Button from "../components/button";
import { colors } from "../constants/colors";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerButtons}>
        <Button
          onPress={() => navigation.navigate("OnlineGameScreen")}
          text="Jouer en ligne"
          iconName="play"
          style={styles.button}
        />
        <Button
          onPress={() => navigation.navigate("VsBotGameScreen")}
          text="Versus bot"
          iconNameMaterial="robot-angry"
          style={styles.button}
        />
      </View>
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
  containerButtons: {
    marginTop: 40,
  },
  button: {
    marginTop: 40,
  },
});
