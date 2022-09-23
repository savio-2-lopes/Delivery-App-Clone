import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import {
  selectBasketItems,
  selectBasketTotal,
} from "../../store/basketSlice";
import Currency from "react-currency-formatter";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes";

type BasketScreenProp = StackNavigationProp<RootStackParamList, "Basket">;

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation<BasketScreenProp>();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#3ebd71] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[@01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          Carrinho de Compras
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotal} currency="BRL" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
