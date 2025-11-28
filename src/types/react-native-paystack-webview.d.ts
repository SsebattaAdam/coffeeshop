declare module 'react-native-paystack-webview' {
  import {Component} from 'react';
  import {ViewStyle, TextStyle} from 'react-native';

  export interface PaystackProps {
    paystackKey: string;
    billingEmail: string;
    billingMobile?: string;
    billingName?: string;
    amount: number;
    ActivityIndicatorColor?: string;
    onCancel: (e: any) => void;
    onSuccess: (res: any) => void;
    buttonText?: string;
    btnStyles?: ViewStyle;
    textStyles?: TextStyle;
    channels?: string[];
    ref?: any;
  }

  export default class Paystack extends Component<PaystackProps> {}
}

