import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';

const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;

