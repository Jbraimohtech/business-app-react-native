import { Tabs, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text } from "react-native";

type Props = {};

const TabLayout = (props: Props) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>
              <Image
                source={require("../../../assets/images/Dashboard.png")}
                style={{ width: size, height: size }}
              />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>
              <Image
                source={require("../../../assets/images/keySmall.png")}
                style={{ width: size, height: size }}
              />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Favorite"
        options={{
          title: "Favorite",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>
              <Image
                source={require("../../../assets/images/receipt.png")}
                style={{ width: size, height: size }}
              />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>
              <Image
                source={require("../../../assets/images/keySmall.png")}
                style={{ width: size, height: size }}
              />
            </Text>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
