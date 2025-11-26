import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import CustomIcon from '../../../core/components/customIcon';
import { FONTSIZE, COLORS, SPACING, FONTFAMILY } from '../../../core/constants/theme/theme';

interface SearchBarProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onSearchPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onChangeText,
  onSearchPress,
}) => {
  return (
    <View style={styles.InputContainerComponent}>
      <TouchableOpacity
        onPress={onSearchPress || (() => {})}
        activeOpacity={0.7}>
        <CustomIcon
          style={styles.InputIcon}
          name="search"
          size={FONTSIZE.size_18}
          color={
            searchText.length > 0
              ? COLORS.primaryOrangeHex
              : COLORS.primaryLightGreyHex
          }
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Find Your Coffee.."
        value={searchText}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.TextInputContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_20,
    borderRadius: SPACING.space_20,
    backgroundColor: COLORS.primaryGreyHex,
    alignItems: 'center',
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_15,
  },
  InputIcon: {
    marginHorizontal: SPACING.space_10,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
});

export default SearchBar;

