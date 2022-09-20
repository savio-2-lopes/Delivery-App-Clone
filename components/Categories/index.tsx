import { View, Text, ScrollView } from "react-native";
import CategoriesCard from "../CategoriesCard";

const Categories = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <CategoriesCard
        title="Testing"
        bannerUrl="https://links.papareact.com/gn7"
      />
      <CategoriesCard
        title="Testing"
        bannerUrl="https://links.papareact.com/gn7"
      />
      <CategoriesCard
        title="Testing"
        bannerUrl="https://links.papareact.com/gn7"
      />
      <CategoriesCard
        title="Testing"
        bannerUrl="https://links.papareact.com/gn7"
      />
    </ScrollView>
  );
};

export default Categories;
