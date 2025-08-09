import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../constants/colors";

export class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>YAM MASTER</Text>
        <FontAwesome5 name="dice" size={50} color={colors.beige} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    color: colors.beige,
    fontWeight: "bold",
  },
});

export default Header;
