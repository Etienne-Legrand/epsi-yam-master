import React, { useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../../../constants/colors";

const Dice = ({ index, locked, value, onPress, opponent, rollsCounter }) => {
  const handlePress = () => onPress(index, opponent);
  const windowWidth = window.innerWidth;
  const diceWidth = windowWidth <= 600 ? windowWidth / 5 - 1 : 65;
  const styles = createStyles(diceWidth);

  // Animation
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  useEffect(() => {
    if (!locked) {
      rotation.value = withTiming(360, { duration: 700 }, () => {
        rotation.value = 0;
      });
    }
  }, [rollsCounter, value]);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.dice, locked && styles.lockedDice]}
        onPress={handlePress}
        disabled={opponent}
      >
        <Text style={styles.diceText}>{value}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const createStyles = StyleSheet.create((diceWidth) => ({
  dice: {
    width: diceWidth,
    height: diceWidth,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  lockedDice: {
    backgroundColor: colors.lightPink,
  },
  diceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.indigo,
  },
}));

export default Dice;
