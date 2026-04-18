import { useUser } from "@clerk/expo";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Header() {
  const { user } = useUser();

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.container}>
          <View style={styles.ProfileContainer}>
            <View>
              <Image style={styles.image} source={{ uri: user?.imageUrl }} />
            </View>

            <View>
              <Text style={styles.textHeading}>Welcome, </Text>
              <Text style={styles.heading}>{user?.firstName}!</Text>
            </View>
          </View>
          <View>
            <Image
              source={require("../../../my-app/assets/images/notification-icon.png")}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Search"
            placeholderTextColor="#888"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    alignContent: "center",
    gap: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  heading: {
    fontSize: 20,
    fontFamily: "appFontBold",
    color: "#fff",
  },

  textHeading: {
    fontSize: 16,
    fontFamily: "appFont",
    color: "#fff",
  },

  inputContainer: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },

  inputText: {
    fontSize: 16,
    fontFamily: "appFont",
    color: "#000",
  },
});
