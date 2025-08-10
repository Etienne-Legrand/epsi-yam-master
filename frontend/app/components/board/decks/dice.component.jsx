import React, { useEffect, useRef } from "react";
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
    // Skip if rollsCounter is undefined or null
    if (rollsCounter === undefined || rollsCounter === null) {
      return;
    }

    const hasValue = value && value !== "";
    const shouldAnimate = hasValue && !locked;

    if (shouldAnimate) {
      rotation.value = withTiming(360, { duration: 900 }, () => {
        rotation.value = 0;
      });
    }
  }, [rollsCounter, locked]);

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
