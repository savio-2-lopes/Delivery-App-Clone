import React, { useLayoutEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import Svg, { Circle, Rect } from "react-native-svg";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

const Login = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  async function handleHome() {
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as AuthResponse;

    if (type === "success") {
      navigation.navigate("Home", { token: params.access_token });
    }
  }

  return (
    <SafeAreaView className="bg-[#3ebd71] h-full">
      <View className="pb-3 items-center">
        <View className="w-full">
          <View className="bg-[#38b169] border-[#38b169] flex items-center rounded-b-[150px]">
            <Image
              source={require("../../assets/home.png")}
              className="h-[340] w-[340]"
            />
          </View>
        </View>

        {/* <a href="https://www.freepik.com/free-vector/healthy-food-concept-with-people-vegetables_24922282.htm#query=salad%20cartoon&position=10&from_view=keyword">Image by upklyak</a> on Freepik */}

        <View className="w-screen mt-10 bg-[#3ebd71]">
          <Text className="font-bold text-4xl text-center text-white mt-2">
            Buscando pratos vegetarianos?
          </Text>

          <View className="flex items-center justify-center">
            <Text className="break-words mt-5 w-70 text-center text-lg text-white">
              Faça seu pedido de pratos próximos de sua localidade.
            </Text>
          </View>

          <View className="p-5 mt-2">
            <TouchableOpacity
              className="h-[70] w-full p-2 rounded-2xl bg-white flex-row justify-center items-center"
              activeOpacity={0.7}
              onPress={handleHome}
            >
              <SimpleLineIcons name="social-google" size={34} color="#38b169" />
              <Text className="flex ml-3 text-[#38b169] text-lg">
                Faça seu login com o Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
