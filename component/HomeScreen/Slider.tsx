import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { apiClient, getStrapiMediaUrl } from "../../services/GlobalApi";

type SliderType = {
  name: string;
  description: string;
  image: any;
};

export default function Slider() {
  const [sliders, setSliders] = useState<SliderType[]>([]);
  useEffect(() => {
    GetSliders();
  }, []);
  // Fetch Sliders from Admin Panel and display here
  const GetSliders = async () => {
    try {
      const result = await apiClient.get("/sliders?populate=*");
      console.log("Sliders API response:", result.data);
      setSliders(result?.data?.data || []);
    } catch (error: any) {
      console.error("Error fetching sliders:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.slide}>
            <Image
              style={styles.image}
              source={{ uri: getStrapiMediaUrl(item.image) }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  slide: {
    // marginRight: 15,
  },
  image: {
    width: Dimensions.get("screen").width * 0.9,
    height: 150,
    borderRadius: 20,
    marginRight: 15,
  },
});
