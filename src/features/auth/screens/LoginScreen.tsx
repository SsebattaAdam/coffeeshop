import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS} from '../../../core/constants/theme/theme';
import {userAuth} from '../repositry/authContextProvider';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const {login, signup, isLoading} = userAuth();

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </Text>
        <Text style={styles.subtitle}>
          {isSignup
            ? 'Sign up to continue'
            : 'Sign in to your account'}
        </Text>

        {isSignup && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={COLORS.primaryLightGreyHex}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.primaryLightGreyHex}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.primaryLightGreyHex}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={COLORS.primaryWhiteHex} />
          ) : (
            <Text style={styles.buttonText}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsSignup(!isSignup)}>
          <Text style={styles.switchText}>
            {isSignup
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.space_24,
  },
  title: {
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_32,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    paddingHorizontal: SPACING.space_16,
    marginBottom: SPACING.space_16,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  button: {
    height: 50,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.space_10,
  },
  buttonText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  switchButton: {
    marginTop: SPACING.space_20,
    alignItems: 'center',
  },
  switchText: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
});

export default LoginScreen;

