// import React, { useMemo } from "react";
// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   Dimensions,
//   TextInput,
//   Switch,
//   Platform,
//   Image,
//   Modal,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { BlurView } from "expo-blur";
// import styled from "styled-components";

// import GestureRecognizer from "react-native-swipe-gestures";
// import { HomeCard } from "../../components";
// import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import { connect } from "react-redux";

// import * as themes from "../../theme/theme";
// import { switchTheme, switchDarkMode } from "../../store/actions/themeActions";
// import { addFile, setStorageClass } from "../../store/actions/fileActions";
// import axios from "axios";
// import { BASE_URL } from "../../helpers/constants";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from "expo-image-picker";
// import * as DocumentPicker from "expo-document-picker";
// import { AssetsSelector } from "expo-images-picker";
// import { MediaType } from "expo-media-library";
// import { Ionicons } from "@expo/vector-icons";

// const Width = Dimensions.get("window").width;

// const packages = [
//   {
//     name: "Frequent",
//   },

//   {
//     name: "Infrequent",
//   },
//   {
//     name: "Archived",
//   },
// ];

// const buttons = [
//   {
//     name: "Login",
//   },
//   {
//     name: "Sign-Up",
//   },
// ];

// const colors = [];
// Object.keys(themes).map((key) => {
//   colors.push(themes[key]);
// });

// const config = {
//   velocityThreshold: 0.3,
//   directionalOffsetThreshold: 80,
// };

// function HomeScreen(props) {
//   const [active, setActive] = React.useState("Home");
//   const [pkg, setPkg] = React.useState("Frequent");
//   const [activeButton, setButton] = React.useState("Login");
//   const [modal, setModal] = React.useState(false);
//   const [themeModal, setThemeModal] = React.useState(false);
//   const [isEnabled, setIsEnabled] = React.useState(true);
//   const [security, showSecutity] = React.useState(false);
//   const [code, verifyCode] = React.useState(false);
//   const [showImagePicker, setShowImagePicker] = React.useState(false);

//   // Auth States
//   const [username, setUserName] = React.useState("ahsanihsan");
//   const [password, setPassword] = React.useState("ahsan11343");
//   const [email, setEmail] = React.useState("ahsan.ihsan@outlook.com");
//   const [confirmPassword, setConfirmPassword] = React.useState("");
//   const [submitting, setSubmitting] = React.useState(false);

//   const [uploadSection, showUploadSection] = React.useState(false);

//   const [sms, setVerifySms] = React.useState(false);
//   const [google, setGoogleAuth] = React.useState(false);

//   React.useEffect(() => {
//     setTimeout(() => {
//       checkUser();
//     }, 1000);
//     (async () => {
//       if (Platform.OS !== "web") {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert("Sorry, we need camera roll permissions to make this work!");
//         }
//       }
//     })();
//   }, []);

//   const pickFile = async () => {
//     let result = await DocumentPicker.getDocumentAsync({
//       type: "*/*",
//       multiple: true,
//       copyToCacheDirectory: true,
//     });
//     if (result.type !== "cancel") {
//       props.addFile([result]);
//       showUploadSection(false);
//       props.navigation.navigate("upload", { name: pkg });
//     }
//   };

//   const checkUser = async () => {
//     let isUserThere = await AsyncStorage.getItem("user");
//     // await AsyncStorage.setItem("user", "");
//     if (isUserThere) {
//       setModal(false);
//     } else {
//       setModal(true);
//     }
//   };

//   const handleLoginSubmit = () => {
//     setSubmitting(true);
//     axios
//       .post(BASE_URL + "auth/signin", {
//         username,
//         password,
//       })
//       .then(async (response) => {
//         // console.log(response.data.token);
//         await AsyncStorage.setItem("user", response.data.token);
//         setModal(false);
//         setSubmitting(false);
//       })
//       .catch((error) => {
//         if (error && error.response) {
//           Alert.alert("Error", error.response.data.msg);
//           setSubmitting(false);
//         } else {
//           Alert.alert(
//             "Error",
//             "There is a problem in requesting data, please try again later."
//           );
//           setSubmitting(false);
//         }
//       });
//   };

//   const handleSignUpSubmit = () => {
//     if (password === confirmPassword) {
//       setSubmitting(true);
//       axios
//         .post(BASE_URL + "auth/signup", {
//           username,
//           password,
//           email,
//         })
//         .then(async (response) => {
//           await AsyncStorage.setItem("user", response.data.token);
//           setSubmitting(false);
//           setModal(false);
//         })
//         .catch((error) => {
//           if (error && error.response) {
//             Alert.alert("Error", error.response.data.msg);
//             setSubmitting(false);
//           } else {
//             Alert.alert(
//               "Error",
//               "There is a problem in requesting data, please try again later."
//             );
//             setSubmitting(false);
//           }
//         });
//     } else {
//       Alert.alert("Error", "Passwords dont match");
//     }
//   };

//   // ******************* TESTNG WIDGET *************
//   const onSuccess = (data) => {
//     // Alert.alert("Done", data.length + "Images selected");
//     if (data.length > 0) {
//       props.addFile(data);
//       showUploadSection(false);
//       setShowImagePicker(false);
//       props.navigation.navigate("upload", { name: pkg });
//     }
//   };

//   const widgetErrors = useMemo(
//     () => ({
//       errorTextColor: "black",
//       errorMessages: {
//         hasErrorWithPermissions: "Please Allow media gallery permissions.",
//         hasErrorWithLoading: "There was error while loading images.",
//         hasErrorWithResizing: "There was error while loading images.",
//         hasNoAssets: "No images found.",
//       },
//     }),
//     []
//   );

//   const widgetSettings = useMemo(
//     () => ({
//       getImageMetaData: false, // true might perform slower results
//       initialLoad: 100,
//       assetsType: [MediaType.photo, MediaType.video],
//       minSelection: 1,
//       // maxSelection: 3,
//       portraitCols: 4,
//       landscapeCols: 4,
//     }),
//     []
//   );

