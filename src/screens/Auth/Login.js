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
import { connect } from "react-redux";
import * as bcrypt from "bcryptjs";
import { Ionicons } from "@expo/vector-icons";
import { apiRequest, BASE_URL } from "../../helpers/constants";
import { addFile, setStorageClass } from "../../store/actions/fileActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
const Login = ({ navigation }) => {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);


  const handleLoginSubmit = async() => {
      setSubmitting(true);
    try {
      const hashedPassword = Buffer.from(password).toString("base64");
      await AsyncStorage.setItem("secret",hashedPassword);
      const res = await apiRequest({method:"POST", url:`${BASE_URL}auth/signin`, body:{username,password:hashedPassword}});
      if(res){
        const {token} = res.data;
        await AsyncStorage.setItem("token",token);
        navigation.navigate("Main");
        setSubmitting(false);
      }
    } catch (error) {
      /// console.log(error);
      Alert.alert("Invalid Credentials",error.response.data.msg);
      setSubmitting(false);
    }
    //Make a network request to login endpoint
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
          <Text style={styles.title}>Sign-in to{"\n"}continue.</Text>
          <View style={{ marginHorizontal: 20, marginTop: 50 }}>
            <Text style={styles.inputTitle}>Username</Text>
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              placeholder="Enter your username..."
              onChangeText={(text) => setUserName(text)}
              value={username}
            />
            <Text style={styles.inputTitle}>Master Password</Text>


<TextInput
  placeholderTextColor="white"
  style={styles.input}
  placeholder="Enter your vault encryption key..."
  onChangeText={(text) => setPassword(text)}
  secureTextEntry={true}
  value={password}
/>

            <TouchableOpacity
              onPress={() => {
                handleLoginSubmit();
              }}
              style={[styles.btn, { backgroundColor: "#FF2465" }]}
              activeOpacity={0.6}
            >
              {submitting ? (
                <ActivityIndicator color="white" size={20} />
              ) : (
                <Text style={styles.btnText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.btnText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          activeOpacity={0.6}
        >
          <Text style={[styles.btnText, { color: "#FF2465", marginLeft: 5 }]}>
            Signup.
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
    paddingVertical: 40,
  },
  body: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginVertical: 20,
    fontFamily: "Helvetica",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 1,
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
  },
});

const mapStateToProps = (state) => ({
  files: state.files.files,
  storageClass: state.files.storageClass,
});

export default connect(mapStateToProps, {
  addFile,
  setStorageClass,
})(Login);
