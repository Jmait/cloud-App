import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const PreviewCard = (props) => {
  let { _handleAddTagPress, theme } = props;
  const fileSize = props.size / 1048576;
  const [isEnabled, setIsEnabled] = React.useState(false);
  const getPreview = () => {
    // console.log(props);
    const files = [".docx", ".doc"];
    const images = [".jpeg", ".jpg"];
    if (new RegExp(files.join("|")).test(props.name)) {
     
      return <MaterialIcons name="archive" size={50} />;
    } else {
  
      return (
        <View>
          <Image source={{ uri: props.uri }} style={styles.img} />
        </View>
      );
    }
  };
  return (
    <View style={styles.cardView}>
      <View style={styles.cardRow}>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {getPreview()}
        </View>

        <View style={{ width: "45%", paddingLeft: "3%" }}>
          <View>
            <Text style={styles.text}>{props.name}</Text>
            <AddTag onPress={_handleAddTagPress}>
              <AddTagTxt>{props.tag?props.tag:"Add #Tag"}</AddTagTxt>
            </AddTag>
          </View>
        </View>
      
        <View style={{ width: "20%" }}>
          <Text style={styles.text}>
            {props.size
              ? fileSize.toFixed(2) + " Mb"
              : props.height + " * " + props.width}
          </Text>
        </View>
      </View>
      <ToggleButton
        activeOpacity={1}
        style={{ marginLeft: 15 }}
        onPress={() => setIsEnabled(!isEnabled)}
      >
        <Ionicons name="md-checkmark-circle" size={24} color="green" />
        <Text style={[styles.text, { fontSize: 15 }]}>Remove metadata</Text>
        <Switch
          trackColor={{
            false: "grey",
            true: "#FF2465",
          }}
          thumbColor={"white"}
          value={isEnabled}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setIsEnabled}
          disabled
        />
      </ToggleButton>
    </View>
  );
};

const AddTag = styled.TouchableOpacity`
  padding-vertical: 10px;
  padding-horizontal: 20px;
  align-items: center;
  justify-content: center;
  background-color: #ff2465;
  border-radius: 10px;
  align-self: flex-start;
  margin-top: 5px;
`;
const AddTagTxt = styled.Text`
  font-weight: bold;
  color: white;
`;
const ToggleButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-vertical: 10px;
`;

const styles = StyleSheet.create({
  cardView: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingTop: 20,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  img: {
    height: 70,
    width: 70,
  },
  text: {
    color: "#C4C4C4",
    fontSize: 17,
    fontFamily: "Roboto",
    fontWeight: "600",
    marginLeft: 2,
    marginBottom: 6,
  },
});

export default PreviewCard;
