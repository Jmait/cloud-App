// import * as React from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   Switch,
//   Dimensions,
//   FlatList,
//   Animated,
// } from "react-native";
// import styled from 'styled-components';
// import GestureRecognizer from "react-native-swipe-gestures";
// import { connect } from 'react-redux';


// const Height = Dimensions.get("screen").height;
// import { Fontisto } from "@expo/vector-icons";

// const packages = [
//   {
//     name: "Frequent",
//     storage: "50GB",
//   },

//   {
//     name: "Infrequent",
//     storage: "100GB",
//   },
//   {
//     name: "Archived",
//     storage: "200GB",
//   },
// ];

// const data = [
//   {
//     name: "100GB Bundle Upgrade",
//     price: "$0.99/month",
//     details: "5GB Frequent, 10GB Infrequent, and 85GB Archived",
//   },
//   {
//     name: "300GB Bundle Upgrade",
//     price: "$4.99/month",
//     details: "50GB Frequent, 50GB Infrequent, and 200GB Archived",
//   },
//   {
//     name: "1.5TB Bundle Upgrade",
//     price: "$19.99/month",
//     details: "250GB Frequent, 250GB Infrequent, and 1TB Archived",
//   },
//   {
//     name: "Purchase Tokens",
//     price: "$0.99/month",
//     details: "5 tokens to be redeemed in either Infrequent or Archived access",
//   },
// ];

// const Item = ({ val }) => (
//   <Card>
//     <Text style={[styles.name, { textAlign: "center" }]}>{val.name}</Text>
//     <Text style={[styles.name, { textAlign: "center", marginTop: 10 }]}>
//       {val.price}
//     </Text>

//     <Text style={[styles.info]}>{val.details}</Text>

//     <TouchableOpacity
//       onPress={async () => { }}
//       style={[styles.btn, { marginTop: 15 }]}
//       activeOpacity={0.7}
//     >
//       <CardText>Purchase</CardText>
//     </TouchableOpacity>
//   </Card>
// );

// function SubscriptionScreen({ navigation, darkMode }) {
//   const [pkg, setPkg] = React.useState("Frequent");
//   const [border, setBorder] = React.useState(30);

//   const renderItem = ({ item }) => <Item val={item} />;

//   const scrollY = new Animated.Value(0);

//   const check = scrollY.interpolate({
//     inputRange: [0, 45],
//     outputRange: [0, -45],
//   });
//   return (
//     <View style={styles.container}>
//       <StatusBar />
//       <MenuContainer>
//         <View style={styles.header}>
//           <Text style={styles.title}>Manage Subscription</Text>
//           <View style={styles.line} />
//         </View>

//         <Animated.View
//           style={[
//             styles.body,
//             {
//               backgroundColor: darkMode ? 'black' : 'white',
//               borderTopLeftRadius: border,
//               borderTopRightRadius: border,
//               transform: [
//                 {
//                   translateY: check,
//                 },
//               ],
//             },
//           ]}
//         >
//           <View>
//             <ScrollView
//               showsVerticalScrollIndicator={false}

//               onScroll={(e) => {
//                 if (e.nativeEvent.contentOffset.y > 200) {
//                   setBorder(0);
//                 } else {
//                   setBorder(30);
//                 }
//               }}
//             >
//               <Card>
//                 <Text style={[styles.name, { textAlign: "center" }]}>
//                   Free Tier
//                 </Text>
//                 <View style={styles.row}>
//                   <Text style={styles.info}>Frequent</Text>
//                   <Text style={styles.info}>1GB</Text>
//                 </View>
//                 <View style={styles.row}>
//                   <Text style={styles.info}>Infrequent</Text>
//                   <Text style={styles.info}>3GB</Text>
//                 </View>
//                 <View style={styles.row}>
//                   <Text style={styles.info}>Archived</Text>
//                   <Text style={styles.info}>6GB</Text>
//                 </View>
//               </Card>

