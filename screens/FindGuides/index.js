import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import PillButton from '../../components/Pill';
import {FloatingAction} from 'react-native-floating-action';
import useCurrentLocation from '../../Hooks/useCurrentLocation';
import {useNavigation, useRoute} from '@react-navigation/native';
import useWebSocket from '../../Hooks/useWebSocket';

const darkModeJSON = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];
const FindGuides = () => {
  const refRBSheet = useRef();
  const floatingButtonRef = useRef();
  const [findGydes, setFindGydes] = useState(false);
  const [gyde, setGyde] = useState({});

  const navigation = useNavigation();

  const {params} = useRoute();

  const {location, gydeLocations} = useCurrentLocation(params);

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Bottom Sheet */}

      <RBSheet
        ref={refRBSheet}
        onClose={() => {
          // refRBSheet.current.close();
          floatingButtonRef.current.animateButton();
          setFindGydes(false);
        }}
        customStyles={{
          wrapper: styles.rbSheetWrapper,
          draggableIcon: styles.rbSheetDraggableIcon,
          container: styles.rbSheetContainer,
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={styles.sheetContent}>
          <View style={styles.pillButtonContainer}>
            <PillButton />
          </View>

          {findGydes ? (
            <View></View>
          ) : (
            <View style={styles.locationButtonContainer}>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.locationButton}>
                <View style={styles.locationIconContainer}>
                  <Image
                    source={require('../../assets/location.png')}
                    width={15}
                    height={19}
                  />
                </View>

                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationText}>Your Current Location</Text>
                  <Text style={styles.locationSubText}>
                    6+ Guides Available
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(237, 193, 106, 1)',
                  width: '100%',
                  marginTop: 20,
                  padding: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                  }}>
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </RBSheet>

      {/* MapView */}
      <MapView
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        customMapStyle={darkModeJSON}
        style={styles.map}
        showsUserLocation
        showsCompass
        showsBuildings>
        {gydeLocations?.latitude && !params.gyde && (
          <Marker
            coordinate={{
              ...gydeLocations,
            }}
            onPress={() => {
              navigation.navigate('BookedScreen', gydeLocations?.user);
            }}
            // width={200}
            // height={200}
            image={require('../../assets/userBubble.png')}
          />
        )}
      </MapView>

      <FloatingAction
        ref={floatingButtonRef}
        showBackground={false}
        onOpen={() => {
          refRBSheet.current.open();
        }}
        color="rgba(143, 143, 143, 1)"
      />
    </View>
  );
};

export default FindGuides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rbSheetWrapper: {
    backgroundColor: 'transparent',
  },
  rbSheetDraggableIcon: {
    backgroundColor: '#000',
  },
  rbSheetContainer: {
    backgroundColor: 'rgba(12, 15, 23, 1)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  sheetContent: {
    margin: 20,
  },
  pillButtonContainer: {
    // Add specific styles for pill button container if needed
  },
  locationButtonContainer: {
    marginTop: 20,
  },
  locationButton: {
    borderWidth: 1.5,
    padding: 10,
    borderColor: 'rgba(237, 193, 106, 1)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconContainer: {
    marginHorizontal: 15,
  },
  locationTextContainer: {},
  locationText: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '400',
    fontSize: 12,
  },
  locationSubText: {
    color: 'rgba(255, 255, 255, 0.52)',
    fontWeight: '400',
    fontSize: 12,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
