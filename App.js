import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/navigation/tabs";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
// import { ThemeProvider } from 'styled-components';
import { Provider } from "react-redux";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Node of type rule not supported as an inline style"]);

import store from "./src/store";

export default (props) => {
  let [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/Fonts/RobotoBlack.ttf"),
    RobotoBold: require("./src/assets/Fonts/RobotoBold.ttf"),
    RobotoRegular: require("./src/assets/Fonts/Roboto-Regular.ttf"),
    RobotoThin: require("./src/assets/Fonts/Roboto-Light.ttf"),
    Helvetica: require("./src/assets/Fonts/Helvetica.ttf"),
    HelveticaBold: require("./src/assets/Fonts/HelveticaBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </Provider>
    );
  }
};
