import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import styled from "styled-components";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { apiRequest, BASE_URL } from "../../helpers/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TopComp = (props) => {
  const [storage, setStorage] = React.useState(null);
  const getFrequentStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await apiRequest({
        method: "GET",
        url: `${BASE_URL}data/frequent-vault`,
        Authorization: `Bearer ${token}`,
      });
      setStorage(res.data.files);
    } catch (error) {
      setStorage(null);
    }
  };
  React.useEffect(() => {
    getFrequentStorage();
  }, []);

  return (
    <View style={styles.frequentContainer}>
      <View style={styles.row}>
        <View style={styles.storageUsed}>
          <Text style={[styles.title]}>Storage Used</Text>
          <Text style={{ color: "white" }}>
            {storage != null
              ? `${(storage.usedVaultSize / 1048576).toFixed(2)}MB out of 50GB`
              : "No active subscription"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Frequent = (props) => {
  const [storage, setStorage] = React.useState(null);
  const getFrequentStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await apiRequest({
        method: "GET",
        url: `${BASE_URL}data/frequent-vault`,
        Authorization: `Bearer ${token}`,
      });
      setStorage(res.data.files);
    } catch (error) {
      setStorage(null);
    }
  };
  React.useEffect(() => {
    getFrequentStorage();
  }, []);
  return (
    <View style={styles.frequentContainer}>
      <View style={styles.row}>
        <View style={{ width: "40%" }}>
          <Text style={[styles.title]}>
            {storage != null
              ? `You have used ${(storage.usedVaultSize / 1048576).toFixed(
                  2
                )}MB out of 50GB`
              : "No active subscription"}
          </Text>
        </View>
        <View style={{ width: "40%", alignItems: "center" }}>
          <Entypo name="infinity" size={27} color="#FF2465" />
          <Text style={[styles.title]}>
            {storage != null
              ? `You have ${storage.vaultKeys.length} keys remaining this month`
              : "You have no active subscription"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Infrequent = (props) => {
  const [storage, setStorage] = React.useState(null);
  const getInFrequentStorage = async () => {
    try {
      const res = await apiRequest({
        method: "GET",
        url: `${BASE_URL}/data/infrequent-vault`,
      });
      setStorage(res.data.files);
    } catch (error) {
      setStorage(null);
    }
  };
  React.useEffect(() => {
    getInFrequentStorage();
  }, []);
  return (
    <View style={styles.frequentContainer}>
      <View style={styles.row}>
        <View style={{ width: "40%" }}>
          <Text style={[styles.title]}>
            {storage != null
              ? `You have used ${(storage.usedVaultSize / 1048576).toFixed(
                  2
                )}MB out of 100GB`
              : "No active subscription"}
          </Text>
        </View>
        <View style={{ width: "40%", alignItems: "center" }}>
          <Text style={{ color: "#FF2465", fontSize: 16 }}>3/5</Text>
          <Text style={[styles.title]}>
            {storage != null
              ? `You have ${storage.vaultKeys.length} keys remaining this month`
              : "You have no active subscription for this tier"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Archived = (props) => {
  const [storage, setStorage] = React.useState(null);
  const getArchiveStorage = async () => {
    try {
      const res = await apiRequest({
        method: "GET",
        url: `${BASE_URL}/data/infrequent-vault`,
      });
      setStorage(res.data.files);
    } catch (error) {
      setStorage(null);
    }
  };
  React.useEffect(() => {
    getArchiveStorage();
  }, []);
  return (
    <View style={styles.frequentContainer}>
      <View style={styles.row}>
        <View style={{ width: "40%" }}>
          <Text style={[styles.title]}>
            {storage != null
              ? `You have used ${(storage.usedVaultSize / 1048576).toFixed(
                  2
                )}MB out of 200GB`
              : "No active subscription"}
          </Text>
        </View>
        <View style={{ width: "40%", alignItems: "center" }}>
          <Text style={{ color: "#FF2465", fontSize: 16 }}>1/1</Text>
          <Text style={[styles.title]}>
            {storage != null
              ? `You have ${storage.vaultKeys.length} keys remaining this month`
              : "You have no active subscription for this tier"}
          </Text>
        </View>
      </View>
    </View>
  );
};
function HomeCard(props) {
  const layout = useWindowDimensions();

  // if (savedPkg === "frequent") {
  //   props.getPkg(savedPkg);
  // }

  const handlePkg = (val) => {
    props.getPkg(val);
  };

  let { theme } = props;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "frequent", title: "Haven Vault" },
    { key: "infrequent", title: "Free Plan" },
  ]);

  // const renderScene = SceneMap({
  //   frequent: Frequent,
  //   infrequent: Infrequent,
  //   archived: Archived,
  // });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "frequent":
        return <TopComp {...props} />;
      case "infrequent":
        return <Infrequent {...props} />;

      case "archived":
        return <Archived {...props} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            onTabPress={({ route, preventDefault }) => {
              if (route.key) {
                handlePkg(route);
              }
            }}
            {...props}
            renderLabel={({ route, focused, color }) => (
              <TouchableOpacity activeOpacity={0.9}>
                <Text
                  style={{
                    color: focused ? "#FF2465" : "grey",
                    marginTop: 7,
                    fontSize: 16,
                    fontFamily: "HelveticaBold",
                  }}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            )}
            getAccessibilityLabel={({ route }) => route.accessibilityLabel}
            indicatorStyle={{
              backgroundColor: theme.PRIMARY_BACKGROUD_COLOR,
              height: 60,
              borderWidth: 0.1,
              borderColor: theme.PRIMARY_BACKGROUD_COLOR,
              borderRadius: 10,
            }}
            style={{
              backgroundColor: theme.PRIMARY_BACKGROUD_COLOR,
              height: 60,
              borderWidth: 1,
              borderColor: theme.PRIMARY_BACKGROUD_COLOR,
              borderRadius: 10,
            }}
          />
        )} // <-- add this line
      />
    </Card>
  );
}

const Card = styled.View`
  padding-vertical: 10px;
  height: 250px;
  margin-vertical: 15px;
`;

const styles = StyleSheet.create({
  frequentContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
  },

  info: {
    color: "white",
    fontSize: 16,
    fontFamily: "Helvetica",
  },

  storageUsed: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(HomeCard);
