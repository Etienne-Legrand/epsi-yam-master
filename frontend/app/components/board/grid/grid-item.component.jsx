import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { colors } from "../../../constants/colors";

const GridItem = ({ cell, isSelectable, onPress }) => {
  // Animation
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      flexDirection: "row",
      flex: 2,
      width: "100%",
      height: "100%",
    };
  });

  const handlePress = () => {
    if (isSelectable) {
      scale.value = withRepeat(
        withTiming(1.1, { duration: 150 }),
        2,
        true,
        onPress()
      );
      opacity.value = withRepeat(withTiming(0.8, { duration: 150 }), 2, true);
    } else {
      onPress();
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={!isSelectable}
        style={[
          styles.cell,
          cell.owner === "player:1" && styles.playerOwnedCell,
          cell.owner === "player:2" && styles.opponentOwnedCell,
          isSelectable && styles.selectableCell,
        ]}
      >
        <Text
          style={[
            styles.cellText,
            cell.owner === "player:1" && styles.playerOwnedCellText,
            cell.owner === "player:2" && styles.opponentOwnedCellText,
            isSelectable && styles.selectableCellText,
          ]}
        >
          {cell.viewContent}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Cell styles
  cell: {
    flexDirection: "row",
    flex: 2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mauve,
    borderRadius: 10,
    margin: 1,
  },
  playerOwnedCell: {
    backgroundColor: colors.beige,
  },
  opponentOwnedCell: {
    backgroundColor: colors.lightPink,
  },
  selectableCell: {
    backgroundColor: colors.white,
  },

  // Cell text styles
  cellText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
  },
  playerOwnedCellText: {
    color: colors.darkBlue,
  },
  opponentOwnedCellText: {
    color: colors.darkBlue,
  },
  selectableCellText: {
    color: colors.darkBlue,
  },
});

export default GridItem;
