import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomIcon from '../../../core/components/customIcon';
import {
  FONTSIZE,
  COLORS,
  SPACING,
  FONTFAMILY,
  BORDERRADIUS,
} from '../../../core/constants/theme/theme';
import type {CoffeeItem} from '../../../core/store/types';
import type {BeanItem} from '../../../core/store/types';

interface FavoriteItemCardProps {
  item: CoffeeItem | BeanItem;
  onPress: () => void;
  onRemoveFavorite: () => void;
}

const FavoriteItemCard: React.FC<FavoriteItemCardProps> = ({
  item,
  onPress,
  onRemoveFavorite,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <Image source={item.imagelink_square} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.specialIngredient}>
              {item.special_ingredient}
            </Text>
            {item.roasted && (
              <View style={styles.roastedTag}>
                <Text style={styles.roastedText}>{item.roasted}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={onRemoveFavorite}
            style={styles.favoriteButton}
            activeOpacity={0.7}>
            <CustomIcon
              name="like"
              size={FONTSIZE.size_20}
              color={COLORS.primaryRedHex}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>
            {item.prices[1]?.currency || '$'} {item.prices[1]?.price || '0.00'}
          </Text>
          <View style={styles.ratingContainer}>
            <CustomIcon
              name="star"
              size={FONTSIZE.size_14}
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
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: SPACING.space_15,
    padding: SPACING.space_15,
    marginHorizontal: SPACING.space_15,
    marginBottom: SPACING.space_15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: SPACING.space_10,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    marginLeft: SPACING.space_15,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_4,
  },
  specialIngredient: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  roastedTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryGreyHex,
    marginTop: SPACING.space_4,
  },
  roastedText: {
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  favoriteButton: {
    padding: SPACING.space_8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_10,
  },
  price: {
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

export default FavoriteItemCard;

