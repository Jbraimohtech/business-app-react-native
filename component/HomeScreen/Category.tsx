import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { apiClient, getStrapiMediaUrl } from "../../services/GlobalApi";

type StrapiMedia = any;

export type categoryType = {
  id: number;
  name: string;
  premium: boolean;
  icon: StrapiMedia | null;
};

export default function Category() {
  const [categoryList, setCategoryList] = React.useState<categoryType[]>([]);
  const router = useRouter();

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    const result = await apiClient.get(
      "/categories?filters[premium][$eq]=true&populate=*",
    );
    console.log("Category API response:", result.data);
    setCategoryList(result?.data?.data || []);
  };

  const getImageUrl = (icon: StrapiMedia | null) => {
    return getStrapiMediaUrl(icon);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Category</Text>
        <Text style={styles.smallText}>View all</Text>
      </View>

      <FlatList
        data={categoryList}
        numColumns={4}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item }) => {
          const imageUrl = getImageUrl(item.icon);

          return (
            <TouchableOpacity
              style={styles.categoryContainer}
              onPress={() =>
                router.push(`/business-list?categoryName=${item.name}` as any)
              }
            >
              <Image style={styles.image} source={{ uri: imageUrl }} />
              <Text style={styles.CategoryText}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
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

  image: {
    width: 40,
    height: 40,
  },

  categoryContainer: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    backgroundColor: "#076DF3",
    margin: 3,
    borderRadius: 10,
    height: 85,
    justifyContent: "center",
  },

  CategoryText: {
    textAlign: "center",
    marginTop: 3,
    fontFamily: "appFont",
    color: "#fff",
  },
});
