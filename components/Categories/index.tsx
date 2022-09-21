import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
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

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == 'category']
      `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories ? (
        categories.map((category: CategoriesProps) => (
          <CategoriesCard
            key={category._id}
            title={category.name}
            bannerUrl={urlFor(category.image).width(200).url()}
          />
        ))
      ) : (
        <Text>Sem dados</Text>
      )}
    </ScrollView>
  );
};

export default Categories;
