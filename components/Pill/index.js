import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'; // Assuming you're using Expo and FontAwesome for the clock icon

const PillButton = () => {
  return (
    <TouchableOpacity style={styles.pillButton}>
      <Image style={styles.icon} source={require('../../assets/clock.png')} />
      <Text style={styles.buttonText}>Gyde Now</Text>
      <Image
        style={{
          marginLeft: 4,
        }}
        source={require('../../assets/down.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 38, 42, 1)', // Background color for the pill
    borderRadius: 20, // Makes the button pill-shaped
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 2, // Shadow blur radius
    elevation: 2, // For Android shadow
    padding: 10,
    width: 130,
  },
  icon: {
    marginRight: 8, // Space between the icon and text
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  chevron: {
    marginLeft: 8, // Space between text and chevron icon
  },
});

export default PillButton;
