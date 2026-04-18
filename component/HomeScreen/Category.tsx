import React, { useEffect } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { apiClient } from "../../services/GlobalApi";

type categoryType = {
  name: string;
  premium: boolean;
  icon: { url: string };
};

export default function Category() {
  const [categoryList, setCategoryList] = React.useState<categoryType[]>([]);
  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    const result = await apiClient.get(
      "/categories?filters[premium] [$eq]=true&populate=*",
    );
    console.log(result.data);
    setCategoryList(result?.data?.data);
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
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.categoryContainer} key={index}>
            <Image style={styles.image} source={{ uri: item?.icon?.url }} />
            <Text style={styles.CategoryText}>{item.name}</Text>
          </TouchableOpacity>
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
