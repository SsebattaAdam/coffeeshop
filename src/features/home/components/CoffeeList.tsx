import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import CoffeeCard from './CoffeeCard';
import { CoffeeItem } from '../../../core/store/types';
import { SPACING, FONTSIZE, FONTFAMILY, COLORS } from '../../../core/constants/theme/theme';


interface CoffeeListProps {
  data: CoffeeItem[];
  onCoffeePress: (item: CoffeeItem) => void;
  onFavoritePress: (item: CoffeeItem) => void;
}

const CoffeeList: React.FC<CoffeeListProps> = ({
  data,
  onCoffeePress,
  onFavoritePress,
}) => {
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No coffee found</Text>
      </View>
    );
  }

  // Render items in rows of 2
  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < data.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          <View style={styles.cardWrapper}>
            <CoffeeCard
              item={data[i]}
              onPress={() => onCoffeePress(data[i])}
              onFavoritePress={() => onFavoritePress(data[i])}
            />
          </View>
          {i + 1 < data.length && (
            <View style={styles.cardWrapper}>
              <CoffeeCard
                item={data[i + 1]}
                onPress={() => onCoffeePress(data[i + 1])}
                onFavoritePress={() => onFavoritePress(data[i + 1])}
              />
            </View>
          )}
        </View>,
      );
    }
    return rows;
  };

  return <View style={styles.container}>{renderRows()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SPACING.space_20,
    paddingBottom: SPACING.space_20,
  },
  row: {
    justifyContent: 'space-between',
    gap: SPACING.space_15,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '48%',
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

export default CoffeeList;

