// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Animated,
//   Easing,
//   Dimensions
// } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as LocalAuthentication from 'expo-local-authentication';
// import { Ionicons } from '@expo/vector-icons';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import * as Facebook from 'expo-auth-session/providers/facebook';
// import { ResponseType } from 'expo-auth-session';
// import { LinearGradient } from 'expo-linear-gradient';

// WebBrowser.maybeCompleteAuthSession();

// const { width, height } = Dimensions.get('window');

// const loginSchema = z.object({
//   email: z.string().email('Invalid email address').min(1, 'Email is required'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string().min(6, 'Password must be at least 6 characters')
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"]
// });

// const SignPage = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [socialLoading, setSocialLoading] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
//   const [shakeAnimation] = useState(new Animated.Value(0));
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [slideAnim] = useState(new Animated.Value(height * 0.3));

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: 'YOUR_GOOGLE_CLIENT_ID',
//     iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID',
//     androidClientId: 'YOUR_GOOGLE_ANDROID_CLIENT_ID',
//     responseType: ResponseType.Token,
//   });

//   const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
//     clientId: 'YOUR_FACEBOOK_APP_ID',
//   });

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setError,
//     watch
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//       confirmPassword: ''
//     }
//   });

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         friction: 8,
//         useNativeDriver: true,
//       })
//     ]).start();
//   }, []);

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response;
//       handleSocialLoginSuccess('Google', authentication.accessToken);
//     } else if (response?.type === 'error') {
//       Alert.alert('Google Login Failed', response.error.message);
//       setSocialLoading(null);
//     }
//   }, [response]);

//   useEffect(() => {
//     if (fbResponse?.type === 'success') {
//       const { authentication } = fbResponse;
//       handleSocialLoginSuccess('Facebook', authentication.accessToken);
//     } else if (fbResponse?.type === 'error') {
//       Alert.alert('Facebook Login Failed', fbResponse.error.message);
//       setSocialLoading(null);
//     }
//   }, [fbResponse]);

//   useEffect(() => {
//     checkBiometricSupport();
//   }, []);

//   const checkBiometricSupport = async () => {
//     const compatible = await LocalAuthentication.hasHardwareAsync();
//     const enrolled = await LocalAuthentication.isEnrolledAsync();
//     setIsBiometricAvailable(compatible && enrolled);
//   };

//   const handleBiometricAuth = async () => {
//     try {
//       const result = await LocalAuthentication.authenticateAsync({
//         promptMessage: 'Authenticate to login',
//         fallbackLabel: 'Enter password instead',
//       });

//       if (result.success) {
//         navigation.navigate('Dashboard');
//       }
//     } catch (error) {
//       Alert.alert('Authentication Failed', error.message || 'Biometric login failed');
//     }
//   };

//   const handleLogin = async (data) => {
//     setIsLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       navigation.navigate('Dashboard');
//     } catch (error) {
//       setError('password', { message: 'Invalid email or password' });
//       triggerShakeAnimation();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSocialLoginSuccess = async (provider, token) => {
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       navigation.navigate('Dashboard');
//     } catch (error) {
//       Alert.alert(`${provider} Login Failed`, error.message || 'Something went wrong');
//     } finally {
//       setSocialLoading(null);
//     }
//   };

//   const handleAppleLogin = async () => {
//     if (Platform.OS !== 'ios') {
//       Alert.alert('Apple Login', 'Apple login is only available on iOS devices');
//       return;
//     }

//     setSocialLoading('Apple');
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       navigation.navigate('Dashboard');
//     } catch (error) {
//       Alert.alert('Apple Login Failed', error.message || 'Something went wrong');
//     } finally {
//       setSocialLoading(null);
//     }
//   };

//   const triggerShakeAnimation = () => {
//     Animated.sequence([
//       Animated.timing(shakeAnimation, {
//         toValue: 10,
//         duration: 50,
//         easing: Easing.linear,
//         useNativeDriver: true
//       }),
//       Animated.timing(shakeAnimation, {
//         toValue: -10,
//         duration: 50,
//         useNativeDriver: true
//       }),
//       Animated.timing(shakeAnimation, {
//         toValue: 10,
//         duration: 50,
//         useNativeDriver: true
//       }),
//       Animated.timing(shakeAnimation, {
//         toValue: 0,
//         duration: 50,
//         useNativeDriver: true
//       }),
//     ]).start();
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         className="flex-1"
//       >
//         <LinearGradient
//           colors={['#f7f7f7', '#e8f5e9']}
//           className="absolute left-0 right-0 top-0 h-full"
//         />

