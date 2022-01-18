import React, { useMemo } from "react";
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
  ActivityIndicator,
  Alert,
} from "react-native";
import styled from "styled-components";
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";

import Filecard from "../../components/filecard/filecard";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
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
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

const Width = Dimensions.get("window").width;

const colors = [];
Object.keys(themes).map((key) => {
  colors.push(themes[key]);
});

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

function HomeScreen(props) {
  const [pkg, setPkg] = React.useState("Frequent");

  const [info, setInfo] = React.useState({
    key: "frequent",
    title: "Frequent",
  });
  const navigation = useNavigation();
  let { theme } = props;
  const [modal, setModal] = React.useState(false);
  const [showImagePicker, setShowImagePicker] = React.useState(false);

  const [uploadSection, showUploadSection] = React.useState(false);

  // Pkg Modal
  const [selectPkg, setSelectPkg] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      checkUser();
    }, 1000);
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

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

  const checkUser = async () => {
    let isUserThere = await AsyncStorage.getItem("user");
    // await AsyncStorage.setItem("user", "");
    if (isUserThere) {
      setModal(false);
    } else {
      setModal(true);
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

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => setSelectPkg(!selectPkg);
  //   }, [])
  // );

  // React.useEffect(() => {
  const unsubscribe = navigation.addListener("focus", () => {
    showUploadSection(!uploadSection);
  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);
  // ******************* TESTNG WIDGET *************

  const onSwipe = (direction, state) => {
    if (direction === "SWIPE_RIGHT" && pkg === "Frequent") {
      setPkg("Infrequent");
    } else if (direction === "SWIPE_RIGHT" && pkg === "Infrequent") {
      setPkg("Archieved");
    } else if (direction === "SWIPE_RIGHT" && pkg === "Archieved") {
      setPkg("Frequent");
    } else if (direction === "SWIPE_LEFT" && pkg === "Frequent") {
      setPkg("Infrequent");
    } else if (direction === "SWIPE_LEFT" && pkg === "Infrequent") {
      setPkg("Archieved");
    } else if (direction === "SWIPE_LEFT" && pkg === "Archieved") {
      setPkg("Frequent");
    }
  };

  const nextPkg = (pkg) => {
    if (pkg === "Frequent") {
      setPkg("Infrequent");
    } else if (pkg === "Infrequent") {
      setPkg("Archieved");
    } else if (pkg === "Archieved") {
      setPkg("Frequent");
    }
  };
  const backPkg = (pkg) => {
    if (pkg === "Frequent") {
      setPkg("Infrequent");
    } else if (pkg === "Infrequent") {
      setPkg("Archieved");
    } else if (pkg === "Archieved") {
      setPkg("Frequent");
    }
  };
  return (
    <Container darkMode={props.darkMode}>
      {/* <StatusBar barStyle="default" /> */}
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={() =>
                navigation.navigate(info.title, { name: info.key })
              }
            >
              <Text style={[styles.text, { color: theme.PRIMARY_TEXT_COLOR }]}>
                Unlock Vault
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={selectPkg}
        transparent
        onBackButtonPress={() => setSelectPkg(false)}
        onBackdropPress={() => setSelectPkg(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.pkgContainer}>
            <View style={{ paddingHorizontal: 10, marginTop: 17 }}>
              <Text style={styles.pkgTitle}>Select Access Type</Text>

              <GestureRecognizer
                onSwipe={(direction, state) => onSwipe(direction, state)}
                config={config}
                style={{ paddingVertical: 10 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => nextPkg(pkg)}
                    activeOpacity={0.6}
                  >
                    <MaterialIcons
                      name="keyboard-arrow-left"
                      size={24}
                      color="#FF2465"
                    />
                  </TouchableOpacity>
                  <Text style={styles.pkgTitle}> {pkg}</Text>
                  <TouchableOpacity
                    onPress={() => backPkg(pkg)}
                    activeOpacity={0.6}
                  >
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="#FF2465"
                    />
                  </TouchableOpacity>
                </View>
              </GestureRecognizer>

              <View style={{ marginTop: 10 }}>
                {pkg === "Frequent" ? (
                  <Text
                    style={{
                      color: "white",
                      width: "94%",
                      fontSize: 15,
                      fontFamily: "HelveticaBold",
                      lineHeight: 25,
                    }}
                  >
                    Frequent storage can be retrieved instantly without
                    restrictions
                  </Text>
                ) : pkg === "Infrequent" ? (
                  <Text
                    style={{
                      color: "white",
                      width: "95%",
                      fontSize: 15,
                      fontFamily: "HelveticaBold",
                      lineHeight: 25,
                    }}
                  >
                    Infrequent storage can be retrieved instantly five time per
                    month. Additional unlock keys can be purchased restrictions
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "white",
                      width: "95%",
                      fontSize: 15,
                      fontFamily: "HelveticaBold",
                      lineHeight: 25,
                    }}
                  >
                    Archived storage can be retrieved once per month. Best for
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.pkgButton}
              onPress={() => {
                Alert.alert(
                  "Tier Selected",
                  `You have selected ${pkg} has your preferred tier. Please choose file to proceed`,
                  [
                    {
                      text: "Confirm",
                      onPress: () => {
                        showUploadSection(!uploadSection);
                      },
                    },
                  ]
                );
                setSelectPkg(!selectPkg);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.pkgButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
              backgroundColor: "#525252",
              marginHorizontal: 10,
              paddingVertical: 10,
              marginBottom: 10,
              borderRadius: 10,
              width: Width - 30,
            }}
          >
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "grey" }}>
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
                <Text style={styles.takePhoto}>Choose File</Text>
                <Ionicons name="folder-open-sharp" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "grey" }}>
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
                <MaterialIcons name="photo-library" size={24} color="white" />
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
                    <Text style={styles.takePhoto}>Take Photo or Video</Text>
                    <AntDesign name="camera" size={24} color="white" />
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
                backgroundColor: "#525252",
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
    color: "white",
    fontSize: 17,
    fontFamily: "Helvetica",
  },
  takePhoto: {
    color: "white",
    fontSize: 17,
    fontFamily: "Helvetica",
  },

  pkgContainer: {
    backgroundColor: "#1D2026",
    width: Width - 100,
    paddingHorizontal: 5,
    elevation: 3,
    borderRadius: 10,
    paddingVertical: 5,
    height: 285,
  },
  // Pkg
  pkgTitle: {
    color: "#FF2465",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },

  pkgButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#ff2465",
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  pkgButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
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
