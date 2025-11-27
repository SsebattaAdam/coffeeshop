import React from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';

import CoffeeCard from './CoffeeCard';
import { BeanItem } from '../../../core/store/types';
import { SPACING, FONTSIZE, FONTFAMILY, COLORS } from '../../../core/constants/theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface BeansListProps {
  data: BeanItem[];
  onBeanPress: (item: BeanItem) => void;
  onFavoritePress: (item: BeanItem) => void;
}

const BeansList: React.FC<BeansListProps> = ({
  data,
  onBeanPress,
  onFavoritePress,
}) => {
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No beans found</Text>
      </View>
    );
  }

  // Calculate card width to show 2 cards with spacing
  const cardWidth = (SCREEN_WIDTH - SPACING.space_15 * 3) / 2; // Screen width - (left padding + right padding + middle gap) / 2

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}>
      {data.map((item, index) => (
        <View
          key={item.id || index}
          style={[styles.cardWrapper, { width: cardWidth }]}>
          <CoffeeCard
            item={item as any}
            onPress={() => onBeanPress(item)}
            onFavoritePress={() => onFavoritePress(item)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_8,
    gap: SPACING.space_12,
  },
  cardWrapper: {
    marginRight: SPACING.space_12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.space_30,
  },
  emptyText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryLightGreyHex,
  },
});

export default BeansList;

