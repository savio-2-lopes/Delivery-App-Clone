import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

interface CategoryProps {
  bannerUrl: string;
  title: string;
}

const CategoriesCard = ({ bannerUrl, title }: CategoryProps) => {
  return (
    <TouchableOpacity className="relative mr-4">
      <Image
        source={{
          uri: bannerUrl,
        }}
        className="h-28 w-28 rounded-xl"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;
