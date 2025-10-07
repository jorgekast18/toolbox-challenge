import React from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import logo from '../assets/logo.jpeg'
import useAuth from '../hooks/useAuth';

export default function HomeScreen() {
  const { token, type, loading, error, auth, doLogout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.image} source={logo} />
        <Text style={styles.title}>Challenge ToolBox</Text>
        {token ? (
          <View style={styles.content}>
            <Text style={styles.success}>¡Login exitoso!</Text>
            <Text style={styles.token}>{token}</Text>
            <Text style={styles.token}>{type}</Text>
            <TouchableOpacity style={styles.buttonLogout} onPress={doLogout}>
              <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.content}>
            {loading ? (
              <ActivityIndicator size="large" color="#4A90E2" />
            ) : (
              <TouchableOpacity style={styles.buttonLogin} onPress={() => auth()}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            )}
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    marginBottom: 40,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  success: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2ecc71',
    marginBottom: 12,
  },
  token: {
    fontSize: 12,
    color: '#555',
    marginBottom: 24,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  buttonLogin: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#1c78d8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonLogout: {
    backgroundColor: '#e94e37',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#c93a28',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  error: {
    marginTop: 18,
    color: '#e74c3c',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
    resizeMode: 'contain',
  },
});