//   const widgetResize = useMemo(
//     () => ({
//       width: 50,
//       compress: 0.7,
//       base64: false,
//       saveTo: "jpeg",
//     }),
//     []
//   );

//   const _textStyle = {
//     color: "white",
//   };

//   const _buttonStyle = {
//     backgroundColor: "blue",
//     borderRadius: 5,
//   };

//   const widgetNavigator = useMemo(
//     () => ({
//       Texts: {
//         finish: "Done",
//         back: "Back",
//         selected: "Selected",
//       },
//       midTextColor: "black",
//       minSelection: 1,
//       buttonTextStyle: _textStyle,
//       buttonStyle: _buttonStyle,
//       onBack: () => {
//         setShowImagePicker(false);
//       },
//       onSuccess: (e) => onSuccess(e),
//     }),
//     []
//   );

//   const widgetStyles = useMemo(
//     () => ({
//       margin: 2,
//       bgColor: "white",
//       spinnerColor: "blue",
//       widgetWidth: 100,
//       zIndex: 100,
//       marginTop: 20,
//       videoIcon: {
//         Component: Ionicons,
//         iconName: "ios-videocam",
//         color: "tomato",
//         size: 20,
//       },
//       selectedIcon: {
//         Component: Ionicons,
//         iconName: "ios-checkmark-circle-outline",
//         color: "white",
//         bg: "#0eb14970",
//         size: 26,
//       },
//     }),
//     []
//   );
//   // ******************* TESTNG WIDGET *************

//   return (
//     <Container darkMode={props.darkMode}>
//       <StatusBar barStyle="default" />
//       <Modal visible={showImagePicker}>
//         <View style={{ flex: 1, marginTop: 50 }}>
//           <AssetsSelector
//             Settings={widgetSettings}
//             Errors={widgetErrors}
//             Styles={widgetStyles}
//             Navigator={widgetNavigator}
//             // Resize={widgetResize} know how to use first , perform slower results.
//           />
//         </View>
//       </Modal>
//       <Header>
//         <GestureRecognizer
//           onSwipeLeft={(state) => setActive("Upload")}
//           onSwipeRight={(state) => setActive("Home")}
//         >
//           <View style={styles.row}>
//             <TouchableOpacity
//               activeOpacity={0.5}
//               onPress={() => setActive("Home")}
//             >
//               <Text
//                 style={
//                   active === "Home" ? styles.activeTab : styles.inActiveTab
//                 }
//               >
//                 Home
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               activeOpacity={0.7}
//               onPress={() => setActive("Upload")}
//             >
//               <Text
//                 style={
//                   active === "Upload" ? styles.activeTab : styles.inActiveTab
//                 }
//               >
//                 Upload
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View>
//             {active === "Home" ? (
//               <View>
//                 <View style={styles.headerInfo}>
//                   <Heading
//                     style={{
//                       fontSize: 24,
//                       fontFamily: "Roboto",
//                       fontWeight: "700",
//                       color: "white",
//                     }}
//                   >
//                     Your {"\n"}Cloud{"\n"}Safe Haven
//                   </Heading>
//                 </View>

//                 <View style={styles.headerInfo}>
//                   <Text style={styles.info}>
//                     You are using free version of Heaven
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => props.navigation.navigate("subscription")}
//                     activeOpacity={0.8}
//                   >
//                     <Text style={styles.upgrade}>Upgrade</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ) : (
//               <View>
//                 <View style={styles.headerInfo}>
//                   <Text
//                     style={[styles.info, { fontSize: 16, textAlign: "left" }]}
//                   >
//                     Choose between Frequent, Infrequent, or Archived access. If
//                     you are not sure, Choose Frequent for now
//                   </Text>

//                   <View style={{ flexDirection: "row", marginVertical: 15 }}>
//                     {packages &&
//                       packages.map((val, i) => {
//                         return (
//                           <TouchableOpacity
//                             onPress={() => {
//                               props.setStorageClass(val.name);
//                               setPkg(val.name);
//                             }}
//                             activeOpacity={0.7}
//                             key={i}
//                           >
//                             <Text
//                               style={[
//                                 val.name === pkg
//                                   ? styles.activeTab
//                                   : styles.inActiveTab,
//                                 {
//                                   fontSize: 18,
//                                 },
//                               ]}
//                             >
//                               {val.name}
//                             </Text>
//                           </TouchableOpacity>
//                         );
//                       })}
//                   </View>
//                 </View>

//                 <TouchableOpacity
//                   onPress={() => {
//                     showUploadSection(true);
//                   }}
//                   activeOpacity={0.5}
//                   style={styles.btn}
//                 >
//                   <Heading
//                     style={{
//                       fontWeight: "700",
//                     }}
//                   >
//                     Continue
//                   </Heading>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </GestureRecognizer>
//       </Header>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.body}>
//           <HomeCard
//             onPressFrequent={() => {
//               props.navigation.navigate("Frequent", { name: pkg });
//             }}
//             onPressInfrequent={() => {
//               props.navigation.navigate("Infrequent", { name: pkg });
//             }}
//             onPressArchived={() => {
//               props.navigation.navigate("Archived", { name: pkg });
//             }}
//           />
//         </View>
//         <View style={{ height: 100 }} />
//       </ScrollView>

//       <Modal visible={modal} transparent>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <View style={styles.authContainer}>
//             <View style={styles.modalRow}>
//               {buttons &&
//                 buttons.map((val, i) => {
//                   return (
//                     <FormSwitch
//                       onPress={() => setButton(val.name)}
//                       key={i}
//                       activeOpacity={0.5}
//                       activeBtn={activeButton}
//                       btnName={val.name}
//                       activeBtn={activeButton}
//                       btnName={val.name}
//                     >
//                       <SwitchText activeBtn={activeButton} btnName={val.name}>
//                         {val.name}
//                       </SwitchText>
//                     </FormSwitch>
//                   );
//                 })}
//             </View>
//             <View style={styles.modalBody}>
//               {activeButton === "Login" ? (
//                 <View>
//                   <TextInput
//                     placeholderTextColor="#C4C4C4"
//                     style={styles.input}
//                     placeholder="Username"
//                     autoCorrect={false}
//                     onChangeText={(text) => setUserName(text)}
//                     value={username}
//                   />
//                   <LineBreak />

