import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getStrapiMediaUrl } from "../../services/GlobalApi";
import { businessListType } from "../HomeScreen/BusinessList";

type Props = {
  business: businessListType;
};

export default function BusinessInfo({ business }: Props) {
  const imageUrl = getStrapiMediaUrl(business?.images);
  return (
    <View>
      <Image source={{ uri: imageUrl }} style={styles.businessImage} />
      <Text style={styles.businessName}>{business?.name}</Text>
      <View style={styles.locationContainer}>
        <Image
          style={styles.locationButton}
          source={require("../../assets/images/back-button.png")}
        />
        <Text style={styles.businessAddress}>{business?.address}</Text>
      </View>

      <View style={styles.locationContainer}>
        <Image
          style={styles.locationButton}
          source={require("../../assets/images/back-button.png")}
        />
        <Text style={styles.businessDescription}>{business?.website}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  businessImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
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
  },
  businessName: {
    fontSize: 20,
    fontFamily: "appFontBold",
    marginBottom: 5,
  },
  businessAddress: {
    fontSize: 18,
    fontFamily: "appFont",
    color: "#666",
  },
  businessDescription: {
    fontSize: 14,
    fontFamily: "appFont",
    color: "#555",
    lineHeight: 20,
  },
});
