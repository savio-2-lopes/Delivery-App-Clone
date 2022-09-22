import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Restaurant from "./screens/Restaurant";
import { Provider } from "react-redux";
import { store } from "./store";
import Basket from "./screens/Basket";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { ActivityIndicator } from "react-native";
import LoadingOrder from "./screens/LoadingOrder";
import Delivery from "./screens/Delivery";
import Login from "./screens/Login";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Restaurant: undefined;
  Basket: undefined;
  LoadingOrder: undefined;
  Delivery: undefined;
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={50} color="#3ebd71" />;
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen
            name="Basket"
            component={Basket}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="LoadingOrder"
            component={LoadingOrder}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="Delivery"
            component={Delivery}
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
