import * as React from "react";
import {
  Button,
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

const Frequent = (props) => (
  <View style={styles.frequentContainer}>
    <View style={styles.row}>
      <View style={{ width: "40%" }}>
        <Text style={[styles.title]}>0.24 GB out of 1 GB used</Text>
      </View>
      <View style={{ width: "40%", alignItems: "center" }}>
        <Entypo name="infinity" size={27} color="#FF2465" />
        <Text style={[styles.title]}>keys remaining this month</Text>
      </View>
    </View>
  </View>
);

const Infrequent = (props) => (
  <View style={styles.frequentContainer}>
    <View style={styles.row}>
      <View style={{ width: "40%" }}>
        <Text style={[styles.title]}>1.35 GB out of 3 GB used</Text>
      </View>
      <View style={{ width: "40%", alignItems: "center" }}>
        <Text style={{ color: "#FF2465", fontSize: 16 }}>3/5</Text>
        <Text style={[styles.title]}>keys remaining this month</Text>
      </View>
    </View>
  </View>
);

const Archived = (props) => (
  <View style={styles.frequentContainer}>
    <View style={styles.row}>
      <View style={{ width: "40%" }}>
        <Text style={[styles.title]}>3.83 GB out of 6 GB used</Text>
      </View>
      <View style={{ width: "40%", alignItems: "center" }}>
        <Text style={{ color: "#FF2465", fontSize: 16 }}>1/1</Text>
        <Text style={[styles.title]}>keys remaining this month</Text>
      </View>
    </View>
  </View>
);

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
    { key: "frequent", title: "Frequent" },
    { key: "infrequent", title: "Infrequent" },
    { key: "archived", title: "Archived" },
  ]);

  // const renderScene = SceneMap({
  //   frequent: Frequent,
  //   infrequent: Infrequent,
  //   archived: Archived,
  // });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "frequent":
        return <Frequent {...props} />;
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
  },

  info: {
    color: "white",
    fontSize: 16,
    fontFamily: "Helvetica",
  },
});

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(HomeCard);