//               {/* 2 */}
//               <Card>
//                 <Text style={[styles.name, { textAlign: "center" }]}>
//                   Single Tier Upgrades
//                 </Text>
//                 <Text
//                   style={[styles.name, { textAlign: "center", marginTop: 10 }]}
//                 >
//                   $1.99/month
//                 </Text>
//                 <View style={{ flexDirection: "row", marginVertical: 25 }}>
//                   {packages &&
//                     packages.map((val, i) => {
//                       return (
//                         <TouchableOpacity
//                           onPress={() => setPkg(val.name)}
//                           activeOpacity={0.7}
//                           key={i}
//                         >
//                           <Text
//                             style={[
//                               val.name === pkg
//                                 ? styles.activeTab
//                                 : styles.inActiveTab,
//                               {
//                                 fontSize: 18,
//                               },
//                             ]}
//                           >
//                             {val.name}
//                           </Text>
//                           <Text
//                             style={[
//                               val.name === pkg
//                                 ? styles.activeTab
//                                 : styles.inActiveTab,
//                               {
//                                 fontSize: 18,
//                               },
//                             ]}
//                           >
//                             {val.storage}
//                           </Text>
//                         </TouchableOpacity>
//                       );
//                     })}
//                 </View>

//                 <TouchableOpacity
//                   onPress={async () => { }}
//                   style={[styles.btn]}
//                   activeOpacity={0.7}
//                 >
//                   <CardText>Purchase</CardText>
//                 </TouchableOpacity>
//               </Card>

//               <FlatList
//                 data={data}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id}
//               />
//               <View style={{ height: 200 }} />
//             </ScrollView>
//           </View>
//         </Animated.View>
//       </MenuContainer>
//     </View>
//   );
// }

// const MenuContainer = styled.View`
//   padding-top: 55px;
//   background-color: ${props => props.theme.PRIMARY_BACKGROUD_COLOR};
// `

// const Card = styled.View`
//   border-radius: 24px;
//   shadow-offset: { width: 0; height: 2 };
//   shadow-color: ${props => props.theme.PRIMARY_BACKGROUD_COLOR};
//   shadow-opacity: 1;
//   elevation: 5;
//   background-color: ${props => props.theme.PRIMARY_BACKGROUD_COLOR};
//   padding-horizontal: 24px;
//   padding-vertical: 20px;
//   margin-vertical: 8px;
// `
// const CardText = styled.Text`
//   color: ${props => props.theme.SECONDARY_TEXT_COLOR};
//   font-size: 20px;
//   font-family: HelveticaBold;
// `

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   menuContainer: {
//     paddingTop: 55,
//     backgroundColor: "#1D2026",
//   },
//   header: {
//     paddingHorizontal: 25,
//     paddingBottom: 30,
//   },

//   title: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//     lineHeight: 28,
//     fontStyle: "normal",
//     fontFamily: "Helvetica",
//   },

//   line: {
//     height: 2,
//     width: "90%",
//     backgroundColor: "white",
//     marginVertical: 10,
//     marginTop: 15,
//   },
//   body: {
//     paddingBottom: 20,
//     elevation: 7,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     height: Height,
//   },

//   card: {
//     borderRadius: 24,
//     paddingVertical: 10,
//     shadowOffset: { width: 0, height: 2 },
//     shadowColor: "#1D2026",
//     shadowOpacity: 1,
//     elevation: 5,
//     backgroundColor: "#1D2026",
//     paddingHorizontal: 24,
//     paddingVertical: 20,
//     marginVertical: 8,
//   },
//   frequentContainer: {
//     paddingHorizontal: 15,
//     marginTop: 20,
//   },
//   name: {
//     fontWeight: "700",
//     fontSize: 20,
//     color: "white",
//     fontFamily: "Helvetica",
//     lineHeight: 23,
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginVertical: 4,
//   },

//   info: {
//     color: "white",
//     fontSize: 20,
//     fontFamily: "Helvetica",
//     marginTop: 14,
//     lineHeight: 23,
//   },

//   activeTab: {
//     color: "white",
//     marginHorizontal: 10,
//     fontSize: 25,
//     fontFamily: "HelveticaBold",
//   },

//   inActiveTab: {
//     color: "white",
//     marginHorizontal: 10,
//     fontSize: 25,
//     fontFamily: "Helvetica",
//   },

//   btn: {
//     backgroundColor: "white",
//     borderRadius: 36,
//     width: 160,
//     alignSelf: "center",
//     paddingVertical: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowOffset: { width: 0, height: 2 },
//     shadowColor: "#1D2026",
//     shadowOpacity: 1,
//     elevation: 4,
//   },
//   btnText: {
//     color: "#1D2026",
//     fontSize: 20,
//     fontFamily: "HelveticaBold",
//   },
// });

// const mapStateToProps = state => ({
//   darkMode: state.theme.darkMode
// });

// export default connect(mapStateToProps)(SubscriptionScreen);




import React from 'react';
import {
  View, StyleSheet,
  Text
} from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

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