import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS } from '../../../core/constants/theme/theme'
import CustomIcon from '../../../core/components/customIcon'
import { useAppDispatch } from '../../../core/store/hooks'
import { RootStackParamList } from '../../navigation/AppNavigator'

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'CoffeeDetails'>;

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailScreenRouteProp>();
  const dispatch = useAppDispatch();
  const { coffee } = route.params;
  
  const [selectedSize, setSelectedSize] = useState<string>(coffee.prices[0]?.size || 'M');

  const handleFavoritePress = () => {
    dispatch({ type: 'TOGGLE_COFFEE_FAVORITE', payload: coffee.id });
  };

  const handleAddToCart = () => {
    const selectedPrice = coffee.prices.find(p => p.size === selectedSize);
    if (selectedPrice) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: coffee.id,
          name: coffee.name,
          roasted: coffee.roasted,
          imagelink_square: coffee.imagelink_square,
          special_ingredient: coffee.special_ingredient,
          prices: coffee.prices,
          type: coffee.type,
          quantity: 1,
          size: selectedSize,
        },
      });
    }
  };

  const selectedPrice = coffee.prices.find(p => p.size === selectedSize);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Coffee Image */}
        <View style={styles.imageContainer}>
          <Image
            source={coffee.imagelink_portrait || coffee.imagelink_square}
            style={styles.coffeeImage}
            resizeMode="cover"
          />
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={0.7}>
            <CustomIcon
              name="like"
              size={FONTSIZE.size_20}
              color={coffee.favourite ? COLORS.primaryRedHex : COLORS.primaryWhiteHex}
            />
          </TouchableOpacity>
        </View>

        {/* Details Panel */}
        <View style={styles.detailsPanel}>
          {/* Title and Subtitle */}
          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              <View style={styles.titleTextContainer}>
                <Text style={styles.coffeeName}>{coffee.name}</Text>
                <Text style={styles.coffeeSpecialIngredient}>
                  {coffee.special_ingredient}
                </Text>
              </View>
              {/* Ingredient Icons */}
              <View style={styles.ingredientIcons}>
                <View style={styles.ingredientIcon}>
                  <Text style={styles.ingredientEmoji}>☕</Text>
                  <Text style={styles.ingredientText}>Coffee</Text>
                </View>
                <View style={styles.ingredientIcon}>
                  <Text style={styles.ingredientEmoji}>🥛</Text>
                  <Text style={styles.ingredientText}>Milk</Text>
                </View>
              </View>
            </View>

            {/* Rating and Roast Level */}
            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                <CustomIcon
                  name="star"
                  size={FONTSIZE.size_20}
                  color={COLORS.primaryOrangeHex}
                />
                <Text style={styles.ratingText}>{coffee.average_rating}</Text>
                <Text style={styles.reviewsText}>({coffee.ratings_count})</Text>
              </View>
              <View style={styles.roastBadge}>
                <Text style={styles.roastText}>{coffee.roasted}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{coffee.description}</Text>
          </View>

          {/* Size Selection */}
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeTitle}>Size</Text>
            <View style={styles.sizeButtons}>
              {coffee.prices.map((price, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeButton,
                    selectedSize === price.size && styles.sizeButtonSelected,
                  ]}
                  onPress={() => setSelectedSize(price.size)}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.sizeButtonText,
                      selectedSize === price.size && styles.sizeButtonTextSelected,
                    ]}>
                    {price.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price and Add to Cart */}
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceText}>
                {selectedPrice?.currency} {selectedPrice?.price}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.6,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coffeeImage: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: SCREEN_WIDTH * 0.4,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: SPACING.space_20,
    left: SPACING.space_20,
    width: 40,
    height: 40,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: FONTSIZE.size_30,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.space_20,
    right: SPACING.space_20,
    width: 40,
    height: 40,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsPanel: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderTopLeftRadius: SPACING.space_20,
    borderTopRightRadius: SPACING.space_20,
    padding: SPACING.space_20,
    marginTop: -SPACING.space_20,
  },
  titleContainer: {
    marginBottom: SPACING.space_20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.space_15,
  },
  titleTextContainer: {
    flex: 1,
  },
  coffeeName: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_4,
  },
  coffeeSpecialIngredient: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
  ingredientIcons: {
    flexDirection: 'row',
    gap: SPACING.space_10,
  },
  ingredientIcon: {
    width: 50,
    height: 50,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientEmoji: {
    fontSize: FONTSIZE.size_20,
  },
  ingredientText: {
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_4,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_4,
  },
  ratingText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
  reviewsText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
  roastBadge: {
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryGreyHex,
  },
  roastText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  descriptionContainer: {
    marginBottom: SPACING.space_20,
  },
  descriptionTitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  descriptionText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
    lineHeight: FONTSIZE.size_14 * 1.5,
  },
  sizeContainer: {
    marginBottom: SPACING.space_20,
  },
  sizeTitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: SPACING.space_15,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonSelected: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
  },
  sizeButtonText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryLightGreyHex,
  },
  sizeButtonTextSelected: {
    color: COLORS.primaryOrangeHex,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.space_20,
    borderTopWidth: 1,
    borderTopColor: COLORS.primaryGreyHex,
  },
  priceLabel: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
  priceText: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
  },
  addToCartButton: {
    flex: 1,
    marginLeft: SPACING.space_20,
    paddingVertical: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
});