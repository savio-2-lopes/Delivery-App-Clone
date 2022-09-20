import { MapPin, Star } from "phosphor-react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface RestaurantCard {
  id: number;
  bannerUrl: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
  short_description: string;
  dishers: [];
  long: number;
  lat: number;
}

export function RestaurantCard(props: RestaurantCard) {
  return (
    <TouchableOpacity className="bg-white mr-3 shadow-sm">
      <Image
        source={{
          uri: props.bannerUrl,
        }}
        className="h-36 w-64 rounded-sm"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{props.title}</Text>
        <View className="flex-row items-center space-x-1">
          <Star color="green" size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{props.rating}</Text> ·{" "}
            {props.genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPin color="gray" size={22} />
          <Text className="text-xs text-gray-500">
            Nearby · {props.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
