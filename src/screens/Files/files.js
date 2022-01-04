import React, { useMemo, useState } from "react";
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
  Platform,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import styled from "styled-components";

import Filecard from "../../components/filecard/filecard";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import * as themes from "../../theme/theme";
import { switchTheme, switchDarkMode } from "../../store/actions/themeActions";
import { addFile, setStorageClass } from "../../store/actions/fileActions";
import axios from "axios";
import { BASE_URL } from "../../helpers/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { AssetsSelector } from "expo-images-picker";
import { MediaType } from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

const Width = Dimensions.get("window").width;

const packages = [
  {
    name: "Frequent",
  },

  {
    name: "Infrequent",
  },
  {
    name: "Archived",
  },
];

const buttons = [
  {
    name: "Login",
  },
  {
    name: "Sign-Up",
  },
];

const colors = [];
Object.keys(themes).map((key) => {
  colors.push(themes[key]);
});

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

function HomeScreen(props) {
  const [active, setActive] = React.useState("Home");
  const [pkg, setPkg] = React.useState("Frequent");
  const [open, setOpen] = React.useState(false);

  const [info, setInfo] = React.useState({
    key: "frequent",
    title: "Frequent",
  });
  const navigation = useNavigation();
  let { theme } = props;

  const [showImagePicker, setShowImagePicker] = React.useState(false);

  const [uploadSection, showUploadSection] = React.useState(false);

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: true,
      copyToCacheDirectory: true,
    });
    if (result.type !== "cancel") {
      props.addFile([result]);
      showUploadSection(false);
      props.navigation.navigate("upload", { name: pkg });
    }
  };

  // ******************* TESTNG WIDGET *************
  const onSuccess = (data) => {
    // Alert.alert("Done", data.length + "Images selected");
    if (data.length > 0) {
      props.addFile(data);
      showUploadSection(false);
      setShowImagePicker(false);
      props.navigation.navigate("upload", { name: pkg });
    }
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was error while loading images.",
        hasErrorWithResizing: "There was error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results
      initialLoad: 100,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 1,
      // maxSelection: 3,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 50,
      compress: 0.7,
      base64: false,
      saveTo: "jpeg",
    }),
    []
  );

  const _textStyle = {
    color: "white",
  };

  const _buttonStyle = {
    backgroundColor: "blue",
    borderRadius: 5,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "Done",
        back: "Back",
        selected: "Selected",
      },
      midTextColor: "black",
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {
        setShowImagePicker(false);
      },
      onSuccess: (e) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "blue",
      widgetWidth: 100,
      zIndex: 100,
      marginTop: 20,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: "#0eb14970",
        size: 26,
      },
    }),
    []
  );
  // ******************* TESTNG WIDGET *************

  return (
    <Container darkMode={props.darkMode}>
      <StatusBar barStyle="default" />
      <Modal visible={showImagePicker}>
        <View style={{ flex: 1, marginTop: 50 }}>
          <AssetsSelector
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Navigator={widgetNavigator}
            // Resize={widgetResize} know how to use first , perform slower results.
          />
        </View>
      </Modal>

      <View style={styles.container}>
        <View style={styles.body}>
          <Filecard getPkg={(val) => setInfo(val)} />

          <View style={[styles.buttonContainer, { position: "relative" }]}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={() => {
                setOpen(true);
                setTimeout(() => {
                  setOpen(false);
                  navigation.navigate(info.title, { name: info.key });
                }, 1000);
              }}
            >
              <Text style={[styles.text, { color: theme.PRIMARY_TEXT_COLOR }]}>
                Unlock Vault
              </Text>
            </TouchableOpacity>

            {open ? (
              <Image
                source={require("./../../assets/load.gif")}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "stretch",
                  marginBottom: 300,
                  position: "absolute",
                }}
              />
            ) : null}
          </View>
        </View>
      </View>

      {/* Upload Section */}

      <Modal visible={uploadSection} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              marginHorizontal: 10,
              paddingVertical: 10,
              marginBottom: 10,
              borderRadius: 10,
              width: Width - 30,
            }}
          >
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey" }}
            >
              <TouchableOpacity
                onPress={() => {
                  pickFile();
                }}
                style={[
                  styles.row,
                  {
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingTop: 5,
                  },
                ]}
              >
                <Text style={styles.takePhoto}>Select Files</Text>
                <MaterialIcons name="archive" size={24} color="#0078FF" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "lightgrey",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  // pickImage();
                  showUploadSection(false);
                  setShowImagePicker(true);
                }}
                style={[
                  styles.row,
                  {
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingTop: 5,
                  },
                ]}
              >
                <Text style={styles.takePhoto}>Photo Library</Text>
                <MaterialIcons name="photo-library" size={24} color="#0078FF" />
              </TouchableOpacity>
            </View>

            {Platform.OS !== "android" ? null : (
              <View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      showUploadSection(false);
                      props.navigation.navigate("upload", { name: pkg });
                    }}
                    style={[
                      styles.row,
                      {
                        paddingTop: 5,

                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                      },
                    ]}
                  >
                    <Text style={styles.takePhoto}>iCloud</Text>
                    <AntDesign name="cloudo" size={24} color="#0078FF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.cancelBtn,
              {
                width: Width - 30,
                bottom: 10,
                marginTop: 10,
              },
            ]}
            activeOpacity={0.6}
            onPress={() => {
              showUploadSection(false);
            }}
          >
            <Text style={styles.cancelBtnTxt}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => (props.darkMode === true ? "black" : "white")};
