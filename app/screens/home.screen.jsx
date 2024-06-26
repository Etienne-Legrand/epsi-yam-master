import { StyleSheet, View } from "react-native";
import Header from "../components/header";
import Button from "../components/button";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bloc}>
        <Button
          onPress={() => navigation.navigate("OnlineGameScreen")}
          text="Jouer en ligne"
          iconName="play"
        />
      </View>
      <View style={styles.bloc}>
        <Button
          onPress={() => navigation.navigate("VsBotGameScreen")}
          text="Versus bot"
          iconNameMaterial="robot-angry"
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
    backgroundColor: "#272744",
  },
  bloc: {
    margin: 40,
  },
});
