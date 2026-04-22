import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { businessListType } from "../HomeScreen/BusinessList";

type Props = {
  business: businessListType;
};

export default function BusinessDescription({ business }: Props) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Description</Text>
        <Text style={styles.smallText}>{business?.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  text: {
    fontFamily: "appFontBold",
    fontSize: 20,
  },

  smallText: {
    fontFamily: "appFont",
    fontSize: 16,
    color: "#666",
  },
});
