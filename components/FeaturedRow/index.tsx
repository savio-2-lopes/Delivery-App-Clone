import { ArrowRight } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { RestaurantCard } from "../RestaurantCard";
import sanityClient from "../../sanity";

interface FeaturedProps {
  id: string;
  title: string;
  token: string;
  description: string;
}

interface RestaurantCardProps {
  _id: number;
  image: string;
  address: string;
  name: string;
  rating: number;
  short_description: string;
  dishes: [];
  genre: string;
  long: number;
  lat: number;
}

const FeaturedRow = ({ id, token, title, description }: FeaturedProps) => {
  const [restaurants, setRestaurants] = useState<RestaurantCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == 'featured' && _id == $id] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type -> {
          name
        }
      }
    }[0]
    `,
        { id }
      )
      .then((data: any) => {
        setRestaurants(data?.restaurants);
        setLoading(true);
      });
  }, []);

  return (
    <SafeAreaView className="flex">
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-gray-600 text-xl">{title}</Text>
        <ArrowRight color="#3ebd71" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4 "
      >
        {loading ? (
          restaurants.map((restaurant: RestaurantCardProps) => {
            return (
              <RestaurantCard
                key={restaurant._id}
                id={restaurant._id}
                token={token}
                bannerUrl={restaurant.image}
                title={restaurant.name}
                rating={restaurant.rating}
                genre={restaurant.genre}
                address={restaurant.address}
                short_description={restaurant.short_description}
                dishes={restaurant.dishes}
                long={restaurant.long}
                lat={restaurant.lat}
              />
            );
          })
        ) : (
          <View className="flex mt-5 mb-5 align-items w-screen justify-center">
            <ActivityIndicator size={100} color="#3ebd71" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeaturedRow;
