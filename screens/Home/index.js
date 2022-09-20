import React, { useLayoutEffect } from "react";
import { View, Text, SafeAreaView, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CaretDown,
  Faders,
  MagnifyingGlass,
  User,
} from "phosphor-react-native";

const Home = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current location <CaretDown size={20} color="#00CCBB" />
          </Text>
        </View>

        <User size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlass color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <Faders color="#00CCBB" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
