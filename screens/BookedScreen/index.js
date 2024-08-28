import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const BookedScreen = () => {
  const [countdown, setCountdown] = useState(5);

  const navigation = useNavigation();
  const {params} = useRoute();
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer]}>
        <Image source={require('../../assets/success.png')} />
      </View>

      <Text style={styles.title}>Your Guide is booked</Text>
      <Text style={styles.subtitle}>
        Thank you for patronizing us today.
        {'\n'}
        Your guide will be added to your chats.
      </Text>

      <Text style={styles.guideName}>{params.name}</Text>
      <Text style={styles.guideTitle}>Guide Name</Text>

      <Text style={styles.redirectText}>
        Redirecting you in {countdown} secs
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* Handle go back action */
        }}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            navigation.goBack();
          }}>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  guideName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgba(237, 193, 106, 1)',
    marginBottom: 5,
  },
  guideTitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  redirectText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(237, 193, 106, 1)',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default BookedScreen;
