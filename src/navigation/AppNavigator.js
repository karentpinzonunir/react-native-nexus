import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas
import LoginScreen from '../screens/LoginScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import CoWorkingDetailScreen from '../screens/CoWorkingDetailScreen';

// El navegador de pestañas (Tabs)
import TabsNavigator from './TabsNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            {/* Ruta de Autenticación */}
            <Stack.Screen name="Login" component={LoginScreen} />

            {/* Ruta Principal: */}
            <Stack.Screen name="Main" component={TabsNavigator} />

            {/* Rutas de Detalle */}
            <Stack.Screen
                name="BookDetail"
                component={BookDetailScreen}
                options={{ title: 'Detalle del Libro' }}
            />

            <Stack.Screen
                name="CoWorkingDetail"
                component={CoWorkingDetailScreen}
                options={{ title: 'Detalle del Espacio' }}
            />
        </Stack.Navigator>
    );
}