import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

const LoadingOrder = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-[#112a3a] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../../assets/order.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-[380] w-[380]"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="break-words mt-10 mb-10 w-60 text-center text-lg text-white"
      >
        Waiting for Restaurant to accept your order
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default LoadingOrder;
