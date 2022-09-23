import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Currency from "react-currency-formatter";
import { MinusCircle, PlusCircle } from "phosphor-react-native";
import { urlFor } from "../../sanity";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../../store/basketSlice";

interface DishRow {
  id: string;
  token: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const DishRow = ({ id, token, name, description, price, image }: DishRow) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(
      addToBasket({
        id,
        name,
        token,
        description,
        price,
        image,
      })
    );
  };

  console.log(urlFor(image).url())

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-xl text-gray-600 mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={Number(price)} currency="BRL" />
            </Text>
            <Image source={{ uri: urlFor(image).url()}} />
          </View>

          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              className="h-12 w-12 rounded-full"
              source={{ uri: urlFor(image).url() }}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircle
                weight="fill"
                color={items.length > 0 ? "#3ebd71" : "gray"}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircle weight="fill" color="#3ebd71" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
