import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowRight,
  CaretDown,
  Faders,
  MagnifyingGlass,
  XCircle,
} from "phosphor-react-native";
import Categories from "../../components/Categories";
import FeaturedRow from "../../components/FeaturedRow";
import sanityClient from "../../sanity";

type Params = {
  token: string;
};

type Profile = {
  email: string;
  name: string;
  given_name: string;
  locale: string;
  picture: string;
};

interface FeaturedProps {
  _id: string;
  short_description: string;
  name: string;
}

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [profile, setProfile] = useState({} as Profile);
  const { token } = route.params as Params;
  const [modalVisible, setModalVisible] = useState(false);

  async function handleLogout() {
    navigation.navigate("Login");
  }

  async function loadProfile() {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`
    );
    const userInfo = await response.json();
    setProfile(userInfo);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    // loadProfile();
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

  return (
    <SafeAreaView className="bg-white">
      {/* Header */}
      <View className="flex-row mt-10 pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <CaretDown size={20} color="#3ebd71" />
          </Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(!false)}>
          <Image
            source={{ uri: profile.picture }}
            className="h-[35px] w-[35px] bg-gray-300 p-4 rounded-full"
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView className="flex">
          <View className="mt-4 flex-row items-center justify-between px-4">
            <Text className="font-bold text-lg">{profile.name}</Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <XCircle weight="fill" size={30} color="#3ebd71" />
            </Pressable>
          </View>

          <Text className="text-xs text-gray-500 px-4">{profile.email}</Text>

          <ScrollView className="divide-y divide-gray-200 mt-10">
            <View className="flex justify-center items-center space-x-3 bg-white py-2 px-5">
              <Image
                source={{ uri: profile.picture }}
                className="h-32 w-32 rounded-full"
              />
            </View>
          </ScrollView>

          <View className="p-5 bg-white mt-5 space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">E-mail: {profile.email}</Text>
            </View>

            <View className="flex-row justify-between mb-10">
              <Text className="text-gray-400">
                Nome do Perfil: {profile.name}
              </Text>
            </View>

            <TouchableOpacity
              className="rounded-lg bg-[#3ebd71] p-4"
              onPress={handleLogout}
            >
              <Text className="text-center text-white text-lg font-bold">
                Deslogar
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Search */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlass color="gray" size={20} />
          <TextInput
            className="rounded-2xl"
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <Faders color="#3ebd71" />
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
              return (
                <FeaturedRow
                  token={token}
                  key={category._id}
                  id={category._id}
                  title={category.name}
                  description={category.short_description}
                />
              );
            })}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