//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Hero Section */}
//           <Animated.View
//             className="h-96 relative"
//             style={{ opacity: fadeAnim }}
//           >
//             <Image
//               source={{ uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
//               className="w-full h-full absolute"
//               resizeMode="cover"
//             />
//             <LinearGradient
//               colors={['rgba(0,0,0,0.7)', 'transparent']}
//               className="absolute left-0 right-0 top-0 h-full"
//             />
//             <View className="absolute bottom-0 left-0 right-0 p-6">
//               <Text className="text-3xl font-bold text-white mb-11">Welcome Back to Rochin Landscape</Text>
              
//             </View>
//           </Animated.View>

//           {/* Form Section */}
//           <Animated.View
//             className="bg-white rounded-t-3xl px-6 pt-6 -mt-8 shadow-lg"
//             style={{
//               transform: [{ translateX: shakeAnimation }, { translateY: slideAnim }],
//               opacity: fadeAnim,
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: -4 },
//               shadowOpacity: 0.1,
//               shadowRadius: 20,
//               elevation: 10,
//             }}
//           >
//             <View className="flex-row items-center justify-center mb-6">
//               <Ionicons name="log-in" size={24} color="#4CAF50" className="mr-2" />
//               <Text className="text-2xl font-bold text-gray-800">Create your account</Text>
//             </View>

//             {/* Email Input */}
//             <View className="mb-5">
//               <Text className="text-sm font-medium text-gray-600 mb-2">Email Address</Text>
//               <Controller
//                 control={control}
//                 name="email"
//                 render={({ field: { onChange, onBlur, value } }) => (
//                   <View>
//                     <View className={`flex-row items-center bg-gray-50 rounded-xl px-4 ${errors.email ? 'border border-red-500' : ''}`}>
//                       <TextInput
//                         className="flex-1 h-12 text-gray-800 text-base"
//                         placeholder="Enter your email"
//                         placeholderTextColor="#9CA3AF"
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                       />
//                       {errors.email && (
//                         <Ionicons
//                           name="alert-circle"
//                           size={20}
//                           color="#EF4444"
//                           className="absolute right-4"
//                         />
//                       )}
//                     </View>
//                     {errors.email && (
//                       <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</Text>
//                     )}
//                   </View>
//                 )}
//               />
//             </View>

//             {/* Password Input */}
//             <View className="mb-5">
//               <Text className="text-sm font-medium text-gray-600 mb-2">Password</Text>
//               <Controller
//                 control={control}
//                 name="password"
//                 render={({ field: { onChange, onBlur, value } }) => (
//                   <View>
//                     <View className={`flex-row items-center bg-gray-50 rounded-xl px-4 ${errors.password ? 'border border-red-500' : ''}`}>
//                       <TextInput
//                         className="flex-1 h-12 text-gray-800 text-base pr-12"
//                         placeholder="Enter your password"
//                         placeholderTextColor="#9CA3AF"
//                         secureTextEntry={!showPassword}
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                       />
//                       <TouchableOpacity
//                         className="absolute right-4"
//                         onPress={() => setShowPassword(!showPassword)}
//                       >
//                         <Ionicons
//                           name={showPassword ? "eye-off-outline" : "eye-outline"}
//                           size={20}
//                           color="#9CA3AF"
//                         />
//                       </TouchableOpacity>
//                       {errors.password && (
//                         <Ionicons
//                           name="alert-circle"
//                           size={20}
//                           color="#EF4444"
//                           className="absolute right-12"
//                         />
//                       )}
//                     </View>
//                     {errors.password && (
//                       <Text className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</Text>
//                     )}
//                   </View>
//                 )}
//               />
//             </View>

