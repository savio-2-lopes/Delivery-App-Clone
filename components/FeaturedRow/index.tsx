import { ArrowRight } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { RestaurantCard } from "../RestaurantCard";
import sanityClient from "../../sanity";

interface FeaturedProps {
  id: string;
  title: string;
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

const FeaturedRow = ({ id, title, description }: FeaturedProps) => {
  const [restaurants, setRestaurants] = useState<RestaurantCardProps[]>([]);

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
      });
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRight color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants ? (
          restaurants.map((restaurant: RestaurantCardProps) => {
            return (
              <RestaurantCard
              key={restaurant._id}
                id={restaurant._id}
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
          <Text> Sem dados</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