//                   <TextInput
//                     placeholderTextColor="#C4C4C4"
//                     style={styles.input}
//                     placeholder="Master Password"
//                     secureTextEntry={true}
//                     onChangeText={(text) => setPassword(text)}
//                     value={password}
//                   />

//                   <LineBreak />

//                   <LoginButton
//                     onPress={() => {
//                       // setModal(false);
//                       // setThemeModal(true);
//                       handleLoginSubmit();
//                     }}
//                     activeOpacity={0.7}
//                   >
//                     {submitting ? (
//                       <ActivityIndicator />
//                     ) : (
//                       <Text style={styles.modalLoginText}>Login</Text>
//                     )}
//                   </LoginButton>
//                 </View>
//               ) : (
//                 <View>
//                   <View>
//                     <TextInput
//                       placeholderTextColor="#C4C4C4"
//                       style={styles.input}
//                       placeholder="Username"
//                       autoCorrect={false}
//                       onChangeText={(text) => setUserName(text)}
//                       value={username}
//                     />
//                     <LineBreak />
//                     <TextInput
//                       placeholderTextColor="#C4C4C4"
//                       style={styles.input}
//                       placeholder="Email"
//                       autoCorrect={false}
//                       onChangeText={(text) => setEmail(text)}
//                       value={email}
//                     />
//                     <LineBreak />

//                     <TextInput
//                       placeholderTextColor="#C4C4C4"
//                       style={styles.input}
//                       placeholder="Master Password"
//                       secureTextEntry={true}
//                       onChangeText={(text) => setPassword(text)}
//                       value={password}
//                     />
//                     <LineBreak />

//                     <TextInput
//                       placeholderTextColor="#C4C4C4"
//                       style={styles.input}
//                       placeholder="Confirm Master Password"
//                       secureTextEntry={true}
//                       onChangeText={(text) => setConfirmPassword(text)}
//                       value={confirmPassword}
//                     />
//                     <LineBreak />

//                     <View style={{ marginTop: 10 }}>
//                       <Text style={styles.terms}>
//                         By signing up, you agree to our
//                       </Text>
//                       <View>
//                         <Text style={[styles.terms, { fontWeight: "700" }]}>
//                           Terms and Conditions
//                         </Text>
//                         <Text style={[styles.terms]}>and</Text>
//                         <Text
//                           style={[
//                             styles.terms,
//                             { fontWeight: "700", marginBottom: 20 },
//                           ]}
//                         >
//                           Privacy Policy
//                         </Text>
//                       </View>
//                     </View>
//                     <LoginButton
//                       onPress={() => {
//                         // setModal(false);
//                         // showSecutity(true);
//                         handleSignUpSubmit();
//                       }}
//                       activeOpacity={0.7}
//                     >
//                       {submitting ? (
//                         <ActivityIndicator />
//                       ) : (
//                         <Text style={styles.modalLoginText}>Sign-Up</Text>
//                       )}
//                     </LoginButton>
//                   </View>
//                 </View>
//               )}
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal visible={themeModal} transparent>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <View style={styles.authContainer}>
//             <View
//               style={[
//                 styles.modalBody,
//                 { paddingVertical: 10, width: Width - 70 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.heading,
//                   { color: "#1D2026", marginVertical: 5, textAlign: "center" },
//                 ]}
//               >
//                 Choose Theme and Appearance
//               </Text>

//               <View
//                 style={[
//                   styles.row,
//                   {
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     marginTop: 10,
//                   },
//                 ]}
//               >
//                 {colors &&
//                   colors.map((val, i) => {
//                     return (
//                       <ThemeColors
//                         key={i}
//                         onPress={() => props.switchTheme(val)}
//                         activeOpacity={0.5}
//                         style={[
//                           styles.colorBox,
//                           {
//                             backgroundColor: val.PRIMARY_BACKGROUD_COLOR,
//                             borderColor: val.PRIMARY_BACKGROUD_COLOR,
//                           },
//                         ]}
//                       ></ThemeColors>
//                     );
//                   })}
//               </View>

//               <View
//                 style={[styles.row, { marginTop: 15, alignSelf: "center" }]}
//               >
//                 <Text style={[styles.dark, { marginRight: 10 }]}>
//                   Dark Mode
//                 </Text>
//                 <Switch
//                   trackColor={{ false: "#1D2026", true: "#1D2026" }}
//                   thumbColor={isEnabled ? "white" : "#f4f3f4"}
//                   ios_backgroundColor="#3e3e3e"
//                   onValueChange={(val) => {
//                     props.switchDarkMode(val);
//                   }}
//                   value={props.darkMode}
//                 />
//               </View>

//               <LoginButton
//                 onPress={async () => {
//                   verifyCode(false);
//                   showSecutity(false);
//                   setThemeModal(false);
//                 }}
//                 activeOpacity={0.7}
//               >
//                 <Text style={styles.modalLoginText}>Next</Text>
//               </LoginButton>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* 2FA Section Start */}

//       <Modal visible={security} transparent>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <View style={styles.authContainer}>
//             <View
//               style={[
//                 styles.modalBody,
//                 { paddingVertical: 10, width: Width - 70 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.heading,
//                   { color: "#1D2026", marginVertical: 5, textAlign: "center" },
//                 ]}
//               >
//                 Would you like to enable 2 Factor Authentication?
//               </Text>

//               <View style={styles.mainRow}>
//                 <Text style={[styles.dark, { marginRight: 10 }]}>
//                   SMS Message
//                 </Text>
//                 <Switch
//                   trackColor={{ false: "#1D2026", true: "#1D2026" }}
//                   thumbColor={sms ? "white" : "#f4f3f4"}
//                   ios_backgroundColor="#3e3e3e"
//                   onValueChange={(val) => {
//                     setVerifySms(val);
//                     setGoogleAuth(false);
//                   }}
//                   value={sms}
//                 />
//               </View>
//               <View style={styles.mainRow}>
//                 <Text style={[styles.dark, { marginRight: 10 }]}>
//                   Google Authenticater
//                 </Text>
//                 <Switch
//                   trackColor={{ false: "#1D2026", true: "#1D2026" }}
//                   thumbColor={google ? "white" : "#f4f3f4"}
//                   ios_backgroundColor="#3e3e3e"
//                   onValueChange={(val) => {
//                     setVerifySms(false);
//                     setGoogleAuth(val);
//                   }}
//                   value={google}
//                 />
//               </View>

//               {sms ? (
//                 <>
//                   <TextInput
//                     placeholderTextColor="#C4C4C4"
//                     style={[styles.input]}
//                     placeholder="Phone Number"
//                     keyboardType="phone-pad"
//                     autoCorrect={false}
//                   />
//                   <View style={[styles.line, { borderBottomWidth: 1 }]} />
//                 </>
//               ) : null}

//               {google ? (
//                 <View>
//                   <Image
//                     style={{
//                       width: 100,
//                       height: 100,
//                       alignSelf: "center",
//                       marginVertical: 10,
//                     }}
//                     source={require("../../assets/code.png")}
//                   />
//                   <TextInput
//                     placeholderTextColor="#C4C4C4"
//                     style={[styles.input]}
//                     placeholder="Confirm Code"
//                     keyboardType="phone-pad"
//                   />
//                   <View style={styles.line} />

//                   <View
//                     style={{
//                       marginTop: 15,
//                       flexDirection: "row",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <TouchableOpacity
//                       activeOpacity={0.5}
//                       onPress={() => {
//                         showSecutity(false);
//                         setThemeModal(true);
//                       }}
//                     >
//                       <Text style={styles.noThanks}>No Thanks </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       onPress={async () => {
//                         showSecutity(false);
//                         setThemeModal(true);
//                       }}
//                       style={[
//                         styles.modalLogin,
//                         {
//                           backgroundColor: "#1D2026",
//                         },
//                       ]}
//                       activeOpacity={0.7}
//                     >
//                       <Text style={[styles.modalLoginText, { fontSize: 20 }]}>
//                         Validate
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ) : null}

//               {google !== true ? (
//                 <View
//                   style={{
//                     marginTop: 15,
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <TouchableOpacity
//                     activeOpacity={0.5}
//                     onPress={() => {
//                       showSecutity(false);
//                       setThemeModal(true);
//                     }}
//                   >
//                     <Text style={styles.noThanks}>No Thanks </Text>
//                   </TouchableOpacity>

//                   <LoginButton
//                     onPress={async () => {
//                       showSecutity(false);
//                       setThemeModal(false);
//                       verifyCode(true);
//                     }}
//                     activeOpacity={0.7}
//                   >
//                     <Text style={[styles.modalLoginText, { fontSize: 20 }]}>
//                       Send SMS
//                     </Text>
//                   </LoginButton>
//                 </View>
//               ) : null}
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* 2FA Section Closed */}

//       {/* Verification Code Modal */}
//       <Modal visible={code} transparent>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <View style={styles.authContainer}>
//             <View
//               style={[
//                 styles.modalBody,
//                 { paddingVertical: 10, width: Width - 70 },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.heading,
//                   { color: "#1D2026", marginVertical: 5, textAlign: "center" },
//                 ]}
//               >
//                 Would you like to enable 2 Factor Authentication?
//               </Text>

//               <View style={styles.mainRow}>
//                 <Text style={[styles.dark, { marginRight: 10 }]}>
//                   SMS Message
//                 </Text>
//                 <Switch
//                   trackColor={{ false: "#1D2026", true: "#1D2026" }}
//                   thumbColor={sms ? "white" : "#f4f3f4"}
//                   ios_backgroundColor="#3e3e3e"
//                   onValueChange={(val) => {
//                     setVerifySms(val);
//                     setGoogleAuth(false);
//                   }}
//                   value={sms}
//                 />
//               </View>
//               <View style={styles.mainRow}>
//                 <Text style={[styles.dark, { marginRight: 10 }]}>
//                   Google Authenticater
//                 </Text>
//                 <Switch
//                   trackColor={{ false: "#1D2026", true: "#1D2026" }}
//                   thumbColor={google ? "white" : "#f4f3f4"}
//                   ios_backgroundColor="#3e3e3e"
//                   onValueChange={(val) => {
//                     setVerifySms(false);
//                     setGoogleAuth(val);
//                   }}
//                   value={google}
//                 />
//               </View>
//               <TextInput
//                 placeholderTextColor="#C4C4C4"
//                 style={[styles.input]}
//                 placeholder="Confirm Code"
//                 keyboardType="phone-pad"
//               />
//               <View style={styles.line} />
//               <View
//                 style={{
//                   marginTop: 15,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <TouchableOpacity
//                   activeOpacity={0.5}
//                   onPress={() => {
//                     showSecutity(false);
//                     verifyCode(false);
//                     setThemeModal(true);
//                   }}
//                 >
//                   <Text style={styles.noThanks}>No Thanks </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={async () => {
//                     showSecutity(false);
//                     verifyCode(false);
//                     setThemeModal(true);
//                   }}
//                   style={[
//                     styles.modalLogin,
//                     {
//                       backgroundColor: "#1D2026",
//                     },
//                   ]}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={styles.modalLoginText}>Validate</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Upload Section */}

