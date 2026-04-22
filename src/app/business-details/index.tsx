import { useUser } from "@clerk/expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import ActionButton from "../../../component/BusinessDetailScreen/ActionButton";
import BusinessDescription from "../../../component/BusinessDetailScreen/BusinessDescription";
import BusinessInfo from "../../../component/BusinessDetailScreen/BusinessInfo";
import { apiClient } from "../../../services/GlobalApi";

export default function BusinessDetail() {
  const router = useRouter();
  const { business } = useLocalSearchParams();
  const businessDetail = JSON.parse(business.toString());
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDetails, setFavoriteDetails] = useState<{
    documentId: string;
  }>();

  useEffect(() => {
    user && CheckFavMarked();
  }, [user]);

  const MarkAsFavorite = async () => {
    if (isFavorite) {
      await apiClient.delete("/user-favorites/" + favoriteDetails?.documentId);
      ToastAndroid.show(
        "Removed marked business from Favorite",
        ToastAndroid.BOTTOM,
      );
      CheckFavMarked();
    } else {
      const result = await apiClient.post("/user-favorites", {
        data: {
          businesId: businessDetail?.id,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
      });
      ToastAndroid.show("Marked business Favorite", ToastAndroid.BOTTOM);
    }
    const result = await apiClient.post("/user-favorites", {
      data: {
        businesId: businessDetail?.id,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });
    console.log(result.data);
    ToastAndroid.show("Marked business Favorite", ToastAndroid.BOTTOM);
  };

  const CheckFavMarked = async () => {
    const result = await apiClient.get(
      "/user-favorites?filters[userEmail][$eq]=" +
        user?.primaryEmailAddress?.emailAddress +
        "&filters[businesId][$eq]=" +
        businessDetail?.id,
    );

    console.log("Marked:", JSON.stringify(+result?.data.data));
    const data = result?.data?.data;
    setFavoriteDetails(data[0]);
    if (data?.length > 0) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer} />
      <View style={styles.backButtonStyle}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../../../assets/images/back-button.png")} />
        </TouchableOpacity>
        {!isFavorite ? (
          <TouchableOpacity onPress={MarkAsFavorite}>
            <Image source={require("../../../assets/images/copy.png")} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={MarkAsFavorite}>
            <Image source={require("../../../assets/images/back-button.png")} />
          </TouchableOpacity>
        )}
      </View>

      <BusinessInfo business={businessDetail} />
      {/* ActionButton Section */}
      <ActionButton business={businessDetail} />

      {/* Description Section */}
      <BusinessDescription business={businessDetail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
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
    fontSize: 16,
    fontFamily: "appFontBold",
    color: "#fff",
  },

  backButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  errorText: {
    fontSize: 16,
    fontFamily: "appFont",
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 20,
  },

  retryText: {
    fontSize: 16,
    fontFamily: "appFontBold",
    color: "#076DF3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#076DF3",
    borderWidth: 1,
    borderRadius: 8,
  },

  emptyText: {
    fontSize: 16,
    fontFamily: "appFont",
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});
