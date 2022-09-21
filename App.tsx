import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Restaurant from "./screens/Restaurant";
import { Provider } from "react-redux";
import { store } from "./store";
import Basket from "./screens/Basket";

const Stack = createNativeStackNavigator();

interface RestaurantScreenProps {
  id: number;
  bannerUrl: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
  short_description: string;
  dishes: [];
  long: number;
  lat: number;
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen
            name="Basket"
            component={Basket}
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
