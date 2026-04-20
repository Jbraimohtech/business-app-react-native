import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BusinessList from "../../../component/HomeScreen/BusinessList";
import Category from "../../../component/HomeScreen/Category";
import Header from "../../../component/HomeScreen/Header";
import Slider from "../../../component/HomeScreen/Slider";

export default function Home() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.headerBackground}></View>
          {/* Header Section */}
          <Header />
          {/* Slider Section */}
          <Slider />
          {/* Category Section */}
          <Category />
          {/* Popular Section */}
          <BusinessList />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
    backgroundColor: "#fff",
  },

  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    width: "150%",
    backgroundColor: "#076DF3",
  },
});
