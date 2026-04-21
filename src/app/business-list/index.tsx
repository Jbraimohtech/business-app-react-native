import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import BusinessListCard from "../../../component/BusinessList/BusinessListCard";
import { businessListType } from "../../../component/HomeScreen/BusinessList";
import { apiClient } from "../../../services/GlobalApi";

export default function BusinessList() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const { categoryName } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState<businessListType[]>([]);
  const [originalBusinessList, setOriginalBusinessList] = useState<
    businessListType[]
  >([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (categoryName) {
      GetBusinessListByCategory();
    }
  }, [categoryName]);

  const GetBusinessListByCategory = async () => {
    if (!categoryName) return;
    setLoading(true);
    try {
      const result = await apiClient.get(
        `/business-lists?filters[category][name][$eq]=${categoryName}&populate=*`,
      );
      console.log("Business list result:", result.data.data);
      setBusinessList(result?.data?.data || []);
      setOriginalBusinessList(result?.data?.data || []);
    } catch (error: any) {
      console.error("Error fetching business list:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    }
    setLoading(false);
  };

  const OnSearchFilter = (searchInput: string) => {
    if (!searchInput) {
      setBusinessList(originalBusinessList);
      return;
    }
    const filterList = originalBusinessList.filter((item) =>
      item.name.toLowerCase().includes(searchInput?.toLowerCase()),
    );

    setBusinessList(filterList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer} />
      <View style={styles.backButtonBox}>
        <TouchableOpacity
          style={styles.backButtonStyle}
          onPress={() => router.back()}
        >
          <Image
            style={styles.backButtonBoxImage}
            source={require("../../../assets/images/back-button.png")}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{categoryName} Business List</Text>
      </View>
      <TextInput
        placeholder="Search business"
        style={styles.textInput}
        onChangeText={(value) => {
          OnSearchFilter(value);
        }}
      />
      {loading && <Text>Loading...</Text>}
      <FlatList
        data={businessList}
        onRefresh={() => GetBusinessListByCategory()}
        refreshing={loading}
        keyExtractor={(item: businessListType, index: number) =>
          item.id?.toString() ?? index.toString()
        }
        renderItem={({ item }: { item: businessListType }) => (
          <BusinessListCard business={item} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No businesses found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },

  topContainer: {
    height: 200,
    width: "200%",
    backgroundColor: "#076DF3",
    position: "absolute",
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 25,
    fontFamily: "appFontBold",
    color: "#fff",
  },

  textInput: {
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  businessContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  businessName: {
    fontSize: 18,
    fontFamily: "appFontBold",
  },
  businessDescription: {
    fontSize: 14,
    fontFamily: "appFont",
    marginTop: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },

  backButtonBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },

  backButtonBoxImage: {
    width: 20,
    height: 20,
    color: "#fff",
  },

  backButtonStyle: {
    backgroundColor: "#076DF3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
});
