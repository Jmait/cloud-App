import React, { useState } from "react";
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
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import styled from "styled-components";
const Height = Dimensions.get("screen").height;
import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { apiRequest, BASE_URL } from "../../helpers/constants";
import CountDown from "react-native-countdown-component";
import { downloadImageLocally } from "./image-downloader";
import Modal from "react-native-modal";

function UploadedScreen({ route, navigation, darkMode }) {
  const [view, setView] = React.useState(false);
  const [visible, setIsVisible] = useState(false);
  const [data, setData] = useState("");
  const { name } = route.params;

  const [renaming, setTagRenaming] = React.useState(false);
  const [counter, setCounter] = React.useState(1800);
  const [timer, setTime] = React.useState(60 * 29 + 59);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);

  const [isLoading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [tag, SetTag] = React.useState("");
  const [id, setId] = React.useState(0);
  const [secret, setClientSecret] = React.useState("");
  const [serverSecret, setServerSecret] = React.useState("");
  const _handleResetPress = () => {
    setId(Math.random());
    setCounter(1800);
  };

  // check loading of the content to be displayed
  const [loadItem, setLoadItem] = useState(true);

  let client_secret;
  React.useEffect(async () => {
    getServerSecret();
    getFiles();
  }, []);

  const getServerSecret = async () => {
    const token = await AsyncStorage.getItem("token");
    axios
      .get(BASE_URL + "data/server-secret", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response && response.data) {
          // console.log(response.data.msg);
          setServerSecret(response.data.msg);
          setLoadItem(false);
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.response.data.msg);
      });
  };

  const getFiles = async () => {
    console.log("i am called");
    const token = await AsyncStorage.getItem("token");
    const client_secret = await AsyncStorage.getItem("secret");
    setClientSecret(client_secret);
    axios
      .get(BASE_URL + "data/files/frequent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response && response.data) {
          // console.log(response.data.frequent);
          setUploadedFiles(response.data.frequent);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.response.data.msg);
      });
  };

  const RenameTag = async (file) => {
    try {
      setTagRenaming(true);
      const token = await AsyncStorage.getItem("token");
      const response = await apiRequest({
        method: "PUT",
        url: `${BASE_URL}data/rename-tag`,
        body: { id: file.id, tag },
        Authorization: `Bearer ${token}`,
      });
      if (response) {
        setShowModal(false);
        setTagRenaming(false);
        Alert.alert(
          "Success",
          "Your file tag has been successfully updated.Please referesh the page."
        );
      }
    } catch (error) {
      setTagRenaming(false);
      setShowModal(false);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
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
                color="#FF2465"
              />
            </TouchableOpacity>

            <Text style={[styles.title, { marginLeft: 50 }]}>
              Frequent Vault
            </Text>
          </Row>

          <Row style={{ justifyContent: "space-between" }}>
            <LockTxt style={{ fontSize: 25 }}>
              <CountDown
                id={`${id}`}
                digitStyle={{ backgroundColor: "none" }}
                digitTxtStyle={{ color: "white" }}
                until={timer}
                showSeparator={false}
                timeLabels={{ m: null, s: null }}
                timeToShow={["M", "S"]}
                onFinish={() => navigation.goBack()}
              />
            </LockTxt>
            <ResetButton onPress={() => _handleResetPress()}>
              <LockTxt>Reset</LockTxt>
            </ResetButton>
            <LockButton onPress={() => navigation.goBack()}>
              <LockTxt>Lock Now</LockTxt>
            </LockButton>

            <View style={[styles.row, { justifyContent: "flex-end" }]}>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                activeOpacity={0.5}
                onPress={() => setView(!view)}
              >
                <MaterialIcons
                  name={view ? "grid-view" : "format-list-bulleted"}
                  size={30}
                  color={"#FF2465"}
                />
              </TouchableOpacity>

              <FontAwesome name="sort" size={30} color={"#FF2465"} />
            </View>
          </Row>

          <View style={styles.sectionStyle}>
            <EvilIcons
              style={styles.imageStyle}
              name="search"
              size={24}
              color="#FF2465"
            />
            <TextInput
              style={{ flex: 1, color: "white" }}
              placeholder="Search...."
              placeholderTextColor={darkMode ? "grey" : "grey"}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <View style={[styles.body]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cardContainer}>
              {view ? (
                <View style={styles.list}>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.heading,
                        { color: darkMode ? "white" : "#1D2026" },
                      ]}
                    >
                      Name
                    </Text>
                    <Text
                      style={[
                        styles.heading,
                        { color: darkMode ? "white" : "#1D2026" },
                      ]}
                    >
                      Tag
                    </Text>
                    <Text
                      style={[
                        styles.heading,
                        { color: darkMode ? "white" : "#1D2026" },
                      ]}
                    >
                      Type
                    </Text>
                    <Text
                      style={[
                        styles.heading,
                        { color: darkMode ? "white" : "#1D2026" },
                      ]}
                    >
                      Size
                    </Text>
                  </View>
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    uploadedFiles &&
                    uploadedFiles.map((val, i) => {
                      return (
                        <View key={i}>
                          <View style={styles.row}>
                            <TouchableOpacity
                              onPress={() => {
                                setIsVisible(!visible);
                                setData(val);
                              }}
                              style={{ width: "25%" }}
                            >
                              <Text
                                style={[
                                  styles.name,
                                  {
                                    width: "100%",
                                    color: darkMode ? "white" : "#1D2026",
                                  },
                                ]}
                              >
                                {val.fileName}
                              </Text>
                            </TouchableOpacity>
                            <Tag>
                              <Text style={{ color: "white" }}>{i}</Text>
                            </Tag>
                            <Text
                              style={[
                                styles.name,
                                { color: darkMode ? "white" : "#1D2026" },
                              ]}
                            >
                              {val.fileType}
                            </Text>
                            <Text
                              style={[
                                styles.name,
                                { color: darkMode ? "white" : "#1D2026" },
                              ]}
                            >
                              {val.fileSize}
                            </Text>
                          </View>

                          <View
                            style={[
                              styles.line,
                              {
                                height: 1,
                                width: "100%",
                                marginHorizontal: 10,
                              },
                            ]}
                          />
                        </View>
                      );
                    })
                  )}
                </View>
              ) : (
                <View style={styles.grid}>
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    uploadedFiles &&
                    uploadedFiles.map((val, i) => {
                      return (
                        <View style={styles.gridCard} key={i}>
                          {loadItem ? (
                            <Text>Loading...</Text>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                setIsVisible(!visible);
                                setData(val);
                              }}
                            >
                              <View>
                                {val.fileType === "image/jpg" ? (
                                  <Image
                                    source={require("../../assets/image.jpeg")}
                                    style={{
                                      width: "100%",
                                      height: 80,
                                      // resizeMode: "stretch",
                                    }}
                                  />
                                ) : null}
                              </View>
                              {/* <Image
                              source={{
                                uri: `${BASE_URL}data/image?key=${val.fileName}&client_secret=${secret}&server_secret=${serverSecret}`,
                              }}
                              style={{
                                width: "100%",
                                height: 80,
                                resizeMode: "stretch",
                              }}
                            /> */}
                              <Text
                                style={{
                                  ...styles.description,
                                  color: darkMode ? "white" : "#1D2026",
                                }}
                              >
                                {val.fileName}
                              </Text>
                              <LockButton style={{ width: 90 }}>
                                <Text
                                  style={[
                                    styles.description,
                                    { fontSize: 13, color: "white" },
                                  ]}
                                >
                                  #{val.tag}
                                </Text>
                              </LockButton>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })
                  )}
                </View>
              )}
            </View>

            <ImageView
              backgroundColor="rgba(0,0,0,0.4)"
              images={[
                {
                  uri: `${BASE_URL}data/image?key=${data.fileName}&client_secret=${secret}&server_secret=${serverSecret}`,
                },
              ]}
              imageIndex={0}
              visible={visible}
              FooterComponent={() => (
                <ImageViewFooter>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={async () => {
                      downloadImageLocally(
                        `${BASE_URL}data/image?key=${data.fileName}&client_secret=${secret}&server_secret=${serverSecret}`,
                        data
                      );
                    }}
                  >
                    <AntDesign name="download" size={24} color="#1D2026" />
                  </TouchableOpacity>
                  <Tag>
                    <Text style={{ color: "white", fontSize: 14 }}>
                      #{data.tag}
                    </Text>
                  </Tag>
                  {/* Modal for Adding Tag */}

                  <TouchableOpacity onPress={() => setShowModal(true)}>
                    <OptionIcon name="dots-three-horizontal" />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6}>
                    <AntDesign name="delete" size={24} color="#1D2026" />
                  </TouchableOpacity>
                </ImageViewFooter>
              )}
              onRequestClose={() => setIsVisible(false)}
            />
          </ScrollView>
          <Modal
            isVisible={showModal}
            onBackButtonPress={() => setShowModal(false)}
            onBackdropPress={() => setShowModal(false)}
          >
            <ModalContainer>
              <ModalContent>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    alignSelf: "flex-end",
                    width: 25,
                    height: 25,
                    backgroundColor: "#FF2465",
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setShowModal(false)}
                >
                  <AntDesign name="close" size={15} color="white" />
                </TouchableOpacity>
                <TextInput
                  placeholder="Enter a new tag..."
                  color="white"
                  onChangeText={(text) => {
                    SetTag(text);
                  }}
                  placeholderTextColor="white"
                  style={styles.input}
                />

                <View style={styles.modalTagView}>
                  <TouchableOpacity
                    onPress={async () => {
                      RenameTag(data);
                    }}
                    style={{
                      backgroundColor: "#FF2465",
                      width: 100,
                      height: 30,
                      color: "white",
                      marginTop: 20,
                      padding: 5,
                      width: 140,
                      backgroundColor: "#FF2465",
                      alignSelf: "flex-start",
                      borderRadius: 100,
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {renaming ? "Please wait..." : "Rename Tag"}
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  ></View>
                </View>
              </ModalContent>
            </ModalContainer>
          </Modal>
        </View>
      </MenuContainer>
    </View>
  );
}

