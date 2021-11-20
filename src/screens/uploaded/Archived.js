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
import { BASE_URL } from "../../helpers/constants";

function UploadedScreen({ route, navigation, darkMode }) {
  const [view, setView] = React.useState(false);
  const [visible, setIsVisible] = useState(false);
  const [data, setData] = useState("");
  const { name } = route.params;

  const [timeUpdate, setTimeUpdate] = React.useState(false);
  const [counter, setCounter] = React.useState(1800);
  const [time, setTime] = React.useState("30:00");
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  let timer;

  const _handleResetPress = () => {
    setCounter(1800);
  };

  React.useEffect(() => {
    // timer = setInterval(() => {
    //   setCounter((prevCount) => {
    //     let minutes = Math.floor(prevCount / 60);
    //     let seconds = prevCount - minutes * 60;
    //     if (minutes >= 0 && seconds >= 0) {
    //       setTime(`${minutes}:${seconds > 9 ? seconds : "0" + seconds}`);
    //     } else {
    //       navigation.goBack();
    //     }
    //     return prevCount - 1;
    //   });
    // }, 1000);
    getFiles();
    // return () => clearInterval(timer);
  }, []);

  const getFiles = async () => {
    const token = await AsyncStorage.getItem("token");
    axios
      .get(BASE_URL + "data/files/archieved", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response && response.data) {
          setUploadedFiles(response.data.archived);
          setLoading(false);
        }
      });
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
              Archived Vault
            </Text>
          </Row>

          <Row style={{ justifyContent: "space-between" }}>
            <LockTxt style={{ fontSize: 20 }}>27:41</LockTxt>
            <ResetButton onPress={() => _handleResetPress()}>
              <LockTxt>Reset</LockTxt>
            </ResetButton>
            <LockButton onPress={() => navigation.goBack()}>
              <LockTxt>Lock</LockTxt>
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
                          <TouchableOpacity
                            onPress={() => {
                              setIsVisible(!visible);
                              setData(val);
                            }}
                          >
                            <Image
                              source={{
                                uri: val.location,
                              }}
                              style={{
                                width: "100%",
                                height: 80,
                                resizeMode: "stretch",
                              }}
                            />
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
                                #{i}
                              </Text>
                            </LockButton>
                          </TouchableOpacity>
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
                  uri: data.location,
                },
              ]}
              imageIndex={0}
              visible={visible}
              FooterComponent={() => (
                <ImageViewFooter>
                  <TouchableOpacity activeOpacity={0.7}>
                    <AntDesign name="download" size={24} color="#1D2026" />
                  </TouchableOpacity>
                  <Tag>
                    <Text style={{ color: "white", fontSize: 14 }}>
                      #1{/* {data.tag} */}
                    </Text>
                  </Tag>
                  <OptionIcon name="dots-three-horizontal" />
                  <TouchableOpacity activeOpacity={0.6}>
                    <AntDesign name="delete" size={24} color="#1D2026" />
                  </TouchableOpacity>
                </ImageViewFooter>
              )}
              onRequestClose={() => setIsVisible(false)}
            />
          </ScrollView>
        </View>
      </MenuContainer>
    </View>
  );
}

const MenuContainer = styled.View`
  padding-top: 50px;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
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

  title: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    lineHeight: 28,
    fontStyle: "normal",
    fontFamily: "Helvetica",
  },

  line: {
    height: 2,
    // width: "90%",
    backgroundColor: "white",
    marginVertical: 10,
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
