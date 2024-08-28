import {useState, useEffect, useCallback, useRef} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import io from 'socket.io-client';

const useCurrentLocation = user => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [gydeLocations, setGydeLocations] = useState({});
  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io('http://192.168.1.6:3001');

    socketRef.current.on('connect', () => {
      console.log('Welcome Hack server');
    });
    socketRef.current.on('locationUpdate', data => {
      setGydeLocations(data);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  const handlePosition = useCallback(
    position => {
      if (user?.gyde && socketRef.current) {
        socketRef.current.emit('locationUpdate', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          speed: position.coords.speed,
          timestamp: position.timestamp,
          user,
        });
      }

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        speed: position.coords.speed,
        timestamp: position.timestamp,
      });
    },
    [user],
  );

  const handleError = useCallback(error => {
    setError(error.message);
  }, []);

  const requestLocationPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Location permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(handlePosition, handleError, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      });

      const watchId = Geolocation.watchPosition(handlePosition, handleError, {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      });

      return () => {
        Geolocation.clearWatch(watchId);
      };
    } catch (err) {
      setError(err.message);
    }
  }, [handlePosition, handleError]);

  useEffect(() => {
    const cleanup = requestLocationPermission();

    return () => {
      if (cleanup) cleanup();
      Geolocation.stopObserving();
    };
  }, [requestLocationPermission]);

  return {location, error, gydeLocations};
};

export default useCurrentLocation;
