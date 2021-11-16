import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styled from "styled-components";
import { Feather, Entypo } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const TabContent = (props) => {
  let { theme, name } = props;
  const [showFeatures, setShowFeature] = React.useState(false);
  const [value, setValue] = React.useState(name === "Bundled" ? 5 : 2);
  const [sliderStep, setSlideStep] = React.useState(1);

  // const _handleSliderChange = (val) => {
  //     if (name === 'Bundled') {
  //         if (val <= 5) {
  //             setValue(prevVal => {
  //                 if (prevVal === 5) {
  //                     return 0
  //                 } else {
  //                     setSlideStep(1)
  //                     return 5
  //                 }
  //             });
  //         } else {
  //             setValue(val);
  //         }
  //     } else {
  //         if (val <= 2) {
  //             setSlideStep(2);
  //             setValue(prevVal => {
  //                 if (prevVal === 2) {
  //                     return 0
  //                 } else {
  //                     setSlideStep(1)
  //                     return 2
  //                 }
  //             });
  //         } else {
  //             setValue(val);
  //         }
  //     }
  // }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.featureView,
            { backgroundColor: theme.PRIMARY_BACKGROUD_COLOR },
          ]}
        >
          <TouchableOpacity
            style={styles.featureBtn}
            onPress={() => setShowFeature(!showFeatures)}
          >
            <Text style={styles.featureTxt}>Features</Text>
            <Entypo name="chevron-thin-down" size={25} color="white" />
          </TouchableOpacity>
          {showFeatures && (
            <View>
              <View style={styles.featureContent}>
                <Text style={styles.featurePoints}>Frequent Vault</Text>
                <Text style={styles.featurePointsAlt}>50GB</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featurePoints}>Infrequent Vault</Text>
                <Text style={styles.featurePointsAlt}>3GB</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featurePoints}>Archive Vault</Text>
                <Text style={styles.featurePointsAlt}>6GB</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featurePoints}>End-to-End Encrypted</Text>
                <Feather name="check" size={25} color="white" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featurePoints}>No Device Tracking</Text>
                <Feather name="check" size={25} color="white" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featurePoints}>Remove Metadata</Text>
                <Feather name="check" size={25} color="white" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featurePoints}>Sort Tags</Text>
                <Text style={styles.featurePointsAlt}>unlimited</Text>
              </View>
            </View>
          )}
        </View>
        {!showFeatures && (
          <View style={styles.descriptionView}>
            <Text style={styles.featureTxt}>Pay what you think is fair.</Text>
            <Text style={{ color: "white" }}>
              Choose your price. Our user-first commitment doesn't stop at
              storage or privacy. Choose and pay what you think is fair.
            </Text>
          </View>
        )}
        <View style={styles.priceView}>
          <Text style={styles.featureTxt}>${value}/mo</Text>
          <Slider
            value={value}
            style={{ width: "100%", height: 50 }}
            minimumValue={name === "Bundled" ? 5 : 2}
            maximumValue={20}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="white"
            onValueChange={setValue}
            // onValueChange={_handleSliderChange}
            step={sliderStep}
          />
          <TouchableOpacity style={styles.continueBtn}>
            <Text
              style={[
                styles.featureTxt,
                { color: theme.PRIMARY_BACKGROUD_COLOR },
              ]}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TabContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  featureView: {
    borderRadius: 50,
    elevation: 5,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
  },
  featureBtn: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  featureTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  featurePoints: {
    color: "white",
    fontSize: 18,
  },
  featurePointsAlt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  featureContent: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  descriptionView: {
    flex: 1,
    justifyContent: "center",
  },
  priceView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  continueBtn: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 30,
  },
});
