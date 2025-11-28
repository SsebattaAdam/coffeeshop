import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  FONTSIZE,
  COLORS,
  SPACING,
  FONTFAMILY,
  BORDERRADIUS,
} from '../../../core/constants/theme/theme';
import type {CartItem} from '../../../core/store/types';

interface CartItemCardProps {
  items: CartItem[]; // All cart items with the same id but different sizes
  onQuantityIncrease: (id: string, size: string) => void;
  onQuantityDecrease: (id: string, size: string) => void;
  onRemove: (id: string, size: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  items,
  onQuantityIncrease,
  onQuantityDecrease,
  onRemove,
}) => {
  if (items.length === 0) return null;

  const firstItem = items[0]; // Use first item for common properties

  return (
    <View style={styles.container}>
      <Image source={firstItem.imagelink_square} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Text style={styles.name}>{firstItem.name}</Text>
            <Text style={styles.specialIngredient}>
              {firstItem.special_ingredient}
            </Text>
            {firstItem.roasted && (
              <View style={styles.roastedTag}>
                <Text style={styles.roastedText}>{firstItem.roasted}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Render each size as a separate row */}
        {items.map((item, index) => {
          const priceInfo = item.prices.find(p => p.size === item.size);
          const price = priceInfo ? parseFloat(priceInfo.price) : 0;
          const currency = priceInfo?.currency || '$';

          return (
            <View
              key={`${item.id}-${item.size}-${index}`}
              style={[
                styles.sizeRow,
                index < items.length - 1 && styles.sizeRowWithMargin,
              ]}>
              <View style={styles.sizeTag}>
                <Text style={styles.sizeText}>{item.size}</Text>
              </View>
              <Text style={styles.price}>
                {currency} {price.toFixed(2)}
              </Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    if (item.quantity > 1) {
                      onQuantityDecrease(item.id, item.size);
                    } else {
                      onRemove(item.id, item.size);
                    }
                  }}
                  activeOpacity={0.7}>
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <View style={styles.quantityDisplay}>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                </View>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => onQuantityIncrease(item.id, item.size)}
                  activeOpacity={0.7}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
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
    width: 80,
    height: 80,
    borderRadius: SPACING.space_10,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    marginLeft: SPACING.space_15,
  },
  header: {
    marginBottom: SPACING.space_10,
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
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sizeTag: {
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_6,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryGreyHex,
  },
  sizeText: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  price: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    flex: 1,
    marginLeft: SPACING.space_10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_8,
  },
  sizeRowWithMargin: {
    marginTop: SPACING.space_10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: BORDERRADIUS.radius_8,
    backgroundColor: COLORS.primaryOrangeHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
  quantityDisplay: {
    minWidth: 30,
    height: 30,
    borderRadius: BORDERRADIUS.radius_8,
    backgroundColor: COLORS.primaryGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_8,
  },
  quantityText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
});

export default CartItemCard;

