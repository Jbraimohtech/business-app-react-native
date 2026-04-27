import { useUser } from "@clerk/expo";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BusinessListCard from "../../../component/BusinessList/BusinessListCard";
import { businessListType } from "../../../component/HomeScreen/BusinessList";
import { apiClient } from "../../../services/GlobalApi";

export default function Favorite() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState<businessListType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetUserFavBusinessList();
  }, []);

  const GetUserFavBusinessList = async () => {
    setLoading(true);
    // Implement API call to fetch user's favorite business list
    const result = await apiClient.get(
      "/user-favorites?filters[userEmail][$eq]=" +
        user?.primaryEmailAddress?.emailAddress,
    );
    console.log(JSON.stringify(result?.data?.data));
    // Handle the response and update state as needed
    let businessIds: any = [];
    const favList = result?.data?.data;
    favList.forEach((item: any) => {
      businessIds.push(item?.businessId);
    });

    console.log("Business IDs: ", businessIds);
    await GetBusinessList(businessIds);
    setLoading(false);
  };

  const GetBusinessList = async (businessIds: any) => {
    // Implement API call to fetch business details based on businessIds
    const result = await apiClient.get("/business-list", {
      params: {
        "filters[id][$in]": businessIds,
        populate: "*",
      },
    });
    console.log(JSON.stringify(result?.data?.data));
    setBusinessList(result?.data?.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground} />
      <Text style={styles.headerText}>User Favorite Businesses</Text>
      <FlatList
        data={businessList}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        onRefresh={() => GetUserFavBusinessList()}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  headerText: {
    fontFamily: "appFontBold",
    fontSize: 25,
    color: "#fff",
  },
});
