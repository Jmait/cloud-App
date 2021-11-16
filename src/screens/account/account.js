import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  Switch,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Modal from "react-native-modal";
import styled from "styled-components";
import { connect } from "react-redux";

import * as themes from "../../theme/theme";
import { switchTheme, switchDarkMode } from "../../store/actions/themeActions";

const Width = Dimensions.get("window").width;

const colors = [];
Object.keys(themes).map((key) => {
  colors.push(themes[key]);
});

const menus = [
  {
    name: "Account",
    key: "account",
  },
  {
    name: "Help and Feedback",
    key: "help&feedback",
  },
  {
    name: "Manage Subscriptions",
    key: "ManageSubscriptions",
  },

  {
    name: "Privacy Policy",
    key: "privacypolicy",
    type: "bold",
  },
];

function AccountScreen({
  route,
  navigation,
  switchTheme,
  darkMode,
  switchDarkMode,
}) {
  const [themeModal, setThemeModal] = React.useState(false);

  const handleClick = (id) => {
    if (id === "themes") {
      setThemeModal(!themeModal);
    } else if (id === "help&feedback") {
      Linking.openURL("mailto:havencloudapp@gmail.com");
    } else if (id === "privacypolicy") {
      Linking.openURL("https://google.com");
    } else if (id === "account") {
      navigation.navigate("profile");
    } else if (id === "ManageSubscriptions") {
      navigation.navigate("subscription");
    }
  };

  return (
    <Container>
      <MenuContainer>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.line} />
        <View style={styles.list}>
          {menus &&
            menus.map((val, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.6}
                  style={styles.itemContainer}
                  onPress={() => handleClick(val.key)}
                >
                  <Text
                    style={[
                      styles.item,
                      {
                        fontWeight: val.type,
                      },
                    ]}
                  >
                    {val.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </MenuContainer>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FF2465",
    fontSize: 24,
    lineHeight: 28,
    fontStyle: "normal",
    fontFamily: "HelveticaBold",
  },

  line: {
    height: 2,
    width: "90%",
    backgroundColor: "grey",
    marginVertical: 25,
  },
  itemContainer: {
    marginVertical: 23,
  },
  item: {
    color: "white",
    fontSize: 20,
    fontStyle: "normal",
    fontFamily: "HelveticaBold",
  },

  heading: {
    color: "#1D2026",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    lineHeight: 28,
  },
  info: {
    color: "#1D2026",
    fontSize: 15,
    opacity: 0.9,
    fontWeight: "400",
    marginVertical: 15,
    fontFamily: "Helvetica",
  },
});

const Container = styled.View`
  flex: 1;
  background-color: #151515;
`;

const MenuContainer = styled.View`
  padding-horizontal: 25px;
  padding-vertical: 45px;
  padding-top: 90px;
`;

const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
});

export default connect(mapStateToProps, { switchTheme, switchDarkMode })(
  AccountScreen
);
