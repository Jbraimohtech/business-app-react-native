import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getStrapiMediaUrl } from "../../services/GlobalApi";
import { businessListType } from "../HomeScreen/BusinessList";

type Props = {
  business: businessListType;
};

export default function BusinessListCard({ business }: Props) {
  const imageUrl = getStrapiMediaUrl(business?.images);
  console.log("BusinessListCard image URL:", imageUrl);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.businessImage} />
      <View style={styles.textContainer}>
        <Text style={styles.businessName}>{business.name}</Text>
        <Text style={styles.businessDescription}>{business.address}</Text>
        <View style={styles.ratingContainer}>
          <Image
            style={styles.starImage}
            source={require("../../assets/images/star.png")}
          />
          <Text style={styles.businessDescription}>4.5</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  businessImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  businessName: {
    fontSize: 16,
    fontFamily: "appFontBold",
  },
  businessDescription: {
    fontSize: 14,
    fontFamily: "appFont",
    color: "#555",
    marginTop: 5,
  },

  starImage: {
    width: 20,
    height: 20,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
});
