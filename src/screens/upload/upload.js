import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components";
const Height = Dimensions.get("screen").height;
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { AntDesign, Entypo } from "@expo/vector-icons";
import PreviewCard from "../../components/upload/PreviewCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest, BASE_URL } from "../../helpers/constants";
import { clearStore } from "../../store/actions/fileActions";
import UploadCard from "../../components/uploadcard/uploadcard";

function UploadScreen(props) {
  const [active, setActive] = React.useState("Upload");
  const [showModal, setShowModal] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [tag, SetTag] = React.useState("");
  // const { name } = props.route.params;
  const [info, setInfo] = React.useState({
    key: "frequent",
    title: "Frequent",
  });
  // console.log(props.storageClass);
  const _handleAddTagPress = () => {
    setShowModal(true);
  };

  const getStorageClass = () => {
    switch (props.storageClass) {
      case "Frequent":
        return "STANDARD";
        break;
      case "Infrequent":
        return "STANDARD_IA";
        break;
      case "Archived":
        return "GLACIER";
        break;
      default:
        return "STANDARD";
        break;
    }
  };

  const uploadAllFilesInQueue = async () => {
    const token = await AsyncStorage.getItem("token");
    const client_secret = await AsyncStorage.getItem("secret");
    if (props.files.length > 0) {
      try {
        setUploading(true);
        props.files.map(async (file) => {
          const formData = new FormData();
          const filesNames = [".docx", ".doc"];
          if (new RegExp(filesNames.join("|")).test(file.uri)) {
            formData.append("file", file);
          } else {
            formData.append("file", {
              uri: file.uri,
              type: file.mimeType,
              name: file.name,
              originalname: file.name,
            });
          }
          console.log(getStorageClass());
          formData.append("tag", tag);
          formData.append("client_secret", client_secret);
          formData.append("storageClass", getStorageClass());
          const res = await apiRequest({
            method: "POST",
            body: formData,
            url: `${BASE_URL}data/upload-file`,
            Authorization: `Bearer ${token}`,
          });
          if (res.status == 200) {
            Alert.alert("Success", res.data.msg);
            setUploading(false);
          } else {
            Alert.alert("Error", "File not successfully uploaded");
            setUploading(false);
          }
        });
      } catch (error) {
        Alert.alert("Error", error.message);
        setUploading(false);
      }
    } else {
      Alert.alert("Please select one or more file to continue");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#151515",
            paddingTop: 45,
            paddingBottom: 20,
          }}
        ></View>
        <View
          style={[
            styles.body,
            { backgroundColor: props.darkMode ? "#151515" : "#151515" },
          ]}
        >
          <UploadCard getPkg={(val) => setInfo(val)} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {props.files.map((item) => {
              return (
                <PreviewCard
                  _handleAddTagPress={_handleAddTagPress}
                  theme={props.theme}
                  tag={tag}
                  name={item.name ? item.name : item.filename}
                  size={item.size}
                  height={item.height}
                  width={item.width}
                  uri={item.uri}
                />
              );
            })}
          </ScrollView>

          <View
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              paddingHorizontal: 5,
              // backgroundColor: "white",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              {/* <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  props.navigation.goBack();
                }}
              >
                <Text
                  style={[
                    styles.noThanks,
                    { color: props.darkMode ? "white" : "#1D2026" },
                  ]}
                >
                  Select More
                </Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                onPress={async () => {
                  uploadAllFilesInQueue();
                }}
                style={[
                  styles.modalLogin,
                  {
                    backgroundColor: "#FF2465",
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text style={styles.modalLoginText}>
                  {uploading ? "Please wait..." : "Upload"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Modal for Adding Tag */}
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
              onChangeText={(text) => {
                SetTag(text);
              }}
              placeholderTextColor="white"
              style={styles.input}
            />

            <View style={styles.modalTagView}>
              <Tag>
                <Text style={{ color: "white" }}>
                  {tag == "" ? "No tag" : tag}
                </Text>
              </Tag>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <OptionIcon name="dots-three-horizontal" />
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    alignSelf: "flex-end",
                    width: 20,
                    height: 20,
                    backgroundColor: "#FF2465",
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                  onPress={() => setShowModal(false)}
                >
                  <AntDesign name="close" size={12} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </View>
  );
}

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
const Tag = styled.View`
  background-color: #ff2465;
  padding-vertical: 10px;
  padding-horizontal: 15px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;

const OptionIcon = styled(Entypo)`
  font-size: 16px;
  color: white;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#1D2026",
    shadowOpacity: 1,
    elevation: 5,
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
    fontSize: 18,
    fontFamily: "HelveticaBold",
  },

  activeTab: {
    color: "white",
    marginHorizontal: 10,
    fontSize: 25,
    fontFamily: "HelveticaBold",
  },

  inActiveTab: {
    color: "white",
    marginHorizontal: 10,
    fontSize: 25,
    fontFamily: "Helvetica",
  },
  headerInfo: {
    marginVertical: 20,
    paddingHorizontal: 20,
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
  body: {
    paddingHorizontal: 15,
    flex: 1,
    elevation: 5,
    backgroundColor: "white",
  },
  cardView: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingTop: 20,
  },
  cardRow: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: "100%",
    height: 60,
  },
  input: {
    borderBottomWidth: 0.6,
    borderBottomColor: "white",
    fontFamily: "Helvetica",
    marginVertical: 5,
    width: "80%",
    paddingBottom: 3,
  },
  text: {
    color: "#C4C4C4",
    fontSize: 16,
    fontFamily: "Helvetica",
    fontWeight: "600",
  },
  noThanks: {
    fontSize: 16,
    fontFamily: "HelveticaBold",
    opacity: 0.5,
  },
  modalLogin: {
    borderRadius: 10,
    width: 120,
    alignSelf: "center",
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#1D2026",
    shadowOpacity: 1,
    elevation: 4,
  },
  modalLoginText: {
    color: "white",
    fontSize: 16,
    fontFamily: "HelveticaBold",
  },

  rowFront: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  modalTagView: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
  theme: state.theme.theme,
  files: state.files.files,
  storageClass: state.files.storageClass,
});

export default connect(mapStateToProps, { clearStore })(UploadScreen);
