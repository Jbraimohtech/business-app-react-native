import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/Human.png")}
      />
      <Text style={styles.text}>Welcome to</Text>
      <Text style={styles.text}>Business Directory</Text>
      <View style={styles.firstBox}>
        <Text style={styles.textDiscover}>
          Discover thousands of local businesses all in one place
        </Text>
        <View style={styles.buttonDiscover}>
          <View style={styles.buttonDiscoverContainer}>
            <Image
              style={styles.google}
              source={require("../../assets/images/google.png")}
            />
            <Text style={styles.textDiscover}>Sign In With Google</Text>
          </View>
        </View>
        <View style={styles.button}>
          <Text style={styles.textDiscoverSkip}>Skip</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#076DF3",
  },

  image: {
    width: "70%",
    height: 350,
    marginTop: 100,
    justifyContent: "center",
    alignSelf: "center",
  },

  text: {
    fontSize: 24,
    fontFamily: "appFont",
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },

  firstBox: {
    width: "90%",
    height: "30%",
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
    padding: 10,
  },

  textDiscover: {
    fontSize: 23,
    fontFamily: "appFont",
    color: "#000",
    textAlign: "center",
  },

  textDiscoverSkip: {
    fontSize: 23,
    fontFamily: "appFont",
    color: "#fff",
    textAlign: "center",
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#076DF3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonDiscover: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#076DF3",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  google: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  buttonDiscoverContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
