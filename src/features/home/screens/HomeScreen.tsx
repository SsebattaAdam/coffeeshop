import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../../core/constants/theme/theme';
import DynamicHeader from '../../../core/components/DynamicHeader';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import CoffeeList from '../components/CoffeeList';
import {useAppSelector, useAppDispatch} from '../../../core/store/hooks';
import {getCategoriesFromData, filterDataByCategory, searchData} from '../utils/helpers';
import type {CoffeeItem} from '../../../core/store/types';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  // Get data from Redux store
  const coffeeList = useAppSelector(state => state.coffee.coffeeList);
  const beanList = useAppSelector(state => state.beans.beansList);

  // State management
  const [searchText, setSearchText] = useState('');
  const [categories] = useState(() => getCategoriesFromData(coffeeList));
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0] || 'All',
  });

  // Filter and search coffee data
  const sortedCoffee = useMemo(() => {
    let filtered = filterDataByCategory(
      coffeeList,
      categoryIndex.category,
    );
    filtered = searchData(filtered, searchText);
    return filtered;
  }, [coffeeList, categoryIndex.category, searchText]);

  // Handlers
  const handleCategoryChange = (index: number, category: string) => {
    setCategoryIndex({index, category});
  };

  const handleCoffeePress = (item: CoffeeItem) => {
    // Navigate to coffee details screen
    console.log('Coffee pressed:', item.name);
    // navigation.navigate('CoffeeDetails', { coffee: item });
  };

  const handleFavoritePress = (item: CoffeeItem) => {
    // Toggle favorite
    dispatch({type: 'TOGGLE_COFFEE_FAVORITE', payload: item.id});
  };

  return (
    <View style={styles.container}>
      <DynamicHeader
        leftIcon={{
          name: 'menu',
          onPress: () => {
            console.log('Menu pressed');
            // Add menu navigation logic here
          },
        }}
        rightIcon={{
          name: 'cart',
          onPress: () => {
            console.log('Cart pressed');
            // Add cart navigation logic here
          },
        }}
        title={null}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Find the best</Text>
          <Text style={styles.titleText}>coffee for you</Text>
        </View>

        {/* Search Bar */}
        <SearchBar
          searchText={searchText}
          onChangeText={setSearchText}
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          categoryIndex={categoryIndex}
          onCategoryChange={handleCategoryChange}
        />

        {/* Coffee List */}
        <CoffeeList
          data={sortedCoffee}
          onCoffeePress={handleCoffeePress}
          onFavoritePress={handleFavoritePress}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  titleContainer: {
    paddingHorizontal: SPACING.space_20,
    paddingTop: SPACING.space_20,
    paddingBottom: SPACING.space_10,
  },
  titleText: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    lineHeight: FONTSIZE.size_28 * 1.2,
  },
});

export default HomeScreen;
