import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CaretDown,
  Faders,
  MagnifyingGlass,
  User,
} from "phosphor-react-native";
import Categories from "../../components/Categories";
import FeaturedRow from "../../components/FeaturedRow";
import sanityClient from "../../sanity";

interface FeaturedProps {
  _id: string;
  short_description: string;
  name: string;
}

const Home = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == 'featured'] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }
      `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white mt-10">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <CaretDown size={20} color="#00CCBB" />
          </Text>
        </View>
        <User size={35} color="#00CCBB" />
      </View>

      {/* Search */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlass color="gray" size={20} />
          <TextInput
            className="rounded-xl"
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <Faders color="#00CCbb" />
      </View>

      {/* Conteúdo */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <>
          <Categories />
          {featuredCategories &&
            featuredCategories.map((category: FeaturedProps) => {
              <>
                <FeaturedRow
                  key={category._id}
                  id={category._id}
                  title={category.name}
                  description={category.short_description}
                />
              </>;
            })}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
