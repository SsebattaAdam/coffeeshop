import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../core/constants/theme/theme'

const DetailScreen = () => {
  return (
      <View style={styles.container}>
         <Text style={styles.title}>Deatils Page</Text>
         <Text style={styles.subtitle}>Welcome Detail page</Text>
       </View>
  )
}

export default DetailScreen

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