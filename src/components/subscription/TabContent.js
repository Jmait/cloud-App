import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
// import styled from "styled-components";
import { Feather, Entypo } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as InAppPurchases from "expo-in-app-purchases";

const TabContent = (props) => {
  let { theme, name } = props;
  const [showFeatures, setShowFeature] = React.useState(false);
  const [value, setValue] = React.useState(
    name === "Bundled" ? 5 : name == "Freq" ? 3 : 2
  );
  const [connected, setConnected] = React.useState("No");
  const [sliderStep, setSlideStep] = React.useState(1);

  const connectToStore = async () => {
    const myProducts = Platform.select({
      ios: [
        "frequent_tier_yearly_tst",
        "FREQUENT_TIER_MONTHLY",
        "INFREQUENT_TIER_MONTHLY",
        "INFREQUENT_TIER_YEARLY",
        "ARCHIVED_TIER_MONTHLY",
        "ARCHIVED_TIER_YEARLY",
      ],
      android: ["frequent_tier_monthly_tst", "frequent_tier_yearly_tst"],
    });
    try {
      if (connected == "No") {
        await InAppPurchases.connectAsync();
        setConnected("Yes");
        const { responseCode, results } = await InAppPurchases.getProductsAsync(
          myProducts
        );
        setSubcription(results);
        console.log(`${results} results`);
        return results;
      }
    } catch (error) {
      const { responseCode, results } = await InAppPurchases.getProductsAsync(
        myProducts
      );
      setSubcription(results);
    }
  };
  const fetchAvailableSubcription = async () => {
    const { OK } = InAppPurchases.IAPResponseCode;
    try {
      const myProducts = Platform.select({
        ios: [
          "frequent_tier_yearly_tst",
          "FREQUENT_TIER_MONTHLY",
          "INFREQUENT_TIER_MONTHLY",
          "INFREQUENT_TIER_YEARLY",
          "ARCHIVED_TIER_MONTHLY",
          "ARCHIVED_TIER_YEARLY",
        ],
        android: ["frequent_tier_monthly_tst", "frequent_tier_yearly_tst"],
      });

      if (connected == "No") {
        connectToStore();
      } else if (subscription == "undefined" || subscription == []) {
        const { responseCode, results } = await InAppPurchases.getProductsAsync(
          myProducts
        );
        console.log(`${results} results`);
        setSubcription(results);
        return results;
      }
    } catch (error) {
      // Alert.alert("Success", error.message)
    }
  };
  const [subscription, setSubcription] = React.useState([]);
  React.useEffect(async () => {
    const p = await fetchAvailableSubcription();
    purchasListner();
    setSubcription(p);
    console.log(subscription);
    //subscription is an array of products...... which users can subcribe to
  }, []);
  //  Choose your price. Our user-first commitment doesn't stop at
  //  storage or privacy. Choose and pay what you think is fair.
  const purchasListner = () => {
    InAppPurchases.setPurchaseListener(
      ({ responseCode, results, errorCode }) => {
        // Purchase was successful
        // C:\Program Files (x86)\Android\platform-tools_r31.0.3-windows\platform-tools
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
          results.forEach((purchase) => {
            if (!purchase.acknowledged) {
              console.log(`Successfully purchased ${purchase.productId}`);
              Alert.alert("Success", "Purchase is successful");
              InAppPurchases.finishTransactionAsync(purchase, true);
            }
          });
        } else if (
          responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED
        ) {
          Alert.alert("Error", "Transaction canceled");
        } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
          console.log(
            "User does not have permissions to buy but requested parental approval (iOS only)"
          );
        } else {
          Alert.alert(
            `Error","Purchase can not be completed at the moment ${errorCode}`
          );
        }
      }
    );
  };
  const makePurchases = (product_id) => {
    try {
      subscription.forEach(async (sub, index) => {
        InAppPurchases.setPurchaseListener();
        console.log(product_id[0].toLowerCase());
        if (
          sub.priceAmountMicros == 1234875176 &&
          sub.productId[0] == product_id[0].toLowerCase()
        ) {
          try {
            purchasListner();
            await InAppPurchases.purchaseItemAsync(sub.productId);
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        } else if (
          sub.priceAmountMicros == 24000 &&
          sub.productId[0] == product_id[0]
        ) {
          purchasListner();
          await InAppPurchases.purchaseItemAsync(sub.productId);
        }
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

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
              {value > 3 && value > 5
                ? `Slide to the end to select a yearly plan`
                : `You have selected to pay Monthly at $${value}/Month`}
            </Text>
          </View>
        )}
        <View style={styles.priceView}>
          <Text style={styles.featureTxt}>
            ${value > 3 && value > 5 ? `${value}/Year` : `${value}/mo`}
          </Text>
          <Slider
            value={value}
            style={{ width: "100%", height: 50 }}
            minimumValue={name === "Bundled" ? 5 : name == "Freq" ? 3 : 2}
            maximumValue={
              name == "Freq" ? 24.99 : name == "Bundled" ? 59.99 : 20
            }
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="white"
            onValueChange={setValue}
            // onValueChange={_handleSliderChange}
            step={sliderStep}
          />
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => {
              makePurchases(props.name);
            }}
          >
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
