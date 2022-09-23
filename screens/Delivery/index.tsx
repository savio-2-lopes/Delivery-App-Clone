import { useNavigation } from "@react-navigation/native";
import { X } from "phosphor-react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../../store/restaurantSlice";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";

type Profile = {
  email: string;
  name: string;
  given_name: string;
  locale: string;
  picture: string;
};

const Delivery = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const [profile, setProfile] = useState({} as Profile);

  async function loadProfile() {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${restaurant.token}`
    );
    const userInfo = await response.json();
    setProfile(userInfo);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View className="bg-[#3ebd71] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <X color="white" weight="fill" size={40} />
          </TouchableOpacity>
          <Text className="font-ligth text-white text-lg">Ajuda no pedido</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View>
            <Text className="text-lg text-gray-400">Chegada estimada</Text>
            <Text className="text-3xl font-bold">35-45 Minutos</Text>
          </View>

          <Progress.Bar className="mt-3" color="#3ebd71" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Seu pedido no {restaurant.title} está sendo preparada
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        className="z-0 -mt-10 flex-1"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#3ebd71"
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{ uri: profile.picture }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">{profile.name}</Text>
        </View>
        <Text className="text-[#3ebd71] text-lg mr-5 font-bold">Ligar</Text>
      </SafeAreaView>
    </View>
  );
};
export default Delivery;
