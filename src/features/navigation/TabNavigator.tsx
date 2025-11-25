import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import CustomIcon from '../../core/components/customIcon';
import {COLORS, SPACING} from '../../core/constants/theme/theme';

// Screens
import HomeScreen from '../home/screens/HomeScreen';
import CartScreen from '../cart/screens/CartScreen';
import FavoritesScreen from '../favorites/screens/FavoritesScreen';
import NotificationsScreen from '../notifications/screens/NotificationsScreen';
import { BlurView } from '@react-native-community/blur';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.primaryOrangeHex,
        tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
        tabBarBackground: ()=>(
          <BlurView overlayColor='' blurAmount={15} style = {styles.blurviewStyle}/>
        )
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="home"
              size={size}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
           
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="cart"
              size={size}
              color={focused ? COLORS.primaryOrangeHex : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="like"
              size={size}
              color={focused ? COLORS.primaryOrangeHex : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="bell"
              size={size}
              color={focused ? COLORS.primaryOrangeHex : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
    borderTopLeftRadius: SPACING.space_20,
    borderTopRightRadius: SPACING.space_20,
  },

  blurviewStyle:{
    position : 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right : 0
  }
});

export default TabNavigator;

