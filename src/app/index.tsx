import { useSSO, useUser } from "@clerk/expo";
import { OAuthStrategy } from "@clerk/types";
import * as AuthSession from "expo-auth-session";
import { type Href, useNavigation, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { apiClient as axiosClient } from "../../services/GlobalApi";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const navigation = useNavigation();
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user]);

  const CreateNewUser = async () => {
    if (!user) return;

    const fullName = user.fullName ?? "";
    const email = user.primaryEmailAddress?.emailAddress ?? "";

    if (!email) {
      console.warn("User email is not available yet. Skipping Strapi sync.");
      return;
    }

    try {
      const result = await axiosClient.post("/user-lists", {
        data: {
          fullName,
          email,
        },
      });
      console.log("Strapi user created", result.data);
    } catch (err) {
      const axiosError = err as any;
      console.error("Strapi create user error", {
        message: axiosError?.message,
        status: axiosError?.response?.status,
        data: axiosError?.response?.data,
        url: axiosError?.config?.url,
      });
    }
  };

  const router = useRouter();
  const [submittingStrategy, setSubmittingStrategy] =
    React.useState<OAuthStrategy | null>(null);

  const onPress = async (oauthStrategy: OAuthStrategy) => {
    if (submittingStrategy) return;
    setSubmittingStrategy(oauthStrategy);
    try {
      AuthSession.dismiss();
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "myapp",
        path: "",
        isTripleSlashed: true,
      });

      console.log("Starting SSO", oauthStrategy, redirectUrl);
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: oauthStrategy,
        redirectUrl,
      });

      // If the session was created, set it as the active session
      if (createdSessionId) {
        setActive?.({
          session: createdSessionId,
          navigate: async ({ session, decorateUrl }) => {
            // Handle session tasks
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            // If no session tasks, navigate the signed-in user to the home page
            const url = decorateUrl("/");
            if (url.startsWith("http")) {
              if (typeof window !== "undefined") {
                window.location.href = url;
              }
            } else {
              router.push(url as Href);
            }
          },
        });
      } else {
        // If the session was not created, navigate to the continue page to collect missing information
        router.push("/");
      }
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as any).code === "ERR_WEB_BROWSER_ALREADY_OPEN"
      ) {
        AuthSession.dismiss();
      }
      console.error("SSO error", err);
    } finally {
      setSubmittingStrategy(null);
    }
  };

  const providers = [
    { strategy: "oauth_google", name: "Google" },
    { strategy: "oauth_github", name: "GitHub" },
  ];

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/Human.png")}
      />
      <Text style={styles.text}>Welcome to</Text>
      <Text style={styles.text}>Business Directory</Text>
      <View style={styles.firstBox}>
        <Text style={styles.textDiscover}>
          Discover thousands of local businesses all in one place
        </Text>
        <TouchableOpacity
          onPress={() => onPress("oauth_google")}
          style={styles.buttonDiscover}
          disabled={!!submittingStrategy}
        >
          <View style={styles.buttonDiscoverContainer}>
            <Image
              style={styles.google}
              source={require("../../assets/images/google.png")}
            />
            <Text style={styles.textDiscover}>Sign In With Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textDiscoverSkip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#076DF3",
  },

  image: {
    width: "70%",
    height: 350,
    marginTop: 100,
    justifyContent: "center",
    alignSelf: "center",
  },

  text: {
    fontSize: 24,
    fontFamily: "appFont",
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },

  firstBox: {
    width: "90%",
    height: "30%",
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
    padding: 10,
  },

  textDiscover: {
    fontSize: 23,
    fontFamily: "appFont",
    color: "#000",
    textAlign: "center",
  },

  textDiscoverSkip: {
    fontSize: 23,
    fontFamily: "appFont",
    color: "#fff",
    textAlign: "center",
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#076DF3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonDiscover: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#076DF3",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  google: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  buttonDiscoverContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
