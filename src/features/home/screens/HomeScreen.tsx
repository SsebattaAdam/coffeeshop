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
import BeansList from '../components/BeansList';
import {useAppSelector, useAppDispatch} from '../../../core/store/hooks';
import {getCategoriesFromData, filterDataByCategory, searchData} from '../utils/helpers';
import type {CoffeeItem} from '../../../core/store/types';
import type {BeanItem} from '../../../core/store/types';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
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

  // Filter beans data (beans don't need category filtering, just search)
  const sortedBeans = useMemo(() => {
    return searchData(beanList, searchText);
  }, [beanList, searchText]);

  // Handlers
  const handleCategoryChange = (index: number, category: string) => {
    setCategoryIndex({index, category});
  };


  const handleCoffeePress = (item: CoffeeItem) => {
    // Navigate to coffee details screen
    navigation.navigate('CoffeeDetails', { coffee: item });
  };

  const handleCoffeeFavoritePress = (item: CoffeeItem) => {
    // Toggle favorite
    dispatch({type: 'TOGGLE_COFFEE_FAVORITE', payload: item.id});
  };

  const handleBeanPress = (item: BeanItem) => {
    // Navigate to coffee details screen (can reuse the same screen)
    navigation.navigate('CoffeeDetails', { coffee: item as any });
  };

  const handleBeanFavoritePress = (item: BeanItem) => {
    // Toggle favorite
    dispatch({type: 'TOGGLE_BEAN_FAVORITE', payload: item.id});
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
          name: 'user',
          onPress: () => {
            console.log('Profile pressed');
            // Add profile navigation logic here
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
          onFavoritePress={handleCoffeeFavoritePress}
        />

        {/* Coffee Beans Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Coffee beans</Text>
          <BeansList
            data={sortedBeans}
            onBeanPress={handleBeanPress}
            onFavoritePress={handleBeanFavoritePress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    marginBottom: 70
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  titleContainer: {
    paddingHorizontal: SPACING.space_15,
    paddingTop: SPACING.space_10,
    paddingBottom: SPACING.space_8,
  },
  titleText: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    lineHeight: FONTSIZE.size_20 * 1.1,
  },
  sectionContainer: {
    marginTop: SPACING.space_12,
    paddingBottom: SPACING.space_15,
  },
  sectionTitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingHorizontal: SPACING.space_15,
    marginBottom: SPACING.space_10,
  },
});

export default HomeScreen;
