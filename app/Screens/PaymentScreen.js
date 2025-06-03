import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PaymentPage = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [email, setEmail] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  // Image URLs
  const paymentIcons = {
    visa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png',
    mastercard: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png',
    amex: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1024px-American_Express_logo.svg.png',
    paypal: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png',
    creditCard: 'https://cdn-icons-png.flaticon.com/512/179/179457.png',
    lock: 'https://cdn-icons-png.flaticon.com/512/61/61457.png',
    shield: 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png',
    checkmark: 'https://cdn-icons-png.flaticon.com/512/447/447147.png',
    pciDss: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/PCI_DSS_Logo.svg/1200px-PCI_DSS_Logo.svg.png',
    ssl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Verisign.png/220px-Verisign.png'
  };

  const handlePayment = () => {
    // if (!cardNumber || !cardName || !expiryDate || !cvv || !email) {
    //   Alert.alert('Missing Information', 'Please fill in all required fields to proceed with payment.');
    //   return;
    // }

    Alert.alert('Payment Successful', 'Your payment has been processed successfully!', [
      {
        text: 'Continue',
        onPress: () => navigation.navigate('OrderConfirmation'),
        style: 'default'
      }
    ]);
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    const formatted = !match[2] ? match[1] : `${match[1]} ${match[2]}${match[3] ? ` ${match[3]}` : ''}${match[4] ? ` ${match[4]}` : ''}`;
    setCardNumber(formatted);
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/(\d{0,2})(\d{0,2})/);
    const formatted = !match[2] ? match[1] : `${match[1]}/${match[2]}`;
    setExpiryDate(formatted);
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <View className="pt-14" /> {/* Added top padding for mobile display */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Progress */}
        <View className="px-6 py-6 bg-white shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center">
                <Text className="text-green-700 text-3xl font-bold text-center bottom-2">←</Text>
              </View>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-green-800">Payment Details</Text>
            <View className="w-8" />
          </View>

          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-sm text-green-700">Step 3 of 3</Text>
            <Text className="text-sm font-medium text-green-700">$135.59</Text>
          </View>

          <View className="w-full bg-green-100 rounded-full h-2">
            <View className="bg-green-600 rounded-full h-2" style={{ width: '100%' }} />
          </View>
        </View>

        {/* Order Summary Card */}
        <View className="mx-6 mt-6 bg-white rounded-xl shadow-md overflow-hidden">
          <View className="p-5 border-b border-green-100">
            <Text className="text-lg font-bold text-green-800">Order Summary</Text>
          </View>

          <View className="p-5 space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="font-medium">$120.00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Shipping</Text>
              <Text className="font-medium">$5.99</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Tax</Text>
              <Text className="font-medium">$9.60</Text>
            </View>

            <View className="h-px bg-green-100 my-2" />

            <View className="flex-row justify-between">
              <Text className="text-lg font-bold text-green-800">Total</Text>
              <Text className="text-lg font-bold text-green-600">$135.59</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View className="mx-6 mt-6 bg-white rounded-xl shadow-md overflow-hidden">
          <View className="p-5 border-b border-green-100">
            <Text className="text-lg font-bold text-green-800">Payment Method</Text>
          </View>

          <View className="p-5 flex-row space-x-4">
            <TouchableOpacity
              className={`flex-1 p-4 border rounded-lg ${selectedMethod === 'credit' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
              onPress={() => setSelectedMethod('credit')}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center">
                <View className={`w-6 h-6 rounded-full border-2 ${selectedMethod === 'credit' ? 'border-green-600 bg-green-600' : 'border-gray-300'} mr-3 flex items-center justify-center`}>
                  {selectedMethod === 'credit' && (
                    <View className="w-2 h-2 bg-white rounded-full" />
                  )}
                </View>
                <Text className="font-medium text-green-800">Credit Card</Text>
              </View>
              <View className="flex-row mt-4 space-x-2 justify-center">
                <Image source={{ uri: paymentIcons.visa }} className="w-12 h-8" style={{ resizeMode: 'contain' }} />
                <Image source={{ uri: paymentIcons.mastercard }} className="w-12 h-8" style={{ resizeMode: 'contain' }} />
                <Image source={{ uri: paymentIcons.amex }} className="w-12 h-8" style={{ resizeMode: 'contain' }} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 p-4 border rounded-lg ${selectedMethod === 'paypal' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
              onPress={() => setSelectedMethod('paypal')}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center">
                <View className={`w-6 h-6 rounded-full border-2 ${selectedMethod === 'paypal' ? 'border-green-600 bg-green-600' : 'border-gray-300'} mr-3 flex items-center justify-center`}>
                  {selectedMethod === 'paypal' && (
                    <View className="w-2 h-2 bg-white rounded-full" />
                  )}
                </View>
                <Text className="font-medium text-green-800">PayPal</Text>
              </View>
              <Image source={{ uri: paymentIcons.paypal }} className="w-full h-8 mt-4" style={{ resizeMode: 'contain' }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Credit Card Form */}
        {selectedMethod === 'credit' && (
          <View className="mx-6 mt-6 bg-white rounded-xl shadow-md overflow-hidden">
            <View className="p-5 border-b border-green-100">
              <Text className="text-lg font-bold text-green-800">Card Information</Text>
            </View>

            <View className="p-5 space-y-5">
              {/* Card Number */}
              <View>
                <Text className="text-sm font-medium text-green-700 mb-2">Card Number</Text>
                <View className="relative">
                  <TextInput
                    className="p-4 border border-gray-300 rounded-lg pl-14 text-lg"
                    placeholder="1234 5678 9012 3456"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={formatCardNumber}
                    maxLength={19}
                  />
                  <View className="absolute left-4 top-4">
                    <Image source={{ uri: paymentIcons.creditCard }} className="w-6 h-6" style={{ resizeMode: 'contain', tintColor: '#059669' }} />
                  </View>
                </View>
              </View>

              {/* Card Name */}
              <View>
                <Text className="text-sm font-medium text-green-700 mb-2">Name on Card</Text>
                <TextInput
                  className="p-4 border border-gray-300 rounded-lg text-lg"
                  placeholder="John Doe"
                  value={cardName}
                  onChangeText={setCardName}
                />
              </View>

              {/* Expiry and CVV */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-sm font-medium text-green-700 mb-2">Expiry Date</Text>
                  <TextInput
                    className="p-4 border border-gray-300 rounded-lg text-lg"
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    value={expiryDate}
                    onChangeText={formatExpiryDate}
                    maxLength={5}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-green-700 mb-2">CVV</Text>
                  <View className="relative">
                    <TextInput
                      className="p-4 border border-gray-300 rounded-lg text-lg pr-14"
                      placeholder="•••"
                      keyboardType="numeric"
                      secureTextEntry={true}
                      value={cvv}
                      onChangeText={setCvv}
                      maxLength={4}
                    />
                    <View className="absolute right-4 top-4 flex-row items-center">
                      <Image source={{ uri: paymentIcons.lock }} className="w-4 h-4 mr-1" style={{ resizeMode: 'contain', tintColor: '#059669' }} />
                      <Text className="text-xs text-green-600">Secure</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Save Card */}
              <View className="flex-row items-center mt-2">
                <TouchableOpacity
                  onPress={() => setSaveCard(!saveCard)}
                  className="mr-3"
                  activeOpacity={0.7}
                >
                  <View className={`w-6 h-6 rounded border-2 ${saveCard ? 'bg-green-600 border-green-600' : 'border-gray-300'} flex items-center justify-center`}>
                    {saveCard && (
                      <Image source={{ uri: paymentIcons.checkmark }} className="w-3 h-3" style={{ resizeMode: 'contain', tintColor: 'white' }} />
                    )}
                  </View>
                </TouchableOpacity>
                <Text className="text-sm text-gray-600">Save card for future payments</Text>
              </View>
            </View>
          </View>
        )}

        {/* Email Section */}
        <View className="mx-6 mt-6 bg-white rounded-xl shadow-md overflow-hidden">
          <View className="p-5 border-b border-green-100">
            <Text className="text-lg font-bold text-green-800">Contact Information</Text>
          </View>
          <View className="p-5">
            <Text className="text-sm font-medium text-green-700 mb-2">Email Address</Text>
            <TextInput
              className="p-4 border border-gray-300 rounded-lg text-lg"
              placeholder="your@email.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Text className="mt-2 text-xs text-green-600">Receipt will be sent to this email</Text>
          </View>
        </View>

        {/* Security Assurance */}
        {/* <View className="mx-6 mt-6 p-5 bg-green-50 rounded-xl flex-row items-start">
          <Image source={{ uri: paymentIcons.shield }} className="w-6 h-6 mr-3 mt-1" style={{ resizeMode: 'contain', tintColor: '#059669' }} />
          <View className="flex-1">
            <Text className="font-medium text-green-800 mb-1">Secure Payment Guaranteed</Text>
            <Text className="text-sm text-green-700">
              Your payment information is encrypted and processed securely. We don't store your credit card details.
            </Text>
            <View className="flex-row mt-4 space-x-4">
              <Image source={{ uri: paymentIcons.pciDss }} className="w-16 h-12" style={{ resizeMode: 'contain' }} />
              <Image source={{ uri: paymentIcons.ssl }} className="w-16 h-12" style={{ resizeMode: 'contain' }} />
            </View>
          </View>
        </View> */}

        {/* Terms */}
        <View className="px-6 mt-6">
          <Text className="text-xs text-gray-500 text-center">
            By completing your purchase, you agree to our{' '}
            <Text className="text-green-600 font-medium">Terms of Service</Text> and{' '}
            <Text className="text-green-600 font-medium">Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>

      {/* Payment Footer */}
      <View className="px-6 py-4 bg-white border-t border-green-100 shadow-lg">
        <TouchableOpacity
          className="bg-green-600 py-4 rounded-xl flex-row items-center justify-center shadow-md"
          onPress={handlePayment}
          activeOpacity={0.9}
        >
          <Text className="text-white font-bold text-lg">Pay $135.59</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentPage;