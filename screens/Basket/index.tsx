import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { selectRestaurant } from "../../features/restaurantSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../../features/basketSlice";
import { XCircle } from "phosphor-react-native";
import { urlFor } from "../../sanity";
import Currency from "react-currency-formatter";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type LoadingOrderScreenProp = StackNavigationProp<
  RootStackParamList,
  "LoadingOrder"
>;

const Basket = () => {
  const navigation = useNavigation<LoadingOrderScreenProp>();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBasketTotal);

  async function handleLoadingOrder() {
    navigation.navigate("LoadingOrder");
  }

  useEffect(() => {
    const groupedItems = items.reduce((results: any, item: any) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white mt-4">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">
              Carrinho de Compras
            </Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircle weight="fill" color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="BRL" />
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remover
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="BRL" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Entrega gratuita</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency="BRL" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Valor total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 5.99} currency="BRL" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleLoadingOrder}
            className="rounded-lg bg-[#00CCbb] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Faça a sua encomenda
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Basket;
