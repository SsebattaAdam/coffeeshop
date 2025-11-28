import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Paystack from 'react-native-paystack-webview';
import {RootSiblingParent} from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS} from '../../../core/constants/theme/theme';
import {useAppDispatch} from '../../../core/store/hooks';
import {PAYSTACK_PUBLIC_KEY} from '../../../core/config/paystack';
import type {RootStackParamList} from '../../navigation/AppNavigator';

// Types
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Constants
const USD_TO_KES_RATE = 130; // 1 USD = 130 KES (adjust as needed)

interface BillingDetails {
  name: string;
  email: string;
  mobile: string;
}

const PaymentScreen = () => {
  // Navigation & Route
  const navigation = useNavigation<PaymentScreenNavigationProp>();

  const route = useRoute<PaymentScreenRouteProp>();
  const dispatch = useAppDispatch();
  const {totalAmount, cartItems} = route.params;

  // State
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    name: '',
    email: '',
    mobile: '',
  });
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Refs
  const paystackWebViewRef = useRef<any>(null);

  // Calculate amount in KES (cents) for Paystack
  const amountInKES = Math.round(totalAmount * USD_TO_KES_RATE * 100);

  // Handlers
  const handleInputChange = (text: string, field: keyof BillingDetails) => {
    setBillingDetails(prev => ({...prev, [field]: text}));
  };

  const validateForm = (): boolean => {
    if (!billingDetails.name || !billingDetails.email || !billingDetails.mobile) {
      Toast.show('Please fill in all fields', {
        duration: Toast.durations.LONG,
        backgroundColor: COLORS.primaryRedHex,
        textColor: COLORS.primaryWhiteHex,
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billingDetails.email)) {
      Toast.show('Please enter a valid email address', {
        duration: Toast.durations.LONG,
        backgroundColor: COLORS.primaryRedHex,
        textColor: COLORS.primaryWhiteHex,
      });
      return false;
    }

    return true;
  };

  const handlePay = () => {
    if (!validateForm()) return;

    // Programmatically trigger Paystack modal
    setTimeout(() => {
      try {
        const paystackComponent = paystackWebViewRef.current as any;
        if (paystackComponent?.setState) {
          paystackComponent.setState({showModal: true});
        }
      } catch (error) {
        console.error('Error triggering Paystack modal:', error);
        Toast.show('Failed to open payment. Please try again.', {
          duration: Toast.durations.LONG,
          backgroundColor: COLORS.primaryRedHex,
          textColor: COLORS.primaryWhiteHex,
        });
      }
    }, 100);
  };

  const handlePaymentCancel = () => {
    Toast.show('Transaction Cancelled', {
      duration: Toast.durations.LONG,
      backgroundColor: COLORS.primaryRedHex,
      textColor: COLORS.primaryWhiteHex,
    });
  };

  const handlePaymentSuccess = (transactionRef: string) => {
    const paymentData = {
      transactionRef,
      transactionStatus: 'success',
      amountPaid: amountInKES,
      amountInUSD: totalAmount,
      email: billingDetails.email,
      name: billingDetails.name,
      mobile: billingDetails.mobile,
    };

    console.log('Payment Details:', paymentData);

    // Hide payment button immediately
    setPaymentCompleted(true);

    // Clear cart
    dispatch({type: 'CLEAR_CART'});

    // Show success message
    Toast.show('Payment Successful! Order placed.', {
      duration: Toast.durations.LONG,
      backgroundColor: COLORS.primaryOrangeHex,
      textColor: COLORS.primaryWhiteHex,
    });

    // Navigate to Cart tab immediately
    setTimeout(() => {
      navigation.navigate('MainTabs', {screen: 'Cart'});
    }, 800);
  };

  return (
    <RootSiblingParent>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.summaryAmount}>$ {totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items</Text>
              <Text style={styles.summaryValue}>{cartItems.length} item(s)</Text>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentMethodCard}>
              <Text style={styles.paymentMethodText}> Mobile Money</Text>
              <Text style={styles.paymentMethodSubtext}>
                Pay securely with mobile money
              </Text>
            </View>
          </View>

          {/* Billing Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Billing Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={COLORS.primaryLightGreyHex}
              onChangeText={text => handleInputChange(text, 'name')}
              value={billingDetails.name}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={COLORS.primaryLightGreyHex}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => handleInputChange(text, 'email')}
              value={billingDetails.email}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor={COLORS.primaryLightGreyHex}
              keyboardType="phone-pad"
              onChangeText={text => handleInputChange(text, 'mobile')}
              value={billingDetails.mobile}
            />
          </View>

          {/* Pay Button - Hidden after payment success */}
          {!paymentCompleted && (
            <TouchableOpacity
              style={styles.payButton}
              onPress={handlePay}
              activeOpacity={0.8}>
              <Text style={styles.payButtonText}>
                Pay ${totalAmount.toFixed(2)} with Mobile Money
              </Text>
            </TouchableOpacity>
          )}

          {/* Hidden Paystack Component */}
          <View style={styles.paystackContainer}>
            <Paystack
              paystackKey={PAYSTACK_PUBLIC_KEY}
              billingEmail={billingDetails.email || 'user@example.com'}
              billingMobile={billingDetails.mobile}
              billingName={billingDetails.name}
              amount={amountInKES}
              onCancel={handlePaymentCancel}
              onSuccess={handlePaymentSuccess}
              ref={paystackWebViewRef}
              buttonText=""
              btnStyles={styles.hiddenButton}
              textStyles={styles.hiddenButtonText}
              ActivityIndicatorColor={COLORS.primaryOrangeHex}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollContent: {
    padding: SPACING.space_20,
    paddingBottom: SPACING.space_30,
  },
  section: {
    marginBottom: SPACING.space_20,
  },
  sectionTitle: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.space_10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryGreyHex,
  },
  summaryLabel: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
  summaryAmount: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
  },
  summaryValue: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  paymentMethodCard: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_15,
    padding: SPACING.space_15,
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
  },
  paymentMethodText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_4,
  },
  paymentMethodSubtext: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
  },
  input: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_15,
    marginBottom: SPACING.space_15,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
  },
  payButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_15,
    paddingVertical: SPACING.space_15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_20,
  },
  payButtonText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
  paystackContainer: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    width: 1,
    height: 1,
    overflow: 'hidden',
  },
  hiddenButton: {
    width: 1,
    height: 1,
    opacity: 0,
  },
  hiddenButtonText: {
    fontSize: 0,
    color: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_15,
    backgroundColor: COLORS.primaryBlackHex,
  },
  backButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: FONTSIZE.size_30,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
});

export default PaymentScreen;