const MenuContainer = styled.View`
  padding-top: 50px;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
`;
const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled.View`
  min-height: 30%;
  width: 90%;
  background-color: white;
  border-radius: 20px;
  padding-horizontal: 20px;
  padding-vertical: 20px;
  overflow: hidden;
  background-color: #1d2026;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const LockButton = styled.TouchableOpacity`
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 10px;
  background-color: #ff2465;
  margin-left: 5px;
`;

const ResetButton = styled.TouchableOpacity`
  padding-vertical: 8px;
  padding-horizontal: 20px;
  border-radius: 10px;
  border-color: #ff2465;
  border-width: 1px;
`;
const LockTxt = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;
const Tag = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
  padding-vertical: 10px;
  padding-horizontal: 15px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 5px;
`;
const ImageViewFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 30px;
  margin-horizontal: 30px;
  background-color: white;
  padding-vertical: 10px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;
const OptionIcon = styled(Entypo)`
  font-size: 22px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    paddingTop: 55,
    backgroundColor: "#1D2026",
  },
  header: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  input: {
    borderBottomWidth: 0.6,
    borderBottomColor: "white",
    fontFamily: "Helvetica",
    marginVertical: 5,
    width: "80%",
    paddingBottom: 3,
  },
  title: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    lineHeight: 28,
    fontStyle: "normal",
    fontFamily: "Helvetica",
  },

  body: {
    paddingBottom: 20,
    paddingHorizontal: 25,
    paddingVertical: 30,
    height: Height,
    backgroundColor: "#1D2026",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    fontStyle: "normal",
    fontFamily: "Helvetica",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    color: "#1D2026",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    width: "25%",
    marginLeft: 10,
  },

  cardContainer: {
    marginVertical: 20,
  },
  grid: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  gridCard: {
    width: "30%",
    marginVertical: 15,
    margin: 5,
  },
  description: {
    textAlign: "center",
    color: "#1D2026",
    fontSize: 15,
    marginTop: 1,
    fontFamily: "Helvetica",
  },
  list: {
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 14,
    color: "#1D2026",
    fontWeight: "600",
    marginVertical: 10,
    // width: "25%",
    // marginLeft: 10,
    fontFamily: "Helvetica",
  },
  timerTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },

  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D2026",
    borderWidth: 0.5,
    borderColor: "#333333",
    height: 40,
    borderRadius: 30,
    marginVertical: 10,
  },
  imageStyle: {
    margin: 5,
    paddingLeft: 5,
  },
});

const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
});

export default connect(mapStateToProps)(UploadedScreen);
