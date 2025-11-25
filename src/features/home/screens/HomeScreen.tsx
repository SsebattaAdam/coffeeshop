import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../../core/constants/theme/theme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to Coffee Store</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  subtitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
});

export default HomeScreen;

