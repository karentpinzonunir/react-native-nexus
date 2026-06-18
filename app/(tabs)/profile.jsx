import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar sesión', style: 'destructive', onPress: async () => {
                        const res = await signOut();
                        if (!res.success) {
                            Alert.alert('Error', res.error || 'No se pudo cerrar sesión');
                        }
                    }
                }
            ]
        );
    };

    return (
        <View className="flex-1 bg-bgLight px-6 py-8">
            <Text className="text-2xl font-interBold text-primary mb-4">Mi Perfil</Text>

            <View className="mb-6">
                <Text className="text-sm text-muted">Nombre</Text>
                <Text className="text-base text-secondary mt-1">{user?.displayName ?? '—'}</Text>

                <Text className="text-sm text-muted mt-4">Correo</Text>
                <Text className="text-base text-secondary mt-1">{user?.email ?? '—'}</Text>
            </View>

            <Pressable
                onPress={handleLogout}
                className="bg-red-500 rounded-lg py-3 items-center"
            >
                <Text className="text-white font-interBold">Cerrar sesión</Text>
            </Pressable>
        </View>
    );
}