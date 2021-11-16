import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Switch,
  Dimensions,
} from "react-native";
import { connect } from 'react-redux';

const Height = Dimensions.get("screen").height;

function NotificationScreen({ navigation, theme, darkMode }) {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isEmails, setIsEmails] = React.useState(false);
  console.log(darkMode)
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={{ ...styles.menuContainer, backgroundColor: theme.PRIMARY_BACKGROUD_COLOR }}>
        <View style={styles.header}>
          <Text style={styles.title}>Notification</Text>
          <View style={styles.line} />
        </View>

        <View style={[
          styles.body,
          { backgroundColor: darkMode ? 'black' : 'white' }
        ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
              <Text style={{ ...styles.name, color: theme.PRIMARY_BACKGROUD_COLOR, }}>Newsletter </Text>
              <Switch
                trackColor={{ false: theme.PRIMARY_BACKGROUD_COLOR, true: theme.PRIMARY_BACKGROUD_COLOR }}
                thumbColor={isEnabled ? "white" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(val) => {
                  setIsEnabled(val);
                }}
                value={isEnabled}
              />
            </View>
            <View style={styles.row}>
              <Text style={{ ...styles.name, color: theme.PRIMARY_BACKGROUD_COLOR, }}>Marketing Emails </Text>
              <Switch
                trackColor={{ false: theme.PRIMARY_BACKGROUD_COLOR, true: theme.PRIMARY_BACKGROUD_COLOR }}
                thumbColor={isEnabled ? "white" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(val) => {
                  setIsEmails(val);
                }}
                value={isEmails}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    paddingTop: 55,
  },
  header: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    fontStyle: "normal",
    fontFamily: "Helvetica",
  },

  line: {
    height: 2,
    width: "90%",
    backgroundColor: "white",
    marginVertical: 10,
  },
  body: {
    paddingBottom: 20,
    elevation: 7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 30,
    height: Height,
  },

  row: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 5,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  name: {
    fontSize: 17,
    opacity: 0.9,
    fontWeight: "400",
    marginVertical: 15,
    fontFamily: "Helvetica",
  },
});

const mapStateToProps = state => ({
  theme: state.theme.theme,
  darkMode: state.theme.darkMode,
});

export default connect(mapStateToProps)(NotificationScreen);
