
import * as InAppPurchases from 'expo-in-app-purchases';

import React, {useState} from "react";

import { Platform, Alert } from "react-native";


 const fetchAvailableSubcription = async () => {
    const [connected, setConnected] = React.useState("No");
    try {
        const myProducts = Platform.select({
            ios: [
                "FREQUENT_TIER_YEARLY",
                "FREQUENT_TIER_MONTHLY", 
                "INFREQUENT_TIER_MONTHLY", 
                "INFREQUENT_TIER_YEARLY", 
                "ARCHIVED_TIER_MONTHLY", 
                "ARCHIVED_TIER_YEARLY"
            ],
            android: [
                "FREQUENT_TIER_YEARLY", 
                "FREQUENT_TIER_MONTHLY", 
                "INFREQUENT_TIER_MONTHLY", 
                "INFREQUENT_TIER_YEARLY", 
                "ARCHIVED_TIER_MONTHLY", 
                "ARCHIVED_TIER_YEARLY"
            ],
        })

        if(connected=="No"){
           await InAppPurchases.connectAsync();
        }
        const responseCode = await InAppPurchases.getBillingResponseCodeAsync()
        if (responseCode) {
            setConnected("Yes");
            const { responseCode, results } = await InAppPurchases.getProductsAsync(myProducts);
            if (responseCode) {
                return results;
            }
        }
    }
    catch (error) {
        Alert.alert("Success", error.message)
    }
}