//             {/* Confirm Password Input */}
//             <View className="mb-5">
//               <Text className="text-sm font-medium text-gray-600 mb-2">Confirm Password</Text>
//               <Controller
//                 control={control}
//                 name="confirmPassword"
//                 render={({ field: { onChange, onBlur, value } }) => (
//                   <View>
//                     <View className={`flex-row items-center bg-gray-50 rounded-xl px-4 ${errors.confirmPassword ? 'border border-red-500' : ''}`}>
//                       <TextInput
//                         className="flex-1 h-12 text-gray-800 text-base pr-12"
//                         placeholder="Re-enter your password"
//                         placeholderTextColor="#9CA3AF"
//                         secureTextEntry={!showConfirmPassword}
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                       />
//                       <TouchableOpacity
//                         className="absolute right-4"
//                         onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                       >
//                         <Ionicons
//                           name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
//                           size={20}
//                           color="#9CA3AF"
//                         />
//                       </TouchableOpacity>
//                       {errors.confirmPassword && (
//                         <Ionicons
//                           name="alert-circle"
//                           size={20}
//                           color="#EF4444"
//                           className="absolute right-12"
//                         />
//                       )}
//                     </View>
//                     {errors.confirmPassword && (
//                       <Text className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</Text>
//                     )}
//                   </View>
//                 )}
//               />
//             </View>

//             {/* Sign Up Button */}
//             <TouchableOpacity
//               className={`bg-green-500 rounded-xl h-12 justify-center items-center mb-4 overflow-hidden ${isLoading ? 'opacity-80' : ''}`}
//               onPress={handleSubmit(handleLogin)}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#ffffff" size="small" />
//               ) : (
//                 <Text className="text-white text-base font-semibold">Sign Up</Text>
//               )}
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.3)', 'transparent']}
//                 className="absolute top-0 left-0 right-0 bottom-0"
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//               />
//             </TouchableOpacity>

//             {/* Biometric Login */}
//             {isBiometricAvailable && (
//               <TouchableOpacity
//                 className="flex-row justify-center items-center p-3 bg-gray-100 rounded-xl mb-6"
//                 onPress={handleBiometricAuth}
//               >
//                 <Image
//                   source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10695/10695418.png' }}
//                   className="w-6 h-6 mr-2"
//                   resizeMode="contain"
//                 />
//                 <Text className="text-green-500 font-medium text-sm">Use Biometric Login</Text>
//               </TouchableOpacity>
//             )}

//             {/* Divider */}
//             <View className="flex-row items-center mb-6">
//               <View className="flex-1 h-px bg-gray-200" />
//               <Text className="mx-3 text-gray-500 text-xs">OR REGISTER WITH</Text>
//               <View className="flex-1 h-px bg-gray-200" />
//             </View>

//             {/* Social Login Buttons */}
//             <View className="flex-row justify-between mb-6">
//               <TouchableOpacity
//                 className={`flex-1 mx-2 p-3 bg-white rounded-xl flex-row justify-center items-center ${socialLoading === 'Google' ? 'opacity-70' : ''}`}
//                 onPress={() => {
//                   setSocialLoading('Google');
//                   promptAsync();
//                 }}
//                 disabled={!!socialLoading}
//               >
//                 {socialLoading === 'Google' ? (
//                   <ActivityIndicator size="small" color="#3b82f6" />
//                 ) : (
//                   <>
//                     <Image
//                       source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
//                       className="w-5 h-5 mr-2"
//                     />
//                     <Text className="text-gray-600 text-sm">Google</Text>
//                   </>
//                 )}
//               </TouchableOpacity>

//               <TouchableOpacity
//                 className={`flex-1 mx-2 p-3 bg-white rounded-xl flex-row justify-center items-center ${socialLoading === 'Facebook' ? 'opacity-70' : ''}`}
//                 onPress={() => {
//                   setSocialLoading('Facebook');
//                   fbPromptAsync();
//                 }}
//                 disabled={!!socialLoading}
//               >
//                 {socialLoading === 'Facebook' ? (
//                   <ActivityIndicator size="small" color="#3b82f6" />
//                 ) : (
//                   <>
//                     <Image
//                       source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' }}
//                       className="w-5 h-5 mr-2"
//                     />
//                     <Text className="text-gray-600 text-sm">Facebook</Text>
//                   </>
//                 )}
//               </TouchableOpacity>

