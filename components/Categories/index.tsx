import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import CategoriesCard from "../CategoriesCard";
import sanityClient from "../../sanity";
import { urlFor } from "../../sanity";

interface CategoriesProps {
  _id: string;
  image: string;
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == 'category']
      `
      )
      .then((data) => {
        setCategories(data);
        setLoading(true);
      });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      className="mt-5 mb-5"
      showsHorizontalScrollIndicator={false}
    >
      {loading ? (
        categories.map((category: CategoriesProps) => (
          <CategoriesCard
            key={category._id}
            title={category.name}
            bannerUrl={urlFor(category.image).width(250).url()}
          />
        ))
      ) : (
        <View className="align-items w-screen justify-center">
          <ActivityIndicator size={50} color="#3ebd71" />
        </View>
      )}
    </ScrollView>
  );
};

export default Categories;
