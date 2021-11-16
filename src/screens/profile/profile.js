import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Switch,
  Dimensions,
} from "react-native";
import styled from "styled-components";
const Height = Dimensions.get("screen").height;
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

function ProfileScreen({ navigation, theme, darkMode }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <MenuContainer>
        <View style={styles.header}>
          <Row>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name="keyboard-arrow-down"
                size={40}
                color="white"
              />
            </TouchableOpacity>

            <Text style={[styles.title, { marginLeft: 50, color: "#FF2465" }]}>
              Account
            </Text>
          </Row>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.body]}>
            <Text style={styles.name}>current username</Text>
            <Text style={styles.email}>email@email.com</Text>

            <Text style={styles.changeEmail}>Change Email:</Text>

            <View style={{ marginVertical: 20 }}>
              <Text style={styles.inputTitle}>New Email</Text>
              <TextInput
                placeholderTextColor="lightgrey"
                style={styles.input}
                placeholder="Enter your new email..."
              />
              <Text style={styles.inputTitle}>Confirm Email</Text>
              <TextInput
                placeholderTextColor="lightgrey"
                style={styles.input}
                placeholder="Confirm your new email..."
              />
              <Text style={styles.inputTitle}>Master Password</Text>

              <TextInput
                placeholderTextColor="lightgrey"
                style={styles.input}
                placeholder="Enter your master password..."
                secureTextEntry={true}
              />

              <UpdateButton onPress={() => {}} activeOpacity={0.7}>
                <Text style={styles.updateText}>Update</Text>
              </UpdateButton>

              <ButtonRow>
                <LogoutButton>
                  <Text style={styles.updateText}>Log out</Text>
                </LogoutButton>
                <AccountButton>
                  <Text style={styles.updateText}>Deactivate Account </Text>
                </AccountButton>
              </ButtonRow>
            </View>
          </View>
        </ScrollView>
      </MenuContainer>
    </View>
  );
}

const MenuContainer = styled.View`
  padding-top: 55px;
  background-color: #1d2026;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const UpdateButton = styled.TouchableOpacity`
  padding-vertical: 13px;
  padding-horizontal: 5px;
  border-radius: 10px;
  background-color: #ff2465;
  width: 30%;
  margin-top: 15px;
  
`;

const AccountButton = styled.TouchableOpacity`
  padding-vertical: 18px;
  padding-horizontal: 5px;
  border-radius: 10px;
  background-color: #ff2465;
  width: 50%;
  margin-top: 50px;
  border-color: #ff2465;
  border-width: 1.5px;
`;
const LogoutButton = styled.TouchableOpacity`
  padding-vertical: 18px;
  padding-horizontal: 5px;
  border-radius: 10px;
  border-color: #ff2465;
  border-width: 1.5px;
  width: 35%;
  margin-top: 50px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    paddingTop: 55,
  },
  header: {
    paddingHorizontal: 25,
    paddingBottom: 10,
    paddingTop: 15,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    fontStyle: "normal",
    fontFamily: "Helvetica",
    paddingHorizontal: 30,
  },

  body: {
    paddingBottom: 20,
    paddingHorizontal: 25,
    paddingVertical: 5,
    height: Height,
  },

  name: {
    fontSize: 16,
    color: "grey",
    fontFamily: "Helvetica",
    lineHeight: 35,
    marginTop: 10,
    fontWeight: "bold",
  },

  changeEmail: {
    marginTop: 50,
    fontFamily: "Helvetica",
    fontSize: 20,
    lineHeight: 28,
    color: "white",
    fontWeight: "bold",

  },

  email: {
    fontSize: 16,
    color: "grey",
    fontFamily: "Helvetica",
    lineHeight: 35,
    marginTop: 10,
    fontWeight: "bold",
  },

  inputTitle: {
    fontSize: 20,
    color: "#FF2465",
    fontFamily: "Helvetica",
    lineHeight: 35,
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1.7,
    borderBottomColor: "white",
    fontSize: 14,
    fontFamily: "Helvetica",
    marginVertical: 12,
    paddingBottom: 10,
    width: "84%",
    fontWeight: "bold",
  },
  updateText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Helvetica",
    fontSize: 14,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  darkMode: state.theme.darkMode,
});

export default connect(mapStateToProps)(ProfileScreen);