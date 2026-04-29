import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { businessListType } from "../../../component/HomeScreen/BusinessList";
import { apiClient, getStrapiMediaUrl } from "../../../services/GlobalApi";

export default function Explore() {
  const [businessList, setBusinessList] = useState<businessListType[]>([]);
  const searchTime = useRef<any>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GetPopularBusinessList();
  }, []);

  const GetPopularBusinessList = async () => {
    setLoading(true);
    const result = await apiClient.get(
      "/business-lists?filters[premium][$eq]=true&populate=*",
    );
    console.log(JSON.stringify(result?.data?.data));
    setBusinessList(result?.data?.data || []);
    setLoading(false);
  };

  const onChangeSearchInput = (value: string) => {
    setSearchText(value);
    if (searchTime.current) {
      clearTimeout(searchTime.current);
    }
    searchTime.current = setTimeout(() => {
      // Perform search logic here
      if (value.trim() === "") {
        GetPopularBusinessList();
      } else {
        searchBusiness(value);
      }
    }, 500);
  };

  const searchBusiness = async (query: string) => {
    const result = await apiClient.get(
      `/business-lists?filters[name][$contains]=${query}&populate=*`,
    );
    setBusinessList(result?.data?.data || []);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBackground} />
      <Text style={styles.text}>Explore More Business</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Search Business"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={onChangeSearchInput}
        />
      </View>

      <FlatList
        data={businessList}
        onRefresh={() =>
          searchText ? searchBusiness(searchText) : GetPopularBusinessList()
        }
        refreshing={loading}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/business-details",
                params: {
                  business: JSON.stringify(item),
                },
              });
            }}
            style={styles.businessCard}
          >
            {getStrapiMediaUrl(item.images) ? (
              <Image
                style={styles.images}
                source={{ uri: getStrapiMediaUrl(item.images) }}
              />
            ) : (
              <View style={[styles.images, { backgroundColor: "#ccc" }]} />
            )}
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.businessName}>{item?.name}</Text>
              <Text style={styles.businessNameSmall}>{item?.address}</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  style={styles.imageStar}
                  source={require("../../../assets/images/star.png")}
                />
                <Text style={styles.businessNameSmall}>4.5/5</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    width: "150%",
    backgroundColor: "#076DF3",
    paddingTop: 50,
  },
  listContent: {
    padding: 20,
  },
  businessCard: {
    marginBottom: 15,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#464a503a",
    borderRadius: 10,
  },
  images: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    fontFamily: "appFontBold",
    fontSize: 25,
    color: "#fff",
    marginTop: 20,
    marginLeft: 20,
  },
  inputText: {
    fontSize: 16,
    fontFamily: "appFont",
    color: "#000",
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  textInputContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  businessName: {
    marginTop: 10,
    fontFamily: "appFontBold",
    fontSize: 20,
  },
  businessNameSmall: {
    fontFamily: "appFont",
    fontSize: 14,
  },
  imageStar: {
    width: 20,
    height: 20,
  },
});
