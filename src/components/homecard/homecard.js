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

const Frequent = (props) => (
  <View style={styles.frequentContainer}>
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>Frequent Accesss</Text>
        <Text style={[styles.title, { fontSize: 18, marginVertical: 4 }]}>
          1 GB / 50 GB used
        </Text>
      </View>
      <TouchableOpacity onPress={props.onPressFrequent} activeOpacity={0.7}>
        <Text style={[styles.title, { fontSize: 17 }]}>View</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.footer}>
      <Text style={styles.info}>2/5 tokens remaining this month</Text>
    </View>
  </View>
);

const Infrequent = (props) => (
  <View style={styles.frequentContainer}>
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>Infrequent Accesss</Text>
        <Text style={[styles.title, { fontSize: 18, marginVertical: 4 }]}>
          1 GB / 50 GB used
        </Text>
      </View>
      <TouchableOpacity onPress={props.onPressInfrequent} activeOpacity={0.7}>
        <Text style={[styles.title, { fontSize: 17 }]}>View</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.footer}>
      <Text style={styles.info}>2/5 tokens remaining this month</Text>
    </View>
  </View>
);

const Archived = (props) => (
  <View style={styles.frequentContainer}>
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>Archived Accesss</Text>
        <Text style={[styles.title, { fontSize: 18, marginVertical: 4 }]}>
          1 GB / 50 GB used
        </Text>
      </View>
      <TouchableOpacity onPress={props.onPressArchived} activeOpacity={0.7}>
        <Text style={[styles.title, { fontSize: 17 }]}>View</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.footer}>
      <Text style={styles.info}>1/2 tokens remaining this month</Text>
    </View>
  </View>
);

function HomeCard(props) {
  const layout = useWindowDimensions();

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
            {...props}
            renderLabel={({ route, focused, color }) => (
              <Text
                style={{
                  color: focused ? "white" : theme.SECONDARY_TEXT_COLOR,
                  fontWeight: "bold",
                }}
              >
                {route.title}
              </Text>
            )}
            getAccessibilityLabel={({ route }) => route.accessibilityLabel}
            indicatorStyle={{
              backgroundColor: theme.PRIMARY_BACKGROUD_COLOR,
              borderRadius: 30,
              height: 50,
              borderWidth: 1,
              borderColor: theme.PRIMARY_BACKGROUD_COLOR,
              elevation: 5,
            }}
            style={{
              backgroundColor: "white",
              borderRadius: 30,
              marginVertical: 10,
              height: 50,
              marginHorizontal: 10,
              shadowOffset: { width: 0, height: 2 },
              shadowColor: "#1D2026",
              shadowOpacity: 1,
              elevation: 5,
            }}
          />
        )} // <-- add this line
      />
    </Card>
  );
}

const Card = styled.View`
  border-radius: 24px;
  padding-vertical: 10px;
  height: 250px;
  margin-vertical: 15px;
  shadow-offset: {
    width: 0;
    height: 3;
  }
  shadow-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
  shadow-opacity: 1;
  elevation: 5;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
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
    marginTop: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
    color: "white",
    fontFamily: "Roboto",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  footer: {
    marginTop: 20,
  },
  info: {
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto",
  },
});

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(HomeCard);
