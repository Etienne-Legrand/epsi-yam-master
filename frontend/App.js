import "@expo/metro-runtime";

import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SocketContext, socket } from "./app/contexts/socket.context";
import { colors } from "./app/constants/colors";
import HomeScreen from "./app/screens/home.screen";
import OnlineGameScreen from "./app/screens/online-game.screen";
import VsBotGameScreen from "./app/screens/vs-bot-game.screen";
import GameSummaryScreen from "./app/screens/game.summary.screen";

const Stack = createStackNavigator();
LogBox.ignoreAllLogs(true);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <NavigationContainer
        theme={{
          colors: {
            background: colors.darkBlue,
          },
        }}
      >
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown: false,
            // cardStyle: { backgroundColor: colors.darkBlue },
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="OnlineGameScreen" component={OnlineGameScreen} />
          <Stack.Screen name="VsBotGameScreen" component={VsBotGameScreen} />
          <Stack.Screen
            name="GameSummaryScreen"
            component={GameSummaryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketContext.Provider>
  );
}

export default App;
