import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../../helpers/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addFile, setStorageClass } from "../../store/actions/fileActions";
import { connect } from "react-redux";

const Signup = ({ navigation }) => {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleSignUpSubmit = () => {
    if (password === confirmPassword) {
      setSubmitting(true);
      axios
        .post(BASE_URL + "auth/signup", {
          username,
          password,
          email,
        })
        .then(async (response) => {
          await AsyncStorage.setItem("token", response.data.token);
          setSubmitting(false);
          navigation.navigate("Main");
        })
        .catch((error) => {
          console.log(error);
          if (error && error.response) {
            Alert.alert("Error", error.response.data.msg);
            setSubmitting(false);
          } else {
            Alert.alert(
              "Error",
              "There is a problem in requesting data, please try again later."
            );
            setSubmitting(false);
          }
        });
    } else {
      Alert.alert("Error", "Master password does not match.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 25, paddingVertical: 20 }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle-sharp" size={25} color="#FF2465" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.title}>Create your{"\n"}account.</Text>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Text style={styles.inputTitle}>Username</Text>
            <TextInput
              placeholderTextColor="grey"
              style={styles.input}
              placeholder="Enter your username..."
              onChangeText={(text) => setUserName(text)}
              value={username}
            />
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              placeholderTextColor="grey"
              style={styles.input}
              placeholder="Enter your email..."
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <Text style={styles.inputTitle}>Master Password</Text>

            <TextInput
              placeholderTextColor="grey"
              style={styles.input}
              placeholder="Enter master password..."
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <Text style={styles.inputTitle}>Confirm Master Password</Text>

            <TextInput
              placeholderTextColor="grey"
              style={styles.input}
              placeholder="Confirm master password..."
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />

            <TouchableOpacity
              onPress={() => {
                handleSignUpSubmit();
              }}
              style={[styles.btn, { backgroundColor: "#FF2465" }]}
              activeOpacity={0.6}
            >
              {submitting ? (
                <ActivityIndicator color="white" size={20} />
              ) : (
                <Text style={styles.btnText}>Signup</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.btnText}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.6}
        >
          <Text style={[styles.btnText, { color: "#FF2465", marginLeft: 5 }]}>
            Login.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    paddingVertical: 55,
  },
  body: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontFamily: "Helvetica",
    textAlign: "left",
    fontWeight: "500",
    letterSpacing: 1,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "50%",
    alignSelf: "center",
  },
  btnText: {
    fontFamily: "Helvetica",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputTitle: {
    fontSize: 20,
    color: "#FF2465",
    fontFamily: "Helvetica",
    lineHeight: 35,
    marginTop: 14,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1.7,
    borderBottomColor: "white",
    fontSize: 14,
    fontFamily: "Helvetica",
    marginVertical: 8,
    paddingBottom: 10,
    color: "white",
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
  files: state.files.files,
  storageClass: state.files.storageClass,
});

export default connect(mapStateToProps, {
  addFile,
  setStorageClass,
})(Signup);