//               <TouchableOpacity
//                 className={`flex-1 mx-2 p-3 bg-white rounded-xl flex-row justify-center items-center ${socialLoading === 'Apple' ? 'opacity-70' : ''}`}
//                 onPress={handleAppleLogin}
//                 disabled={!!socialLoading}
//               >
//                 {socialLoading === 'Apple' ? (
//                   <ActivityIndicator size="small" color="#000000" />
//                 ) : (
//                   <>
//                     <Image
//                       source={{ uri: 'https://cdn-icons-png.flaticon.com/512/731/731985.png' }}
//                       className="w-5 h-5 mr-2"
//                     />
//                     <Text className="text-gray-600 text-sm">Apple</Text>
//                   </>
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* Sign In Link */}
//             <View className="flex-row justify-center mb-8">
//               <Text className="text-gray-500 text-sm">Already have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                 <Text className="text-green-500 font-semibold text-sm">Sign In</Text>
//               </TouchableOpacity>
//             </View>
//           </Animated.View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default SignPage;





import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
  Dimensions,
  StyleSheet
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TENANT_CONFIG } from '../config/constants';
const { width, height } = Dimensions.get('window');

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

const SignPage = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(height * 0.3));

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'customer',
    }
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      const requestData = {
        ...data,
        role: 'customer'
      };

      const headers = {
        'Content-Type': 'application/json',
        'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
        'X-Tenant-ID': TENANT_CONFIG.ID
      };

      const response = await fetch(`${TENANT_CONFIG.API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }

      Alert.alert(
        'Registration Successful',
        'Please check your email to set your password.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed',
        error.message || 'Please contact support if this continues'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <LinearGradient
          colors={['#f7f7f7', '#e8f5e9']}
          style={styles.background}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section - Takes 70% of screen height */}
          <Animated.View
            style={[styles.heroContainer, { opacity: fadeAnim }]}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'transparent']}
              style={styles.imageOverlay}
            />
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroText}>Create Your Account</Text>
            </View>
          </Animated.View>

          {/* Form Section - Takes remaining space and sticks to bottom */}
          <Animated.View
            style={[styles.formContainer, {
              transform: [{ translateX: shakeAnimation }, { translateY: slideAnim }],
              opacity: fadeAnim,
            }]}
          >
            <View style={styles.formHeader}>
              <Ionicons name="person-add" size={24} color="#4CAF50" style={styles.formIcon} />
              <Text style={styles.formTitle}>Register</Text>
            </View>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                      <TextInput
                        style={styles.inputField}
                        placeholder="Enter your full name"
                        placeholderTextColor="#9CA3AF"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.name && (
                        <Ionicons
                          name="alert-circle"
                          size={20}
                          color="#EF4444"
                          style={styles.errorIcon}
                        />
                      )}
                    </View>
                    {errors.name && (
                      <Text style={styles.errorText}>{errors.name.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                      <TextInput
                        style={styles.inputField}
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.email && (
                        <Ionicons
                          name="alert-circle"
                          size={20}
                          color="#EF4444"
                          style={styles.errorIcon}
                        />
                      )}
                    </View>
                    {errors.email && (
                      <Text style={styles.errorText}>{errors.email.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <View style={[styles.inputWrapper, errors.phone && styles.inputError]}>
                      <TextInput
                        style={styles.inputField}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="phone-pad"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.phone && (
                        <Ionicons
                          name="alert-circle"
                          size={20}
                          color="#EF4444"
                          style={styles.errorIcon}
                        />
                      )}
                    </View>
                    {errors.phone && (
                      <Text style={styles.errorText}>{errors.phone.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit(handleRegister)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'transparent']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  heroContainer: {
    height: height * 0.5, // 70% of screen height
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  heroTextContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    padding: 24,
  },
  heroText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginTop: -32, // Pull up to overlap hero section
    minHeight: height * 0.4, // Minimum 40% of screen height
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  formIcon: {
    marginRight: 8,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  inputField: {
    flex: 1,
    height: 48,
    color: '#1F2937',
    fontSize: 16,
  },
  errorIcon: {
    position: 'absolute',
    right: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  signInText: {
    color: '#6B7280',
    fontSize: 14,
  },
  signInLink: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default SignPage;