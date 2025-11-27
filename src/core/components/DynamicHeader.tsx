import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import CustomIcon from './customIcon';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme/theme';

interface DynamicHeaderProps {
  leftIcon?: {
    name: string;
    onPress: () => void;
    color?: string;
    size?: number;
  };
  rightIcon?: {
    name: string;
    onPress: () => void;
    color?: string;
    size?: number;
  };
  title?: string | null;
  backgroundColor?: string;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({
  leftIcon,
  rightIcon,
  title,
  backgroundColor = COLORS.primaryDarkGreyHex,
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}]}>
      <View style={styles.container}>
        {/* Left Icon */}
        <View style={styles.leftContainer}>
          {leftIcon ? (
            <TouchableOpacity
              onPress={leftIcon.onPress}
              style={styles.iconButton}
              activeOpacity={0.7}>
              <CustomIcon
                name={leftIcon.name}
                size={leftIcon.size || 24}
                color={leftIcon.color || COLORS.primaryWhiteHex}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>

        {/* Center Title */}
        <View style={styles.centerContainer}>
          {title ? (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
        </View>

        {/* Right Icon */}
        <View style={styles.rightContainer}>
          {rightIcon ? (
            <TouchableOpacity
              onPress={rightIcon.onPress}
              style={styles.iconButton}
              activeOpacity={0.7}>
              <CustomIcon
                name={rightIcon.name}
                size={rightIcon.size || 24}
                color={rightIcon.color || COLORS.primaryWhiteHex}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    paddingHorizontal: SPACING.space_15,
    backgroundColor: 'transparent',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.space_8,
  },
  title: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
  },
});

export default DynamicHeader;

