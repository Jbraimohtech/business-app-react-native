import React from "react";
import {
    Image,
    Linking,
    Platform,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { businessListType } from "../HomeScreen/BusinessList";

type Props = {
  business: businessListType;
};

export default function ActionButton({ business }: Props) {
  const onNavigate = async () => {
    const nativeUrl =
      Platform.OS === "ios"
        ? `maps:0,0?q=${business.address}`
        : `geo:0,0?q=${business.address}`;
    await Linking.openURL(nativeUrl);
  };

  const onCall = async () => {
    const phoneNumber = `tel:${business.phone}`;
    await Linking.openURL(phoneNumber);
  };

  const onOpenWebsite = async () => {
    const websiteUrl = business.website.startsWith("http")
      ? business.website
      : `http://${business.website}`;
    await Linking.openURL(websiteUrl);
  };

  const onShareClick = async () => {
    const result = await Share.share({
      message:
        "Check our local business: \n" + "business Name:" + business?.name,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onNavigate}>
        <View style={styles.locationContainer}>
          <Image
            style={styles.locationButton}
            source={require("../../assets/images/back-button.png")}
          />
        </View>
        <Text style={styles.businessAddress}>Navigate</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCall}>
        <View style={styles.locationContainer}>
          <Image
            style={styles.locationButton}
            source={require("../../assets/images/back-button.png")}
          />
        </View>
        <Text style={styles.businessAddress}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onOpenWebsite}>
        <View style={styles.locationContainer}>
          <Image
            style={styles.locationButton}
            source={require("../../assets/images/back-button.png")}
          />
        </View>
        <Text style={styles.businessAddress}>Website</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onShareClick}>
        <View style={styles.locationContainer}>
          <Image
            style={styles.locationButton}
            source={require("../../assets/images/back-button.png")}
          />
        </View>
        <Text style={styles.businessAddress}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },

  locationButton: {
    width: 30,
    height: 30,
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
    backgroundColor: "#076df3",
    padding: 10,
    borderRadius: 10,
  },

  businessAddress: {
    fontSize: 16,
    fontFamily: "appFont",
    color: "#000",
    textAlign: "center",
  },
});
