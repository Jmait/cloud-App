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

const Frequent = (props) => <View style={styles.frequentContainer}></View>;

const Infrequent = (props) => <View style={styles.frequentContainer}></View>;

const Archived = (props) => <View style={styles.frequentContainer}></View>;

function UploadCard(props) {
  const layout = useWindowDimensions();

  const handlePkg = (val) => {
    props.getPkg(val);
  };

  let { theme } = props;
  console.log(props.files);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "frequent", title: "Frequent" },
    { key: "infrequent", title: "Infrequent" },
    { key: "archived", title: "Archived" },
  ]);

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
                    fontWeight: "bold",
                    marginTop: 7,
                    fontSize: 16,
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
  height: 80px;
  margin-vertical: 10px;
`;

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    paddingVertical: 10,
    height: 250,
    marginVertical: 15,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "#1D2026",
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: "#1D2026",
  },
  frequentContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  title: {
    color: "white",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  info: {
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto",
  },
});

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  storageClass: state.files.storageClass,
});

export default connect(mapStateToProps)(UploadCard);
