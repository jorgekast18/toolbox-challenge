import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, View, StyleSheet } from 'react-native';
import useAuth from '../hooks/useAuth';

export default function HomeScreen() {
  const { token, type,loading, error, auth, doLogout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Challenge Login</Text>
      {token ? (
        <View>
          <Text style={styles.success}>¡Login exitoso!</Text>
          <Text style={styles.token}>Token: {token}</Text>
          <Text style={styles.token}>Type: {type}</Text>
          <Button title="Logout" onPress={doLogout} />
        </View>
      ) : (
        <View>
          <Button
            title={loading ? "Ingresando..." : "Iniciar sesión"}
            onPress={() => auth()}
          />
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  error: { color: 'red', marginTop: 10 },
  success: { color: 'green', fontSize: 18, marginBottom: 8 },
  token: { fontSize: 12, marginBottom: 20 }
});