//       <Modal visible={uploadSection} transparent>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "flex-end",
//             alignItems: "center",
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: "white",
//               marginHorizontal: 10,
//               paddingVertical: 10,
//               marginBottom: 10,
//               borderRadius: 10,
//               width: Width - 30,
//             }}
//           >
//             {/* <View
//               style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey" }}
//             >
//               <TouchableOpacity
//                 onPress={() => {
//                   showUploadSection(false);
//                   props.navigation.navigate("upload", { name: pkg });
//                 }}
//                 style={[
//                   styles.row,
//                   {
//                     justifyContent: "space-between",
//                     paddingHorizontal: 20,
//                     paddingTop: 5,
//                   },
//                 ]}
//               >
//                 <Text style={styles.takePhoto}>Take Photo</Text>
//                 <AntDesign name="camera" size={24} color="#0078FF" />
//               </TouchableOpacity>
//             </View> */}
//             <View
//               style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey" }}
//             >
//               <TouchableOpacity
//                 onPress={() => {
//                   pickFile();
//                 }}
//                 style={[
//                   styles.row,
//                   {
//                     justifyContent: "space-between",
//                     paddingHorizontal: 20,
//                     paddingTop: 5,
//                   },
//                 ]}
//               >
//                 <Text style={styles.takePhoto}>Select Files</Text>
//                 <MaterialIcons name="archive" size={24} color="#0078FF" />
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 borderBottomWidth: 1,
//                 borderBottomColor: "lightgrey",
//               }}
//             >
//               <TouchableOpacity
//                 onPress={() => {
//                   // pickImage();
//                   showUploadSection(false);
//                   setShowImagePicker(true);
//                 }}
//                 style={[
//                   styles.row,
//                   {
//                     justifyContent: "space-between",
//                     paddingHorizontal: 20,
//                     paddingTop: 5,
//                   },
//                 ]}
//               >
//                 <Text style={styles.takePhoto}>Photo Library</Text>
//                 <MaterialIcons name="photo-library" size={24} color="#0078FF" />
//               </TouchableOpacity>
//             </View>

