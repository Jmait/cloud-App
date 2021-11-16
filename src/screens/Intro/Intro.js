import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 55 }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1d2026",
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          <Entypo name="cloud" size={45} color="#FF2465" />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Welcome to Haven.</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={[styles.btn, { backgroundColor: "#1d2026" }]}
          activeOpacity={0.6}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={[styles.btn, { backgroundColor: "#FF2465" }]}
          activeOpacity={0.6}
        >
          <Text style={styles.btnText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  body: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    fontSize: 22,
    color: "#FF2465",
    marginVertical: 20,
    fontFamily: "Helvetica",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btn: {
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "Helvetica",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Intro;
