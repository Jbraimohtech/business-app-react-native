import { useAuth, useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";

type MenuItem = {
  key: string;
  title: string;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  danger?: boolean;
};

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const name =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "User";
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "No email available";

  const avatar =
    user?.imageUrl ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const items: MenuItem[] = useMemo(
    () => [
      {
        key: "explore",
        title: "Explore",
        onPress: () => router.push("/(tabs)/Explore"),
        icon: "compass-outline",
      },
      {
        key: "favorites",
        title: "Favorite",
        onPress: () => router.push("/(tabs)/Favorite"),
        icon: "heart-outline",
      },
      {
        key: "share",
        title: "Share",
        onPress: async () => {
          await Share.share({
            message: "Check out this awesome app: https://example.com",
          });
        },
        icon: "share-outline",
      },
      {
        key: "contact",
        title: "Contact us",
        onPress: () =>
          Alert.alert("Contact us", "You can reach us at support@example.com"),
        icon: "mail-outline",
      },
      {
        key: "logout",
        title: "Logout",
        icon: "log-out-outline",
        danger: true,
        onPress: () =>
          Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
              text: "Logout",
              style: "destructive",
              onPress: async () => {
                try {
                  await signOut();
                  router.push("/");
                } catch (err) {
                  Alert.alert(
                    "Logout error: " + (err as any)?.message || "Unknown error",
                  );
                }
              },
            },
          ]),
      },
    ],
    [router, signOut],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerBackground}>
          <Image source={{ uri: avatar }} style={styles.profileContainer} />
          <View>
            <Text style={styles.headerText}>{name}</Text>
            <Text style={styles.profileText}>{email}</Text>
          </View>
        </View>

        <View style={styles.profileCardBox}>
          {items.map((item) => (
            <Pressable key={item.key} onPress={item.onPress}>
              <View style={styles.insideProfileCardBox}>
                <View style={styles.cardBox}>
                  <Ionicons
                    name={item.icon}
                    size={30}
                    color={item.danger ? "#ff4444" : "#076DF3"}
                  />
                  <Text
                    style={[
                      styles.cardText,
                      item.danger && { color: "#ff4444" },
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    width: "150%",
    backgroundColor: "#076DF3",
  },
  headerText: {
    fontFamily: "appFontBold",
    fontSize: 25,
    color: "#000",
  },
  profileContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileText: {
    fontFamily: "appFont",
    fontSize: 16,
    color: "#666",
  },
  containerBackground: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    height: 100,
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 10,
    gap: 10,
  },
  profileCardBox: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#464a503a",
    marginTop: 20,
  },
  insideProfileCardBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cardText: {
    fontFamily: "appFontBold",
    fontSize: 18,
    color: "#000",
  },
  cardBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
