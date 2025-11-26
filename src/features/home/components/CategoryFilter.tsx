import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SPACING, FONTSIZE, FONTFAMILY, COLORS } from '../../../core/constants/theme/theme';

interface CategoryFilterProps {
  categories: string[];
  categoryIndex: {
    index: number;
    category: string;
  };
  onCategoryChange: (index: number, category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  categoryIndex,
  onCategoryChange,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.categoryItem}
            onPress={() => onCategoryChange(index, category)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.categoryText,
                categoryIndex.index === index && styles.categoryTextActive,
              ]}>
              {category}
            </Text>
            {categoryIndex.index === index && (
              <View style={styles.activeIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.space_20,
  },
  scrollViewContent: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_15,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: SPACING.space_15,
  },
  categoryText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  categoryTextActive: {
    color: COLORS.primaryOrangeHex,
  },
  activeIndicator: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    borderRadius: SPACING.space_15,
    backgroundColor: COLORS.primaryOrangeHex,
  },
});

export default CategoryFilter;

