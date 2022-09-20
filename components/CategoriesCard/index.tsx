import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

interface CategoryProps {
  bannerUrl: string;
  title: string;
}

const CategoriesCard = ({ bannerUrl, title }: CategoryProps) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          uri: bannerUrl,
        }}
        className="h-20 w-20 rounded-lg"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;
