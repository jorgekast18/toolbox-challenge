import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import backButton from '../assets/back_button.png';
import useCarousels from '../hooks/useCarousels';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';
import Loader from '../components/Loader';
import Carousel from '../components/Carousel';

export default function CarouselScreen({ navigation }) {
  const { token, doLogout } = useAuth();
  const { fetchCarousels, items, loading } = useCarousels();
  useEffect(() => {
    if( !token || (items.code && items.code === "E403") ) {
      navigation.navigate(ROUTES.HOME)
      doLogout();
      return;
    }

    fetchCarousels()
  }, [token]);

  if (loading) {
    return (
      <Loader text={'Cargando Carruseles...'}/>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={backButton} style={styles.back} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map((carousel) => (
          <Carousel key={carousel.title} title={carousel.title} items={carousel.items} type={carousel.type} />
        ))}
      </ScrollView>
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3a3a3a',
  },
  back: {
    width: 30,
    height: 30,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
});
