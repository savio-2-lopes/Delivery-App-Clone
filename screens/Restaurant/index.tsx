import { useNavigation, useRoute } from "@react-navigation/native";
import {
  CaretLeft,
  CaretRight,
  MapPin,
  Question,
  Star,
} from "phosphor-react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import BasketIcon from "../../components/BasketIcon";
import DishRow from "../../components/DishRow";
import { setRestaurant } from "../../features/restaurantSlice";
import { urlFor } from "../../sanity";
import { useDispatch, useSelector } from "react-redux";

interface RestaurantScreenProps {
  id: number;
  bannerUrl: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
  short_description: string;
  dishes: [];
  long: number;
  lat: number;
}

const Restaurant = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      bannerUrl,
      token,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        bannerUrl,
        title,
        token,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(bannerUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <CaretLeft size={20} color="#3ebd71" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Star
                  color="green"
                  style={{ opacity: 0.5 }}
                  weight="fill"
                  size={22}
                />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> · {genre}
                </Text>
              </View>
              {/*  */}
              <View className="flex-row items-center space-x-1">
                <MapPin style={{ opacity: 0.5 }} color="gray" size={22} />
                <Text className="text-xs text-gray-400">
                  Nearby · {address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-400 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <Question color="gray" style={{ opacity: 0.5 }} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold text-gray-400">
              Have a food allergy?
            </Text>
            <CaretRight color="#3ebd71" />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {dishes.map((dish: any) => (
            <DishRow
              key={dish._id}
              token={token}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Restaurant;
