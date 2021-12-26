import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function NewSubPage() {
  const [state, setState] = useState(true);

  const handlePress = () => {
    setState(!state);
    console.log("changed");
  };

  return (
    <View style={styles.container}>
      {/* Section of the heading of the screen */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          <Text style={styles.titleByte}>50GB</Text> Storage Plan
        </Text>
        <Text style={styles.subTitle}>
          With Premium, get up to 50GB of private and secure storage.
        </Text>
      </View>

      {/* Section for the selection of subscription plan */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.subSection, state ? styles.addBorder : null]}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.subType}>
              <Text style={styles.main}>$3</Text>/mo
            </Text>
          </View>

          <Text style={styles.kind}>Billed $36 yearly.</Text>
        </TouchableOpacity>

        {/* The or in between the subscription type */}
        <Text style={styles.forOr}>or</Text>

        {/* The second subscription */}

        <TouchableOpacity
          onPress={handlePress}
          style={[styles.subSection, state ? null : styles.addBorder]}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.subType}>
              <Text style={styles.main}>$4</Text>/mo
            </Text>
          </View>

          <Text style={styles.kind}>Pay monthly. Cancel anytime.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSection}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NewSubPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1,
    backgroundColor: "#1D2026",
  },

  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },

  titleByte: {
    color: "#FF2465",
  },

  subTitle: {
    color: "#fff",
    marginTop: 7,
    fontSize: 17,
    fontWeight: "700",
  },

  sectionContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 40,
    flex: 1,
  },

  forOr: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 30,
    color: "#fff",
  },

  subSection: {
    padding: 30,
    height: "25%",
    width: "70%",
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
  },

  addBorder: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#FF2465",
  },

  subType: {
    color: "#fff",
    fontWeight: "bold",
  },

  main: {
    color: "#FF2465",
    fontSize: 24,
  },

  kind: {
    color: "#fff",
    marginVertical: 30,
  },

  btnSection: {
    marginTop: 60,
    borderRadius: 50,
    backgroundColor: "#FF2465",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
