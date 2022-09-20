import { ArrowRight } from "phosphor-react-native";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { RestaurantCard } from "../RestaurantCard";

interface FeaturedProps {
  id: string;
  title: string;
  description: string;
}

const FeaturedRow = ({ id, title, description }: FeaturedProps) => {
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
        <RestaurantCard
          id={123}
          bannerUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.7}
          genre="Japonese"
          address="123 Main St"
          short_description="This is a Test description"
          dishers={[]}
          long={20}
          lat={0}
        />
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
