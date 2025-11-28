import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS} from '../../../core/constants/theme/theme';
import DynamicHeader from '../../../core/components/DynamicHeader';
import CartItemCard from '../components/CartItemCard';
import {useAppSelector, useAppDispatch} from '../../../core/store/hooks';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/AppNavigator';
import type {CartItem} from '../../../core/store/types';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CartScreen = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const cartList = useAppSelector(state => state.cart.cartList);
  const cartPrice = useAppSelector(state => state.cart.cartPrice);

  // Group cart items by id (same item can have multiple sizes)
  const groupedItems = useMemo(() => {
    const grouped: {[key: string]: CartItem[]} = {};
    cartList.forEach(item => {
      if (!grouped[item.id]) {
        grouped[item.id] = [];
      }
      grouped[item.id].push(item);
    });
    return Object.values(grouped);
  }, [cartList]);

  const handleQuantityIncrease = (id: string, size: string) => {
    const item = cartList.find(
      i => i.id === id && i.size === size,
    );
    if (item) {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: {
          id,
          size,
          quantity: item.quantity + 1,
        },
      });
    }
  };

  const handleQuantityDecrease = (id: string, size: string) => {
    const item = cartList.find(
      i => i.id === id && i.size === size,
    );
    if (item && item.quantity > 1) {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: {
          id,
          size,
          quantity: item.quantity - 1,
        },
      });
    }
  };

  const handleRemove = (id: string, size: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {id, size},
    });
  };

  const handlePay = () => {
    if (cartList.length === 0) {
      return;
    }
    // Navigate to payment screen with cart data
    navigation.navigate('Payment', {
      totalAmount: cartPrice,
      cartItems: cartList,
    });
  };

  return (
    <View style={styles.container}>
      <DynamicHeader
        leftIcon={{
          name: 'menu',
          onPress: () => {
            console.log('Menu pressed');
          },
        }}
        rightIcon={{
          name: 'user',
          onPress: () => {
            console.log('Profile pressed');
          },
        }}
        title="Cart"
      />

      {cartList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {groupedItems.map((items, index) => (
              <CartItemCard
                key={`${items[0].id}-${index}`}
                items={items}
                onQuantityIncrease={handleQuantityIncrease}
                onQuantityDecrease={handleQuantityDecrease}
                onRemove={handleRemove}
              />
            ))}
          </ScrollView>

          {/* Fixed Bottom Section */}
          <View style={styles.bottomSection}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Price</Text>
              <Text style={styles.totalPrice}>
                $ {cartPrice.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.payButton}
              onPress={handlePay}
              activeOpacity={0.8}>
              <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollContent: {
    paddingTop: SPACING.space_15,
    paddingBottom: 180, // Space for fixed bottom section + navigation bar
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 80, // Account for bottom navigation bar
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_15,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderTopWidth: 1,
    borderTopColor: COLORS.primaryGreyHex,
    paddingBottom: SPACING.space_20,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_4,
  },
  totalPrice: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
  },
  payButton: {
    flex: 1,
    marginLeft: SPACING.space_20,
    paddingVertical: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
});

export default CartScreen;
