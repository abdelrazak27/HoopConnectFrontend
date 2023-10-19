import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://hoopconnectbackend.vercel.app/api/hello');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Erreur lors de la récupération du message:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {!message ? <Text>Chargement ...</Text> : <Text>(/api/hello): {message}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
