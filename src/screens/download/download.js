import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import ImageView from "react-native-image-viewing";
import styled from "styled-components";
import { apiRequest, BASE_URL } from "../../helpers/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Modal from "react-native-modal";
import { deleteLocalFile } from "../uploaded/image-downloader";
const Height = Dimensions.get("screen").height;
// const {config}= RNFetchBlob
// import RNFS from "react-native-fs"



function DownloadScreen({ navigation, darkMode }) {
  const [view, setView] = React.useState(false);
  const [visible, setIsVisible] = useState(false);
  const [data, setData] = useState("");
  const [download,setDownload]= useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [downloadStarted, setDownloadStarted] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const downloadImageLocally = async(image)=>{
    
    try {
      /****TODO: uninstall expo-permissions library ***/
      setDownloadStarted(true);
      const gifDir = FileSystem.documentDirectory + `Haven/${image.fileName}`;
      const fileUri = gifDir +`Haven/${image.fileName}`
      const dirInfo = await FileSystem.getInfoAsync(gifDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
    }
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
     if (!fileInfo.exists) {
       const file = await FileSystem.downloadAsync(image.location,gifDir);
       console.log(file);
       setDownloadStarted(false)
       const asset = await MediaLibrary.createAssetAsync(uri);
       const album = await MediaLibrary.getAlbumAsync('Download');
       if (album == null) {
        await MediaLibrary.createAlbumAsync('Download', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        Alert.alert("Success","File Successfully downloaded to your phone. Check download folder");

      }
     }
  
  }catch(e){
    Alert.alert("Error",e.message)
    setDownloadStarted(false)
  }
  }


const fetchFile =async()=>{
  try {
    const localFile = await AsyncStorage.getItem('local-files')
    if(localFile){
      const f= JSON.parse(localFile)
      setDownload(f);
      setRefreshing(false)
    } 
  } catch (error) {
    setRefreshing(false)
    Alert.alert(error.message);
  }
}
const onRefresh = React.useCallback(() => {
  setRefreshing(true);
 fetchFile()
}, []);
React.useEffect(() => {
  
  fetchFile();
 
}, []);

const RenameTag= async(id)=>{
  try {
    
  } catch (error) {
    
  }
}



  return (
    <Container style={{ backgroundColor: "#151515" }}>
      <View style={styles.body}>
        <View style={[styles.row, { marginTop: 45 }]}>
          <Text style={[styles.heading, { color: "#FF2465" }]}>
            Saved to this Device.
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={{ marginHorizontal: 7 }}
              activeOpacity={0.5}
              onPress={() => setView(!view)}
            >
              <MaterialIcons
                name={view ? "grid-view" : "format-list-bulleted"}
                size={30}
                color={"white"}
              />
            </TouchableOpacity>

            <FontAwesome name="sort" size={30} color={"white"} />
          </View>
        </View>
        <View style={[styles.line, { backgroundColor: "white" }]} />

        <ScrollView refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
}>
          <View style={styles.cardContainer}>
            {view ? (
              <View style={styles.list}>
                <View style={[styles.row]}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: "white",
                        fontFamily: "HelveticaBold",
                        fontSize: 14,
                      },
                    ]}
                  >
                    Name
                  </Text>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: "white",
                        fontFamily: "HelveticaBold",
                        fontSize: 14,
                      },
                    ]}
                  >
                    Tag
                  </Text>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: "white",
                        fontFamily: "HelveticaBold",
                        fontSize: 14,
                      },
                    ]}
                  >
                    Type
                  </Text>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: "white",
                        fontFamily: "HelveticaBold",
                        fontSize: 14,
                      },
                    ]}
                  >
                    Size
                  </Text>
                </View>

                {download &&
                  download.map((val, i) => {
                    return (
                      <View key={i}>
                        <View style={styles.row}>
                          <TouchableOpacity
                            onPress={() => {
                              setIsVisible(!visible);
                              setData(val);
                            }}
                            style={{ width: "23%" }}
                          >
                            <Text
                              style={[
                                styles.title,
                                { width: "100%" },
                                { color: "white" },
                              ]}
                            >
                              {val.fileName}
                            </Text>
                          </TouchableOpacity>

                          {val.tag ? (
                            <Tag
                              style={{
                                backgroundColor: "#FF2465",
                                paddingVertical: 5,
                              }}
                            >
                              <Text
                                style={[
                                  styles.description,
                                  { fontSize: 13 },
                                  { color: "white" },
                                ]}
                              >
                                {val.tag}
                              </Text>
                            </Tag>
                          ) : (
                            <Tag
                              style={{
                                paddingVertical: 5,
                                width: "20%",
                                backgroundColor: "transparent",
                              }}
                            ></Tag>
                          )}

                          <Text style={[styles.title, { color: "white" }]}>
                            {val.fileType}
                          </Text>
                          <Text style={[styles.title, { color: "white" }]}>
                            {val.fileSize}
                          </Text>
                        </View>

                        <View
                          style={[
                            styles.line,
                            { height: 1, width: "100%", marginHorizontal: 10 },
                            { backgroundColor: "white" },
                          ]}
                        />
                      </View>
                    );
                  })}
              </View>
            ) : (
              <View style={styles.grid}>
                {download &&
                  download.map((val, i) => {
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
                              width: "95%",
                              height: 90,
                              resizeMode: "stretch",
                            }}
                          />
                          <Text
                            style={[
                              styles.description,
                              { color: "white", marginTop: 8 },
                            ]}
                          >
                            {val.fileName}
                          </Text>
                          {val.tag ? (
                            <Tag
                              style={{
                                backgroundColor: "#FF2465",
                                paddingVertical: 5,
                              }}
                            >
                              <Text
                                style={[
                                  styles.description,
                                  { fontSize: 13 },
                                  { color: "white" },
                                ]}
                              >
                                {val.tag}
                              </Text>
                            </Tag>
                          ) : (
                            <Tag
                              style={{
                                paddingVertical: 17,
                                backgroundColor: "transparent",
                              }}
                            ></Tag>
                          )}
                        </TouchableOpacity>
                      </View>
                    );
                  })}
              </View>
            )}
          </View>

          <ImageView
            images={[
              {
                uri: data.location
              },
            ]}
            backgroundColor="rgba(0,0,0,0.9)"
            imageIndex={0}
            visible={visible}
            FooterComponent={() => (
              <ImageViewFooter>
                <TouchableOpacity onPress={async()=>{downloadImageLocally(data), console.log("pressed");}} activeOpacity={0.7}>
                  <AntDesign name="download" size={24} color="#1D2026" />
                </TouchableOpacity>
                <Tag>
                  <Text style={{ color: "white", fontSize: 14 }}>
                    {data.tag}
                  </Text>
                </Tag>
                 
                <TouchableOpacity onPress={()=>console.log("hello")}><OptionIcon name="dots-three-horizontal" /></TouchableOpacity>
                <TouchableOpacity onPress={async()=>{Alert.alert("Warning","You are about to permanently delete this file",[{text:"I know",onPress:()=>{deleteLocalFile(data)}},{text:"Cancel",onPress:()=>{}}],{cancelable:true})}} activeOpacity={0.6}>
                  <AntDesign name="delete" size={24} color="#1D2026" />
                </TouchableOpacity>
              </ImageViewFooter>
            )}
            onRequestClose={() => setIsVisible(false)}
          />
        </ScrollView>
      </View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
const Tag = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
  flex-direction: row;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  border-radius: 10px;
  align-items: flex-start;
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
    // backgroundColor: "#1D2026",
    // height: Height - 120,
    flex: 1,
  },

  body: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    width: "35%",
    fontFamily: "Helvetica",
  },
  line: {
    height: 2,
    backgroundColor: "white",
    width: "82%",
    marginTop: 15,
    marginHorizontal: 10,
  },
  cardContainer: {
    marginVertical: 20,
    // backgroundColor: "#1D2026",
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
    color: "white",
    fontSize: 15,
    marginTop: 1,
    fontFamily: "Helvetica",
  },
  list: {
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    marginVertical: 10,
    fontFamily: "Helvetica",
  },
});

const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
});

export default connect(mapStateToProps)(DownloadScreen);
