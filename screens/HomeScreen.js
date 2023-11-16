import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Importez les fonctions nécessaires depuis Firebase
import { FIREBASE_AUTH } from '../firebaseConfig'; // Assurez-vous d'avoir correctement exporté votre instance Firebase Auth
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null); // État pour l'utilisateur connecté

    useEffect(() => {
        // Utilisez la fonction onAuthStateChanged pour surveiller l'état de connexion de l'utilisateur
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
            if (authUser) {
                // L'utilisateur est connecté
                setUser(authUser);
            } else {
                // L'utilisateur n'est pas connecté
                setUser(null);
            }
        });

        // Récupérez les données du serveur lorsque le composant est monté
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://hoopconnectbackend.vercel.app/api/hello'
                );
                setMessage(response.data.message);
            } catch (error) {
                console.error('Erreur lors de la récupération du message:', error);
            }
        };

        fetchData();

        // Assurez-vous de vous désinscrire lorsque le composant est démonté
        return () => {
            unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(FIREBASE_AUTH); // Déconnexion de l'utilisateur
            setUser(null); // Mettre à jour l'état de l'utilisateur
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <View style={styles.container}>
            {!message ? <Text>Chargement ...</Text> : <Text>(/api/hello): {message}</Text>}
            {user && (
                <>
                    <Text>Connecté en tant que : {user.email}</Text>
                    <Button title="Déconnexion" onPress={handleSignOut} />
                </>
            )}
            <StatusBar style="auto" />
            <Button
                title="Inscription"
                onPress={() => navigation.navigate('SignUp')}
            />
            <Button
                title="Connexion"
                onPress={() => navigation.navigate('SignIn')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});

export default HomeScreen;
