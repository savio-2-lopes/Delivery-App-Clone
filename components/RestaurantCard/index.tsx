import { useNavigation } from "@react-navigation/native";
import { MapPin, Star } from "phosphor-react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { urlFor } from "../../sanity";

interface RestaurantCard {
  id: number;
  bannerUrl: string;
  token: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
  short_description: string;
  dishes: [];
  long: number;
  lat: number;
}

export function RestaurantCard({
  id,
  bannerUrl,
  title,
  token,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}: RestaurantCard) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          token,
          bannerUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className="bg-white mr-3 shadow-sm"
    >
      <Image
        source={{
          uri: urlFor(bannerUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <Star
            style={{ opacity: 0.5 }}
            weight="fill"
            color="green"
            size={22}
          />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> · {genre}
          </Text>
        </View>

        <View className="flex-row items-center mt-2 space-x-1">
          <MapPin style={{ opacity: 0.5 }} color="gray" size={22} />
          <Text className="text-xs text-gray-500">Próximo · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
