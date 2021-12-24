




import React from 'react';
import {
  View, StyleSheet,
  Text, 
  Platform
} from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

// adb -s 067062514J108514  reverse tcp:8081 tcp:8081

import SubscriptionTabs from '../../components/subscription/SubscriptionTabs';


const SubscriptionScreen = (props) => {

  let { darkMode } = props;

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? 'black' : 'white' }}>
      <HeaderContainer>
        <View style={styles.header}>
          <Text style={styles.title}>Manage Subscription</Text>
          <View style={styles.line} />
        </View>
      </HeaderContainer>

      <SubscriptionTabs />

    </View>
  )
}

const HeaderContainer = styled.View`
  padding-top: 55px;
  background-color: ${props => props.theme.PRIMARY_BACKGROUD_COLOR};
`

const styles = StyleSheet.create({
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
    marginTop: 15,
  },
});

const mapStateToProps = state => ({
  darkMode: state.theme.darkMode
});

export default connect(mapStateToProps)(SubscriptionScreen);