//             {Platform.OS !== "android" ? null : (
//               <View>
//                 <View
//                   style={{
//                     borderBottomWidth: 1,
//                     borderBottomColor: "lightgrey",
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={() => {
//                       showUploadSection(false);
//                       props.navigation.navigate("upload", { name: pkg });
//                     }}
//                     style={[
//                       styles.row,
//                       {
//                         paddingTop: 5,

//                         justifyContent: "space-between",
//                         paddingHorizontal: 20,
//                       },
//                     ]}
//                   >
//                     <Text style={styles.takePhoto}>iCloud</Text>
//                     <AntDesign name="cloudo" size={24} color="#0078FF" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           </View>

//           <TouchableOpacity
//             style={[
//               styles.cancelBtn,
//               {
//                 width: Width - 30,
//                 bottom: 10,
//                 marginTop: 10,
//               },
//             ]}
//             activeOpacity={0.6}
//             onPress={() => {
//               showUploadSection(false);
//             }}
//           >
//             <Text style={styles.cancelBtnTxt}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </Container>
//   );
// }

// const Container = styled.View`
//   flex: 1;
//   background-color: ${(props) => (props.darkMode === true ? "black" : "white")};
// `;

// const Header = styled.View`
//   padding-horizontal: 20px;
//   padding-vertical: 20px;
//   border-bottom-right-radius: 103px;
//   height: 340px;
//   padding-top: 45px;
//   shadow-offset: { width: 0, height: 2 };
//   shadow-color: #1D2026;
//   shadow-opacity: 1;
//   elevation: 5;
//   background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR}
//   `;
// const Heading = styled.Text`
//   color: ${(props) => props.theme.SECONDARY_TEXT_COLOR};
//   margin-horizontal: 10px;
//   font-size: 20px;
//   font-family: RobotoBold;
//   font-weight: 700;
//   line-height: 24px;
// `;

// const FormSwitch = styled.TouchableOpacity`
//   padding-vertical: 16px;
//   padding-horizontal: 10px;
//   border-radius: 30px;
//   width: 50%;
//   justify-content: center;
//   align-items: center;
//   elevation: 6;
//   shadow-offset: {
//     width: 0;
//     height: 2;
//   }
//   shadow-color: #1d2026;
//   shadow-opacity: 1;
//   background-color: ${(props) =>
//     props.activeBtn === props.btnName
//       ? props.theme.PRIMARY_BACKGROUD_COLOR
//       : "white"};
// `;
// const SwitchText = styled.Text`
//   font-size: 22px;
//   font-family: Roboto;
//   font-weight: 600;
//   line-height: 28px;
//   color: ${(props) =>
//     props.activeBtn === props.btnName
//       ? "white"
//       : props.theme.PRIMARY_BACKGROUD_COLOR};
// `;

// const LineBreak = styled.View`
// border - bottom - width: 2px;
// border - bottom - color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
// margin - vertical: 7px;
// `;
// const LoginButton = styled.TouchableOpacity`
//   background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
//   border-radius: 36px;
//   width: 150px;
//   align-self: center;
//   padding-vertical: 12px;
//   justify-content: center;
//   align-items: center;
//   shadow-offset: { width: 0, height: 2 };
//   shadow-color: #1D2026;
//   shadow-opacity: 1;
//   elevation: 4;
//   margin-top: 10px;
// `;
// const LoginText = styled.Text`
//   color: white;
//   font-size: 22px;
//   font-family: RobotoBold;
//   font-weight: 600;
//   line-height: 25px;
// `;
// const ThemeColors = styled.TouchableOpacity`
//   width: 35px;
//   height: 35px;
//   border-radius: 25px;
//   border-width: 1px;
//   margin-horizontal: 8px;
//   margin-vertical: 8px;
// `;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     borderBottomRightRadius: 103,
//     height: 340,
//     paddingTop: 45,
//     shadowOffset: { width: 0, height: 2 },
//     shadowColor: "#1D2026",
//     shadowOpacity: 1,
//     elevation: 5,
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   heading: {
//     color: "white",
//     marginHorizontal: 10,
//     fontSize: 20,
//     fontFamily: "RobotoBold",
//     fontWeight: "700",
//     lineHeight: 24,
//   },

//   activeTab: {
//     color: "#FFFFFF",
//     marginHorizontal: 10,
//     fontSize: 24,
//     fontFamily: "RobotoBold",
//     lineHeight: 28,
//   },

//   inActiveTab: {
//     color: "#FFFFFF",
//     marginHorizontal: 10,
//     fontSize: 24,
//     fontFamily: "RobotoThin",
//     lineHeight: 28,
//     fontWeight: "400",
//   },
//   headerInfo: {
//     marginVertical: 20,
//   },
//   info: {
//     color: "white",
//     opacity: 0.9,
//     marginHorizontal: 10,
//     fontFamily: "Roboto",
//     fontSize: 14,
//     lineHeight: 16,
//     fontWeight: "400",
//   },
//   upgrade: {
//     color: "white",
//     textDecorationLine: "underline",
//     marginTop: 10,
//     marginHorizontal: 10,
//     fontSize: 14,
//     lineHeight: 16,
//     fontWeight: "700",
//   },

//   body: {
//     marginTop: 60,
//     marginHorizontal: 10,
//   },

//   btn: {
//     alignSelf: "center",
//     backgroundColor: "white",
//     paddingHorizontal: 50,
//     paddingVertical: 12,
//     borderRadius: 30,
//     marginRight: 15,
//     shadowOffset: { width: 0, height: 2 },
//     shadowColor: "#1D2026",
//     shadowOpacity: 1,
//     elevation: 5,
//   },

//   // Modal CSS

//   authContainer: {
//     backgroundColor: "white",
//     elevation: 5,
//     borderRadius: 29.6,
//     shadowOffset: { width: 0, height: 2 },
//     shadowColor: "#1D2026",
//     shadowOpacity: 1,
//   },
//   modalRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: Width - 70,
//     marginBottom: 30,
//   },

//   loginBtn: {
//     paddingVertical: 16,
//     paddingHorizontal: 10,
//     borderRadius: 30,
//     width: "50%",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 6,
//     shadowOffset: { width: 0, height: 2 },
//     shadowColor: "#1D2026",
//     shadowOpacity: 1,
//   },

//   btnText: {
//     fontSize: 22,
//     fontFamily: "Roboto",
//     fontWeight: "600",
//     lineHeight: 28,
//   },
//   modalBody: {
//     paddingHorizontal: 30,
//     paddingBottom: 20,
//   },
//   input: {
//     fontSize: 20,
//     fontFamily: "Roboto",
//     marginTop: 10,
//   },
//   line: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#000000",
//     marginVertical: 7,
//   },
//   modalLogin: {
//     backgroundColor: "#1D2026",
//     borderRadius: 36,
//     width: 150,
//     alignSelf: "center",
//     paddingVertical: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowOffset: { width: 0, height: 2 },
//     shadowColor: "#1D2026",
//     shadowOpacity: 1,
//     elevation: 4,
//     marginTop: 10,
//   },
//   modalLoginText: {
//     color: "white",
//     fontSize: 22,
//     fontFamily: "RobotoBold",
//     fontWeight: "600",
//     lineHeight: 25,
//   },

//   terms: {
//     color: "#C4C4C4",
//     fontSize: 14,
//     textAlign: "center",
//     fontFamily: "Roboto",
//     fontWeight: "400",
//     lineHeight: 16,
//   },

//   colorBox: {
//     width: 30,
//     height: 30,
//     borderRadius: 20,
//     borderWidth: 1,
//     marginHorizontal: 8,
//     marginVertical: 8,
//   },
//   dark: {
//     color: "#1D2026",
//     fontSize: 20,
//     opacity: 0.9,
//     fontWeight: "400",
//     marginVertical: 15,
//     fontFamily: "Roboto",
//     lineHeight: 23,
//   },

//   // Security Modal CSS

//   noThanks: {
//     color: "#1D2026",
//     fontSize: 20,
//     fontFamily: "RobotoBold",
//     opacity: 0.5,
//     lineHeight: 23,
//     marginTop: 3,
//   },

//   mainRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   // Upload

//   cancelBtn: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     paddingVertical: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
//   cancelBtnTxt: {
//     color: "#0078FF",
//     fontSize: 17,
//     fontFamily: "Roboto",
//   },
//   takePhoto: {
//     color: "#0078FF",
//     fontSize: 17,
//     fontFamily: "Roboto",
//   },
// });

// const mapStateToProps = (state) => ({
//   darkMode: state.theme.darkMode,
//   files: state.files.files,
//   storageClass: state.files.storageClass,
// });

// export default connect(mapStateToProps, {
//   switchTheme,
//   switchDarkMode,
//   addFile,
//   setStorageClass,
// })(HomeScreen);

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
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import styled from "styled-components";

import GestureRecognizer from "react-native-swipe-gestures";
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

  const [info, setInfo] = React.useState({
    key: "frequent",
    title: "Frequent",
  });
  const navigation = useNavigation();
  let { theme } = props;
  const [activeButton, setButton] = React.useState("Login");
  const [modal, setModal] = React.useState(false);
  const [themeModal, setThemeModal] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [security, showSecutity] = React.useState(false);
  const [code, verifyCode] = React.useState(false);
  const [showImagePicker, setShowImagePicker] = React.useState(false);

  // Auth States
  const [username, setUserName] = React.useState("ahsanihsan");
  const [password, setPassword] = React.useState("ahsan11343");
  const [email, setEmail] = React.useState("ahsan.ihsan@outlook.com");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const [uploadSection, showUploadSection] = React.useState(false);

  const [sms, setVerifySms] = React.useState(false);
  const [google, setGoogleAuth] = React.useState(false);

  [q2, setSelectPkg] = React.BlurViewuseState(true);

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

  const handleLoginSubmit = () => {
    setSubmitting(true);
    axios
      .post(BASE_URL + "auth/signin", {
        username,
        password,
      })
      .then(async (response) => {
        // console.log(response.data.token);
        await AsyncStorage.setItem("user", response.data.token);
        setModal(false);
        setSubmitting(false);
      })
      .catch((error) => {
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
  };

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
          await AsyncStorage.setItem("user", response.data.token);
          setSubmitting(false);
          setModal(false);
        })
        .catch((error) => {
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
      Alert.alert("Error", "Passwords dont match");
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

      <Modal
        visible={selectPkg}
        transparent
        onRequestClose={() => setSelectPkg(!selectPkg)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={[styles.authContainer, { backgroundColor: "" }]}>
            <Text>sdhkshjdhjs</Text>
          </View>
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

      <Modal visible={true} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.authContainer}>
            <View style={styles.modalRow}>
              {buttons &&
                buttons.map((val, i) => {
                  return (
                    <FormSwitch
                      onPress={() => setButton(val.name)}
                      key={i}
                      activeOpacity={0.5}
                      activeBtn={activeButton}
                      btnName={val.name}
                      activeBtn={activeButton}
                      btnName={val.name}
                    >
                      <SwitchText activeBtn={activeButton} btnName={val.name}>
                        {val.name}
                      </SwitchText>
                    </FormSwitch>
                  );
                })}
            </View>
            <View style={styles.modalBody}>
              {activeButton === "Login" ? (
                <View>
                  <TextInput
                    placeholderTextColor="#C4C4C4"
                    style={styles.input}
                    placeholder="Username"
                    autoCorrect={false}
                    onChangeText={(text) => setUserName(text)}
                    value={username}
                  />
                  <LineBreak />

                  <TextInput
                    placeholderTextColor="#C4C4C4"
                    style={styles.input}
                    placeholder="Master Password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                  />

                  <LineBreak />

                  <LoginButton
                    onPress={() => {
                      // setModal(false);
                      // setThemeModal(true);
                      handleLoginSubmit();
                    }}
                    activeOpacity={0.7}
                  >
                    {submitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Text style={styles.modalLoginText}>Login</Text>
                    )}
                  </LoginButton>
                </View>
              ) : (
                <View>
                  <View>
                    <TextInput
                      placeholderTextColor="#C4C4C4"
                      style={styles.input}
                      placeholder="Username"
                      autoCorrect={false}
                      onChangeText={(text) => setUserName(text)}
                      value={username}
                    />
                    <LineBreak />
                    <TextInput
                      placeholderTextColor="#C4C4C4"
                      style={styles.input}
                      placeholder="Email"
                      autoCorrect={false}
                      onChangeText={(text) => setEmail(text)}
                      value={email}
                    />
                    <LineBreak />

                    <TextInput
                      placeholderTextColor="#C4C4C4"
                      style={styles.input}
                      placeholder="Master Password"
                      secureTextEntry={true}
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                    />
                    <LineBreak />

                    <TextInput
                      placeholderTextColor="#C4C4C4"
                      style={styles.input}
                      placeholder="Confirm Master Password"
                      secureTextEntry={true}
                      onChangeText={(text) => setConfirmPassword(text)}
                      value={confirmPassword}
                    />
                    <LineBreak />

                    <View style={{ marginTop: 10 }}>
                      <Text style={styles.terms}>
                        By signing up, you agree to our
                      </Text>
                      <View>
                        <Text style={[styles.terms, { fontWeight: "700" }]}>
                          Terms and Conditions
                        </Text>
                        <Text style={[styles.terms]}>and</Text>
                        <Text
                          style={[
                            styles.terms,
                            { fontWeight: "700", marginBottom: 20 },
                          ]}
                        >
                          Privacy Policy
                        </Text>
                      </View>
                    </View>
                    <LoginButton
                      onPress={() => {
                        // setModal(false);
                        // showSecutity(true);
                        handleSignUpSubmit();
                      }}
                      activeOpacity={0.7}
                    >
                      {submitting ? (
                        <ActivityIndicator />
                      ) : (
                        <Text style={styles.modalLoginText}>Sign-Up</Text>
                      )}
                    </LoginButton>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={themeModal} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.authContainer}>
            <View
              style={[
                styles.modalBody,
                { paddingVertical: 10, width: Width - 70 },
              ]}
            >
              <Text
                style={[
                  styles.heading,
                  { color: "#1D2026", marginVertical: 5, textAlign: "center" },
                ]}
              >
                Choose Theme and Appearance
              </Text>

              <View
                style={[
                  styles.row,
                  {
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: 10,
                  },
                ]}
              >
                {colors &&
                  colors.map((val, i) => {
                    return (
                      <ThemeColors
                        key={i}
                        onPress={() => props.switchTheme(val)}
                        activeOpacity={0.5}
                        style={[
                          styles.colorBox,
                          {
                            backgroundColor: val.PRIMARY_BACKGROUD_COLOR,
                            borderColor: val.PRIMARY_BACKGROUD_COLOR,
                          },
                        ]}
                      ></ThemeColors>
                    );
                  })}
              </View>

              <View
                style={[styles.row, { marginTop: 15, alignSelf: "center" }]}
              >
                <Text style={[styles.dark, { marginRight: 10 }]}>
                  Dark Mode
                </Text>
                <Switch
                  trackColor={{ false: "#1D2026", true: "#1D2026" }}
                  thumbColor={isEnabled ? "white" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(val) => {
                    props.switchDarkMode(val);
                  }}
                  value={props.darkMode}
                />
              </View>

              <LoginButton
                onPress={async () => {
                  verifyCode(false);
                  showSecutity(false);
                  setThemeModal(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.modalLoginText}>Next</Text>
              </LoginButton>
            </View>
          </View>
        </View>
      </Modal>

      {/* 2FA Section Start */}

      <Modal visible={security} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.authContainer}>
            <View
              style={[
                styles.modalBody,
                { paddingVertical: 10, width: Width - 70 },
              ]}
            >
              <Text
                style={[
                  styles.heading,
                  { color: "#1D2026", marginVertical: 5, textAlign: "center" },
                ]}
              >
                Would you like to enable 2 Factor Authentication?
              </Text>

              <View style={styles.mainRow}>
                <Text style={[styles.dark, { marginRight: 10 }]}>
                  SMS Message
                </Text>
                <Switch
                  trackColor={{ false: "#1D2026", true: "#1D2026" }}
                  thumbColor={sms ? "white" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(val) => {
                    setVerifySms(val);
                    setGoogleAuth(false);
                  }}
                  value={sms}
                />
              </View>
              <View style={styles.mainRow}>
                <Text style={[styles.dark, { marginRight: 10 }]}>
                  Google Authenticater
                </Text>
                <Switch
                  trackColor={{ false: "#1D2026", true: "#1D2026" }}
                  thumbColor={google ? "white" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(val) => {
                    setVerifySms(false);
                    setGoogleAuth(val);
                  }}
                  value={google}
                />
              </View>

              {sms ? (
                <>
                  <TextInput
                    placeholderTextColor="#C4C4C4"
                    style={[styles.input]}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    autoCorrect={false}
                  />
                  <View style={[styles.line, { borderBottomWidth: 1 }]} />
                </>
              ) : null}

              {google ? (
                <View>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      alignSelf: "center",
                      marginVertical: 10,
                    }}
                    source={require("../../assets/code.png")}
                  />
                  <TextInput
                    placeholderTextColor="#C4C4C4"
                    style={[styles.input]}
                    placeholder="Confirm Code"
                    keyboardType="phone-pad"
                  />
                  <View style={styles.line} />

                  <View
                    style={{
                      marginTop: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        showSecutity(false);
                        setThemeModal(true);
                      }}
                    >
                      <Text style={styles.noThanks}>No Thanks </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={async () => {
                        showSecutity(false);
                        setThemeModal(true);
                      }}
                      style={[
                        styles.modalLogin,
                        {
                          backgroundColor: "#1D2026",
                        },
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.modalLoginText, { fontSize: 20 }]}>
                        Validate
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              {google !== true ? (
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      showSecutity(false);
                      setThemeModal(true);
                    }}
                  >
                    <Text style={styles.noThanks}>No Thanks </Text>
                  </TouchableOpacity>

                  <LoginButton
                    onPress={async () => {
                      showSecutity(false);
                      setThemeModal(false);
                      verifyCode(true);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.modalLoginText, { fontSize: 20 }]}>
                      Send SMS
                    </Text>
                  </LoginButton>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>

      {/* 2FA Section Closed */}

      {/* Verification Code Modal */}
      <Modal visible={code} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.authContainer}>
            <View
              style={[
                styles.modalBody,
                { paddingVertical: 10, width: Width - 70 },
              ]}
            >
              <Text
                style={[
                  styles.heading,
                  { color: "#1D2026", marginVertical: 5, textAlign: "center" },
                ]}
              >
                Would you like to enable 2 Factor Authentication?
              </Text>

              <View style={styles.mainRow}>
                <Text style={[styles.dark, { marginRight: 10 }]}>
                  SMS Message
                </Text>
                <Switch
                  trackColor={{ false: "#1D2026", true: "#1D2026" }}
                  thumbColor={sms ? "white" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(val) => {
                    setVerifySms(val);
                    setGoogleAuth(false);
                  }}
                  value={sms}
                />
              </View>
              <View style={styles.mainRow}>
                <Text style={[styles.dark, { marginRight: 10 }]}>
                  Google Authenticater
                </Text>
                <Switch
                  trackColor={{ false: "#1D2026", true: "#1D2026" }}
                  thumbColor={google ? "white" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(val) => {
                    setVerifySms(false);
                    setGoogleAuth(val);
                  }}
                  value={google}
                />
              </View>
              <TextInput
                placeholderTextColor="#C4C4C4"
                style={[styles.input]}
                placeholder="Confirm Code"
                keyboardType="phone-pad"
              />
              <View style={styles.line} />
              <View
                style={{
                  marginTop: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    showSecutity(false);
                    verifyCode(false);
                    setThemeModal(true);
                  }}
                >
                  <Text style={styles.noThanks}>No Thanks </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    showSecutity(false);
                    verifyCode(false);
                    setThemeModal(true);
                  }}
                  style={[
                    styles.modalLogin,
                    {
                      backgroundColor: "#1D2026",
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalLoginText}>Validate</Text>
                </TouchableOpacity>
              </View>
            </View>
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
              backgroundColor: "white",
              marginHorizontal: 10,
              paddingVertical: 10,
              marginBottom: 10,
              borderRadius: 10,
              width: Width - 30,
            }}
          >
            {/* <View
              style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey" }}
            >
              <TouchableOpacity
                onPress={() => {
                  showUploadSection(false);
                  props.navigation.navigate("upload", { name: pkg });
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
                <Text style={styles.takePhoto}>Take Photo</Text>
                <AntDesign name="camera" size={24} color="#0078FF" />
              </TouchableOpacity>
            </View> */}
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
  font-family: RobotoBold;
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
  font-family: Roboto;
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
const LoginText = styled.Text`
  color: white;
  font-size: 22px;
  font-family: RobotoBold;
  font-weight: 600;
  line-height: 25px;
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
    fontFamily: "RobotoBold",
    fontWeight: "700",
    lineHeight: 24,
  },

  activeTab: {
    color: "#FFFFFF",
    marginHorizontal: 10,
    fontSize: 24,
    fontFamily: "RobotoBold",
    lineHeight: 28,
  },

  inActiveTab: {
    color: "#FFFFFF",
    marginHorizontal: 10,
    fontSize: 24,
    fontFamily: "RobotoThin",
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
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
    fontWeight: "600",
    lineHeight: 28,
  },
  modalBody: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  input: {
    fontSize: 20,
    fontFamily: "Roboto",
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
    fontFamily: "RobotoBold",
    fontWeight: "600",
    lineHeight: 25,
  },

  terms: {
    color: "#C4C4C4",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
    lineHeight: 23,
  },

  // Security Modal CSS

  noThanks: {
    color: "#1D2026",
    fontSize: 20,
    fontFamily: "RobotoBold",
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
    fontFamily: "Roboto",
  },
  takePhoto: {
    color: "#0078FF",
    fontSize: 17,
    fontFamily: "Roboto",
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
