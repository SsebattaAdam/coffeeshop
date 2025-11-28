import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../../core/constants/theme/theme';
import DynamicHeader from '../../../core/components/DynamicHeader';
import FavoriteItemCard from '../components/FavoriteItemCard';
import {useAppSelector, useAppDispatch} from '../../../core/store/hooks';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/AppNavigator';
import type {CoffeeItem} from '../../../core/store/types';
import type {BeanItem} from '../../../core/store/types';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FavoritesScreen = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  
  const coffeeList = useAppSelector(state => state.coffee.coffeeList);
  const beanList = useAppSelector(state => state.beans.beansList);

  // Get all favorite items
  const favoriteItems = useMemo(() => {
    const coffeeFavorites = coffeeList.filter(item => item.favourite);
    const beanFavorites = beanList.filter(item => item.favourite);
    return [...coffeeFavorites, ...beanFavorites];
  }, [coffeeList, beanList]);

  const handleItemPress = (item: CoffeeItem | BeanItem) => {
    navigation.navigate('CoffeeDetails', {coffee: item});
  };

  const handleRemoveFavorite = (item: CoffeeItem | BeanItem) => {
    if (item.type === 'Bean') {
      dispatch({type: 'TOGGLE_BEAN_FAVORITE', payload: item.id});
    } else {
      dispatch({type: 'TOGGLE_COFFEE_FAVORITE', payload: item.id});
    }
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
        title="Favorites"
      />

      {favoriteItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Favorites</Text>
          <Text style={styles.emptySubtitle}>
            Your favorite items will appear here
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {favoriteItems.map((item, index) => (
            <FavoriteItemCard
              key={`${item.id}-${index}`}
              item={item}
              onPress={() => handleItemPress(item)}
              onRemoveFavorite={() => handleRemoveFavorite(item)}
            />
          ))}
        </ScrollView>
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
    paddingBottom: SPACING.space_20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  emptySubtitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
});

export default FavoritesScreen;
