import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";
// import { Video } from "expo-av";

// import { downloadImageLocally } from "./image-downloader";

function ViewFile({ navigation, route }) {
  const { data, baseUrl, secretCode, serverSecret } = route.params;
  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <EvilIcons
          name="close"
          size={24}
          style={styles.icon}
          onPress={() => navigation.goBack()}
        /> */}
      </View>

      <View style={styles.imgContainer}>
        {data.fileType === "video/mp4" ? (
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: `${baseUrl}data/image?key=${data.fileName}&client_secret=${secretCode}&server_secret=${serverSecret}`,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : (
          <Image
            source={{
              uri: `${baseUrl}data/image?key=${data.fileName}&client_secret=${secretCode}&server_secret=${serverSecret}`,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          // onPress={async () => {
          //   downloadImageLocally(
          //     `${BASE_URL}data/image?key=${data.fileName}&client_secret=${secret}&server_secret=${serverSecret}`,
          //     data
          //   );
          // }}
        >
          <AntDesign name="clouddownload" size={45} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.tag}>#{data.tag}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={45} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6}>
          <MaterialIcons name="delete" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ViewFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: "10%",
  },
  icon: {
    backgroundColor: "#1D2026",
    padding: 10,
    marginRight: 10,
    marginBottom: 20,
    color: "#fff",
    borderRadius: 100,
  },
  imgContainer: {
    height: "75%",
    // marginTop: 10,
    marginBottom: "10%",
  },
  footer: {
    height: "10%",
    flexDirection: "row",
    // width: "70%",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    backgroundColor: "#1d2026",
    paddingHorizontal: 30,
    paddingTop: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  tag: {
    backgroundColor: "#FF2465",
    color: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 7,
  },
});
