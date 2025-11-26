import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomIcon from '../../../core/components/customIcon';
import { FONTSIZE, COLORS, SPACING, FONTFAMILY } from '../../../core/constants/theme/theme';
import { CoffeeItem } from '../../../core/store/types';


interface CoffeeCardProps {
  item: CoffeeItem;
  onPress: () => void;
  onFavoritePress: () => void;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  item,
  onPress,
  onFavoritePress,
}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}>
      <Image source={item.imagelink_square} style={styles.coffeeImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.cardInfo}>
            <Text style={styles.coffeeName}>{item.name}</Text>
            <Text style={styles.coffeeSpecialIngredient}>
              {item.special_ingredient}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onFavoritePress}
            style={styles.favoriteButton}
            activeOpacity={0.7}>
            <CustomIcon
              name={item.favourite ? 'like' : 'like'}
              size={FONTSIZE.size_20}
              color={
                item.favourite
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.coffeePrice}>
            {item.prices[1]?.currency}
            {item.prices[1]?.price}
          </Text>
          <View style={styles.ratingContainer}>
            <CustomIcon
              name="star"
              size={FONTSIZE.size_16}
              color={COLORS.primaryOrangeHex}
            />
            <Text style={styles.ratingText}>{item.average_rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: SPACING.space_15,
    backgroundColor: COLORS.primaryDarkGreyHex,
    overflow: 'hidden',
    marginBottom: SPACING.space_20,
    width: '100%',
  },
  coffeeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: SPACING.space_15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.space_10,
  },
  cardInfo: {
    flex: 1,
  },
  coffeeName: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_4,
  },
  coffeeSpecialIngredient: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
  favoriteButton: {
    padding: SPACING.space_8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coffeePrice: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_4,
  },
  ratingText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
});

export default CoffeeCard;

