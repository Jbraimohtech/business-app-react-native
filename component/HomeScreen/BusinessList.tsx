import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { apiClient, getStrapiMediaUrl } from "../../services/GlobalApi";
import { categoryType } from "./Category";

export type businessListType = {
  id: number;
  name: string;
  description: string;
  address: string;
  premium: boolean;
  category: categoryType;
  images: imagesType[];
};

type imagesType = {
  url: string;
};

export default function BusinessList() {
  const [businessList, setBusinessList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPopularBusinessList();
  }, []);

  const GetPopularBusinessList = async () => {
    setLoading(true);
    // Implement API call to fetch popular business list
    const result = await apiClient.get(
      "/business-lists?filters[premium][$eq]=true&populate=*",
    );
    console.log(JSON.stringify(result?.data?.data));
    setBusinessList(result?.data?.data || []);
    setLoading(false);
    // Handle the response and update state as needed
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Popular Business</Text>
        <Text style={styles.smallText}>View all</Text>
      </View>

      {/* Render the business list here */}
      {loading && <ActivityIndicator size="large" color="#076DF3" />}
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.businessContainer}>
            <Image
              source={{ uri: getStrapiMediaUrl(item.images) }}
              style={styles.businessImage}
            />

            <Text style={styles.businessName}>{item.name}</Text>
            <Text style={styles.businessDescription}>{item.description}</Text>
            <View style={styles.textContainerOne}>
              <Image
                style={styles.textContainerImage}
                source={require("./../../assets/images/star.png")}
              />
              <Text>4.3/5</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "appFontBold",
    fontSize: 25,
  },
  smallText: {
    fontFamily: "appFont",
    color: "#076DF3",
  },

  businessContainer: {
    backgroundColor: "#076df311",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 5,
    width: 230,
  },
  businessName: {
    fontFamily: "appFontBold",
    fontSize: 18,
  },
  businessDescription: {
    fontFamily: "appFont",
    color: "#555",
    marginTop: 5,
  },

  businessImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },

  textContainerOne: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },

  textContainerImage: {
    width: 20,
    height: 20,
  },
});
