import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleSubmit = () => {
        if (username === 'admin' && password === 'admin') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setUser({ name: 'Administrador', role: 'admin', cart: [] });
            navigation.navigate('Main');
        } else if (username === 'user' && password === 'user') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setUser({ name: 'Usuario', role: 'user', cart: [] });
            navigation.navigate('Main');
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-bgLight">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 justify-center px-6 py-10">

                        {/* Logo / Título */}
                        <View className="items-center mb-8">
                            <Text className="font-headingBold text-secondary text-3xl mb-1">
                                NEXUS
                            </Text>
                            <Text className="font-inter text-muted text-sm">
                                Bienvenido a NEXUS Librería
                            </Text>
                        </View>

                        {/* Card del formulario */}
                        <View className="bg-card rounded-nexus shadow-nexus p-6">
                            <Text className="font-headingBold text-secondary text-xl mb-4">
                                Iniciar Sesión
                            </Text>

                            {/* Error */}
                            {error !== '' && (
                                <View className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                                    <Text className="font-inter text-red-600 text-sm">{error}</Text>
                                </View>
                            )}

                            {/* Usuario */}
                            <View className="mb-4">
                                <Text className="font-interBold text-secondary text-sm mb-1">
                                    Usuario
                                </Text>
                                <TextInput
                                    value={username}
                                    onChangeText={(val) => {
                                        setUsername(val);
                                        setError('');
                                    }}
                                    placeholder="Ej: admin"
                                    placeholderTextColor="#94a3b8"
                                    autoCapitalize="none"
                                    className="bg-bgLight border border-gray-200 rounded-nexus px-4 py-3 font-inter text-secondary text-sm"
                                />
                            </View>

                            {/* Contraseña */}
                            <View className="mb-6">
                                <Text className="font-interBold text-secondary text-sm mb-1">
                                    Contraseña
                                </Text>
                                <TextInput
                                    value={password}
                                    onChangeText={(val) => {
                                        setPassword(val);
                                        setError('');
                                    }}
                                    placeholder="••••••••"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry
                                    className="bg-bgLight border border-gray-200 rounded-nexus px-4 py-3 font-inter text-secondary text-sm"
                                />
                            </View>

                            {/* Botón */}
                            <Pressable
                                onPress={handleSubmit}
                                className="bg-primary py-4 rounded-nexus items-center"
                            >
                                <Text className="text-white font-interBold text-base">
                                    Acceder al Portal
                                </Text>
                            </Pressable>
                        </View>

                        {/* Ayuda de acceso */}
                        <View className="mt-4 bg-card rounded-nexus p-4 border border-gray-100">
                            <Text className="font-interBold text-secondary text-sm mb-2">
                                Acceso de prueba:
                            </Text>
                            <View className="flex-row gap-2 flex-wrap">
                                <View className="bg-bgLight px-3 py-1 rounded-lg">
                                    <Text className="font-inter text-secondary text-xs">admin / admin</Text>
                                </View>
                                <View className="bg-bgLight px-3 py-1 rounded-lg">
                                    <Text className="font-inter text-secondary text-xs">user / user</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}