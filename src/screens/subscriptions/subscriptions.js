import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { SimpleLineIcons } from "@expo/vector-icons";

// adb -s 067062514J108514  reverse tcp:8081 tcp:8081
import SubscriptionTabs from "../../components/subscription/SubscriptionTabs";
import NewSubPage from "../../components/subscription/NewSubPage";

const SubscriptionScreen = ({ navigation, darkMode }) => {
  // let { darkMode } = props;

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? "black" : "white" }}>
      <HeaderContainer>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 10 }}
          >
            <SimpleLineIcons name="arrow-down" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Subscriptions</Text>
        </View>
      </HeaderContainer>

      {/* <SubscriptionTabs /> */}
      <NewSubPage />
    </View>
  );
};

const HeaderContainer = styled.View`
  padding-top: 55px;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
`;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 25,
    paddingBottom: 30,
    flexDirection: "row",
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    fontStyle: "normal",
    fontFamily: "Helvetica",
    marginLeft: 80,
    color: "#FF2465",
  },
});

const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
});

export default connect(mapStateToProps)(SubscriptionScreen);
