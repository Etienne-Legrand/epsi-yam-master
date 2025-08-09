import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Importation des icônes
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const Button = ({ onPress, text, iconName, iconNameMaterial, style }) => {
  // Animation
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    scale.value = withRepeat(
      withTiming(1.2, { duration: 150 }),
      2, // Nombre de répétitions
      true, // Pour répéter en sens inverse
      onPress()
    );
    opacity.value = withRepeat(withTiming(0.8, { duration: 150 }), 2, true);
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity style={[styles.button, style]} onPress={handlePress}>
        <View style={styles.innerContainer}>
          {iconName && (
            <FontAwesome5 name={iconName} size={25} color={colors.white} />
          )}
          {iconNameMaterial && (
            <MaterialCommunityIcons
              name={iconNameMaterial}
              size={25}
              color={colors.white}
            />
          )}
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.indigo,
    borderRadius: 25,
    height: 60,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginLeft: 10,
  },
});

export default Button;
