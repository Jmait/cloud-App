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

import TabContent from "./TabContent";

let routes = [
  { key: "Freq", title: "Freq" },
  { key: "Infreq", title: "Infreq" },
  { key: "Arch", title: "Arch" },
  { key: "Bundled", title: "Bundled" },
];

const SubscriptionTabs = (props) => {
  let { theme } = props;

  const [index, setIndex] = React.useState(0);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "Freq":
        return <TabContent {...props} name={route.key} />;
      case "Infreq":
        return <TabContent {...props} name={route.key} />;
      case "Arch":
        return <TabContent {...props} name={route.key} />;
      case "Bundled":
        return <TabContent {...props} name={route.key} />;
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
};

const Card = styled.View`
  flex: 1;
  overflow: hidden;
  border-radius: 30px;
  padding-vertical: 10px;
  margin-horizontal: 10px;
  margin-top: 15px;
  margin-bottom: 30px;
  shadow-offset: {
    width: 0;
    height: 3;
  }
  shadow-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
  shadow-opacity: 1;
  elevation: 5;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUD_COLOR};
`;

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(SubscriptionTabs);