`;

const Header = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 20px;
  border-bottom-right-radius: 103px;
  height: 340px;
  padding-top: 45px;
  shadow-offset: { width: 0, height: 2 };
  shadow-color: #1D2026;
  shadow-opacity: 1;
  elevation: 5;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR}
  `;
const Heading = styled.Text`
  color: ${(props) => props.theme.SECONDARY_TEXT_COLOR};
  margin-horizontal: 10px;
  font-size: 20px;
  font-family: HelveticaBold;
  font-weight: 700;
  line-height: 24px;
`;

const FormSwitch = styled.TouchableOpacity`
  padding-vertical: 16px;
  padding-horizontal: 10px;
  border-radius: 30px;
  width: 50%;
  justify-content: center;
  align-items: center;
  elevation: 6;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-color: #1d2026;
  shadow-opacity: 1;
  background-color: ${(props) =>
    props.activeBtn === props.btnName
      ? props.theme.PRIMARY_BACKGROUD_COLOR
      : "white"};
`;
const SwitchText = styled.Text`
  font-size: 22px;
  font-family: Helvetica;
  font-weight: 600;
  line-height: 28px;
  color: ${(props) =>
    props.activeBtn === props.btnName
      ? "white"
      : props.theme.PRIMARY_BACKGROUD_COLOR};
`;

const LineBreak = styled.View`
border - bottom - width: 2px;
border - bottom - color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
margin - vertical: 7px;
`;
const LoginButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
  border-radius: 36px;
  width: 150px;
  align-self: center;
  padding-vertical: 12px;
  justify-content: center;
  align-items: center;
  shadow-offset: { width: 0, height: 2 };
  shadow-color: #1D2026;
  shadow-opacity: 1;
  elevation: 4;
  margin-top: 10px;
`;

const ThemeColors = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  border-radius: 25px;
  border-width: 1px;
  margin-horizontal: 8px;
  margin-vertical: 8px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  body: {
    marginHorizontal: 15,
    marginVertical: 40,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  button: {
    backgroundColor: "#FF2465",
    paddingHorizontal: 17,
    paddingVertical: 13,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  heading: {
    color: "white",
    marginHorizontal: 10,
    fontSize: 20,
    fontFamily: "HelveticaBold",
    fontWeight: "700",
    lineHeight: 24,
  },

  activeTab: {
    color: "#FFFFFF",
    marginHorizontal: 10,
    fontSize: 24,
    fontFamily: "HelveticaBold",
    lineHeight: 28,
  },

  inActiveTab: {
    color: "#FFFFFF",
    marginHorizontal: 10,
    fontSize: 24,
    fontFamily: "Helvetica",
    lineHeight: 28,
    fontWeight: "400",
  },
  headerInfo: {
    marginVertical: 20,
  },
  info: {
    color: "white",
    opacity: 0.9,
    marginHorizontal: 10,
    fontFamily: "Helvetica",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "400",
  },
  upgrade: {
    color: "white",
    textDecorationLine: "underline",
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "700",
  },

  btn: {
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#1D2026",
    shadowOpacity: 1,
    elevation: 5,
  },

  // Modal CSS

  authContainer: {
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 29.6,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#1D2026",
    shadowOpacity: 1,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    width: Width - 70,
    marginBottom: 30,
  },

  loginBtn: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 30,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#1D2026",
    shadowOpacity: 1,
  },

  btnText: {
    fontSize: 22,
    fontFamily: "Helvetica",
    fontWeight: "600",
    lineHeight: 28,
  },
  modalBody: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  input: {
    fontSize: 20,
    fontFamily: "Helvetica",
    marginTop: 10,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
    marginVertical: 7,
  },
  modalLogin: {
    backgroundColor: "#1D2026",
    borderRadius: 36,
    width: 150,
    alignSelf: "center",
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#1D2026",
    shadowOpacity: 1,
    elevation: 4,
    marginTop: 10,
  },
  modalLoginText: {
    color: "white",
    fontSize: 22,
    fontFamily: "HelveticaBold",
    fontWeight: "600",
    lineHeight: 25,
  },

  terms: {
    color: "#C4C4C4",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Helvetica",
    fontWeight: "400",
    lineHeight: 16,
  },

  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  dark: {
    color: "#1D2026",
    fontSize: 20,
    opacity: 0.9,
    fontWeight: "400",
    marginVertical: 15,
    fontFamily: "Helvetica",
    lineHeight: 23,
  },

  // Security Modal CSS

  noThanks: {
    color: "#1D2026",
    fontSize: 20,
    fontFamily: "HelveticaBold",
    opacity: 0.5,
    lineHeight: 23,
    marginTop: 3,
  },

  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Upload

  cancelBtn: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  cancelBtnTxt: {
    color: "#0078FF",
    fontSize: 17,
    fontFamily: "Helvetica",
  },
  takePhoto: {
    color: "#0078FF",
    fontSize: 17,
    fontFamily: "Helvetica",
  },

  pkgContainer: {
    backgroundColor: "#1D2026",
    width: Width - 50,
    paddingHorizontal: 20,
    elevation: 3,
    borderRadius: 10,
    paddingVertical: 15,
    height: 250,
  },
  // Pkg
  pkgTitle: {
    color: "#FF2465",
    fontSize: 16,
    marginVertical: 10,
  },

  pkgButton: {
    position: "absolute",
    bottom: 20,
    right: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#ff2465",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  pkgButtonText: {
    color: "white",
  },
});

const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
  files: state.files.files,
  storageClass: state.files.storageClass,
  theme: state.theme.theme,
});

export default connect(mapStateToProps, {
  switchTheme,
  switchDarkMode,
  addFile,
  setStorageClass,
})(HomeScreen);
