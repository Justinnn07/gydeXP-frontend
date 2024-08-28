import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Card = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVWcO882_V9Onmzyip5oPOzD0hMhegc8oiGg&s',
          }} // Replace with your image URL or local path
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>Aakarshan Saxena</Text>
        <Text style={styles.rating}>⭐ 4.5</Text>

        <View>
          <Text style={styles.detailsText}>Location: Jaipur</Text>
          <Text style={styles.detailsText}>
            Languages: Hindi, English, Telugu
          </Text>
          <Text style={styles.detailsText}>
            Specialities: Historical Tours, Cultural Walk
          </Text>
          <Text style={styles.detailsText}>Experience: 6+ Years</Text>
          <Text style={styles.detailsText}>Availability: 24/7</Text>
          <Text style={styles.tripsDone}>30+ Trips Done</Text>
          <Text style={styles.specialization}>Culture Nightlife Foods</Text>
          <Text style={styles.price}>₹ 1000 per hr</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2d2d2d', // Dark background
    borderRadius: 10,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  detailsContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White color for text
    marginBottom: 5,
  },
  rating: {
    color: '#FFD700', // Gold color for rating stars
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 14,
    color: '#ffffff', // White color for text
    marginBottom: 5,
  },
  tripsDone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  specialization: {
    fontSize: 14,
    color: '#ffffff',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
});

export default Card;
