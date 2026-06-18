import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Configuración de Firebase
 *
 * IMPORTANTE: Reemplaza estos valores con tus credenciales de Firebase Console
 *
 * Para obtener tu configuración:
 * 1. Ve a Firebase Console (https://console.firebase.google.com)
 * 2. Selecciona tu proyecto o crea uno nuevo
 * 3. Ve a Configuración del proyecto (ícono de engranaje)
 * 4. En "Tus apps", selecciona la app web o créala
 * 5. Copia el objeto firebaseConfig
 */
const firebaseConfig = {
    apiKey: "AIzaSyB0ptkmr0KIDJ18vmInUoAeOoiaK_gxZKg",
    authDomain: "nexus-expo.firebaseapp.com",
    projectId: "nexus-expo",
    storageBucket: "nexus-expo.firebasestorage.app",
    messagingSenderId: "214133397888",
    appId: "1:214133397888:web:539790f460827880574965",
    measurementId: "G-95JDYVK5BQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth con persistencia usando AsyncStorage
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;