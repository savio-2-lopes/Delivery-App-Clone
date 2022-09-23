import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "../store";
import { Provider } from "react-redux";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Restaurant from "../screens/Restaurant";
import LoadingOrder from "../screens/LoadingOrder";
import Basket from "../screens/Basket";
import Delivery from "../screens/Delivery";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Restaurant: undefined;
  Basket: undefined;
  LoadingOrder: undefined;
  Delivery: undefined;
};

export function Routes() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
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
