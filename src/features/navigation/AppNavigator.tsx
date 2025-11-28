import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../../core/store/store';
import BottomTabNavigator from './BottomTabNavigator/BottomTabNavigator';
import DetailScreen from '../../features/home/screens/DetailScreen';
import {View, ActivityIndicator} from 'react-native';
import {COLORS} from '../../core/constants/theme/theme';
import type {CoffeeItem} from '../../core/store/types';

import PaymentScreen from '../payments/screens/PaymentScreen';
import type {CartItem} from '../../core/store/types';

// Define your navigation param types
export type RootStackParamList = {
  MainTabs: {screen?: string} | undefined;
  CoffeeDetails: { coffee: CoffeeItem };
  Payment: { totalAmount: number; cartItems: CartItem[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavigatorContent() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // Slide from bottom animation for all screens
          animation: 'slide_from_bottom',
        }}>
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="CoffeeDetails" component={DetailScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  // Safety check for store
  if (!store || !persistor) {
    console.error('Store or persistor is undefined! Cannot render app.');
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.primaryBlackHex,
        }}>
        <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.primaryBlackHex,
            }}>
            <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
          </View>
        }
        persistor={persistor}>
        <NavigatorContent />
      </PersistGate>
    </Provider>
  );
}

