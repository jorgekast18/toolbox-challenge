import React from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Loader({ text }) {
  return (
    <SafeAreaView style={[styles.safeArea, styles.center]}>
      <ActivityIndicator size="large" color="#4A90E2" />
      <Text style={styles.loadingText}>{text}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
});
