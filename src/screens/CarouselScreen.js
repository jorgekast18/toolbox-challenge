import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import backButton from '../assets/back_button.png';
import useCarousels from '../hooks/useCarousels';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

export default function CarouselScreen({ navigation }) {
  const { token, doLogout } = useAuth();
  const { fetchCarousels, items, loading } = useCarousels();
  useEffect(() => {
    if( !token ) {
      navigation.navigate(ROUTES.HOME)
      doLogout();
      return;
    }

    fetchCarousels()
  }, [token]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Cargando carruseles...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={backButton} style={styles.back} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Carousel</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  header: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomColor: '#ddd',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3a3a3a',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3a3a3a',
  },
  back: {
    width: 30,
    height: 30,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
});
