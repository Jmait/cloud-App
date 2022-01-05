import React, { useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, Image, View, Platform } from "react-native";
import {
  Entypo,
  FontAwesome,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import styled, { ThemeProvider } from "styled-components";
import { connect } from "react-redux";

import { getInitialTheme } from "../store/actions/themeActions";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

import {
  HomeScreen,
  DownloadScreen,
  AccountScreen,
  ProfileScreen,
  NotificationScreen,
  SubscriptionScreen,
  UploadScreen,
  Files,
  Frequent,
  Infrequent,
  Archived,
  Intro,
  Login,
  Signup,
} from "../screens";
import Plus from "../screens/MainPlus/Plus";
import ViewFile from "../screens/viewFile/ViewFile";
const TabBarHomeBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  shadow-offset: { width: 0, height: 2 };
  shadow-color: #1D2026;
  shadow-opacity: 1;
  elevation: 5;
`;

const MainPlusTabs = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Plus"
        options={{
          headerShown: false,
        }}
        component={Plus}
      />
      <Stack.Screen
        name="upload"
        options={{
          headerShown: false,
        }}
        component={UploadScreen}
      />
    </Stack.Navigator>
  );
};

function MyTabs({ route }) {
  let theme = route.params.theme;
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Files"
      tabBarOptions={{
        activeTintColor: "#FF2465",
        inactiveTintColor: "grey",
        showLabel: false,
        tabStyle: {
          backgroundColor: "#1D2026",
          paddingHorizontal: 4,
          height: 87,
          borderTopColor: "#1D2026",
          borderTopWidth: 0.3,
          paddingBottom: Platform.OS === "android" ? 0 : 18,
        },

        style: {
          height: 87,
          borderTopColor: "#1D2026",
          borderTopWidth: 0.3,
        },
      }}
    >
      <Tab.Screen
        name="Download"
        component={DownloadScreen}
        options={{
          tabBarLabel: "Downloads",
          tabBarIcon: ({ color, focused, size }) => (
            <View style={styles.tabRow}>
              {focused ? (
                <Image
                  style={{ width: 37, height: 30 }}
                  source={require("../assets/selectedDownload.png")}
                />
              ) : (
                <Image
                  style={{ width: 35, height: 30 }}
                  source={require("../assets/downloads.png")}
                />
              )}

              <Text style={[styles.label, { color: color }]}>Downloads</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Files"
        component={Files}
        options={{
          tabBarLabel: "Files",
          tabBarIcon: ({ color, focused, size }) => (
            <View style={styles.tabRow}>
              {focused ? (
                <Image
                  style={{ width: 35, height: 30 }}
                  source={require("../assets/selectedFile.png")}
                />
              ) : (
                <Image
                  style={{ width: 35, height: 30 }}
                  source={require("../assets/files.png")}
                />
              )}

              <Text style={[styles.label, { color: color }]}>Files</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Plus"
        component={MainPlusTabs}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, focused, size }) => (
            <Image
              style={{ width: 73, height: 73 }}
              source={require("../assets/plus.png")}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarLabel: "Upload",
          tabBarIcon: ({ color, focused, size }) => (
            <View style={styles.tabRow}>
              {focused ? (
                <Image
                  style={{ width: 38, height: 32 }}
                  source={require("../assets/selectedUpload.png")}
                />
              ) : (
                <Image
                  style={{ width: 38, height: 32 }}
                  source={require("../assets/upload.png")}
                />
              )}

              <Text style={[styles.label, { color: color }]}>Uploads</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.tabRow]}>
              {focused ? (
                <Image
                  style={{ width: 35, height: 30, marginTop: 4 }}
                  source={require("../assets/selectedProfile.png")}
                />
              ) : (
                <Image
                  style={{ width: 35, height: 30, marginTop: 4 }}
                  source={require("../assets/profile.png")}
                />
              )}

              <Text style={[styles.label, { color: color }]}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const verticalAnimation = {
  gestureDirection: "vertical",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

const AppStack = ({ theme, getInitialTheme }) => {
  React.useEffect(() => {
    getInitialTheme();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Stack.Navigator mode="modal" screenOptions={verticalAnimation}>
        <Stack.Screen
          name="Intro"
          options={{
            headerShown: false,
          }}
          component={Intro}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          options={{
            headerShown: false,
          }}
          component={Signup}
        />
        <Stack.Screen
          name="Main"
          options={{
            headerShown: false,
          }}
          component={MyTabs}
          initialParams={{ theme: theme }}
        />

        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
          component={ProfileScreen}
        />

        <Stack.Screen
          name="subscription"
          options={{ headerShown: false }}
          component={SubscriptionScreen}
        />

        <Stack.Screen
          name="notification"
          options={{
            headerShown: false,
          }}
          component={NotificationScreen}
        />

        <Stack.Screen
          name="upload"
          options={{
            headerShown: false,
          }}
          component={UploadScreen}
        />
        <Stack.Screen
          name="Frequent"
          options={{
            headerShown: false,
          }}
          component={Frequent}
        />

        <Stack.Screen
          name="ViewFile"
          options={{
            headerShown: false,
          }}
          component={ViewFile}
        />
        {/* <Stack.Screen
          name="Infrequents"
          options={{
            headerShown: false,
          }}
          component={Infrequent}
        /> */}
        <Stack.Screen
          name="Archived"
          options={{
            headerShown: false,
          }}
          component={Archived}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#1D2026",
    shadowOpacity: 1,
    elevation: 5,
  },

  tabRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontFamily: "Helvetica",
  },
});

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps, { getInitialTheme })(AppStack);
