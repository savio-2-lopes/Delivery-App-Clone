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
    <SafeAreaView className="bg-[#3ebd71] w-full h-full">
      <View className="pb-3 mt-2 items-center mx-4 space-x-2">
        <View className="bg-[#38b169] border-[#38b169] rounded-b-[120px]">
          <Image
            source={require("../../assets/home.png")}
            style={{ width: 370, height: 370 }}
          />
        </View>

        {/* <a href="https://www.freepik.com/free-vector/healthy-food-concept-with-people-vegetables_24922282.htm#query=salad%20cartoon&position=10&from_view=keyword">Image by upklyak</a> on Freepik */}

        <View className="w-screen bg-[#3ebd71] p-5">
          <Text className="font-bold text-4xl text-center text-white mt-2">
            Buscando pratos vegetarianos?
          </Text>

          <View className="flex items-center justify-center">
            <Text className="break-words mt-5 w-60 text-center text-lg text-white">
              Faça seu pedido de pratos vegetarianos próximos de sua localidade.
            </Text>
          </View>

          <TouchableOpacity
            className="mt-8 h-[70] rounded-2xl bg-white flex-row justify-center items-center"
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
    </SafeAreaView>
  );
};

export default Login;
