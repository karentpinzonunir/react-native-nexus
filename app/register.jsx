import React, { useState } from 'react';
import {
    View, Text, TextInput, Pressable,
    SafeAreaView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        const res = await register(email.trim(), password, name.trim());
        setLoading(false);

        if (res.success) {
            Alert.alert('Éxito', 'Cuenta creada correctamente', [
                { text: 'OK', onPress: () => router.replace('/') }
            ]);
        } else {
            Alert.alert('Error', res.error || 'Error al registrar');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-bgLight">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 justify-center px-6"
            >
                <View className="items-center mb-10">
                    <Text className="text-4xl font-headingBold text-primary">NEXUS</Text>
                    <Text className="text-muted text-sm mt-1">Registro en NEXUS Librería</Text>
                </View>

                <View className="bg-card rounded-nexus p-6 shadow-nexus">
                    <Text className="text-xl font-interBold text-secondary mb-6">
                        Crear Cuenta
                    </Text>

                    <Text className="text-sm font-inter text-muted mb-1">Nombre</Text>
                    <TextInput
                        className="border border-gray-200 rounded-lg px-4 py-3 mb-4 font-inter text-secondary bg-bgLight"
                        placeholder="Tu nombre"
                        placeholderTextColor="#94a3b8"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />

                    <Text className="text-sm font-inter text-muted mb-1">Correo Electrónico</Text>
                    <TextInput
                        className="border border-gray-200 rounded-lg px-4 py-3 mb-4 font-inter text-secondary bg-bgLight"
                        placeholder="correo@ejemplo.com"
                        placeholderTextColor="#94a3b8"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text className="text-sm font-inter text-muted mb-1">Contraseña</Text>
                    <TextInput
                        className="border border-gray-200 rounded-lg px-4 py-3 mb-4 font-inter text-secondary bg-bgLight"
                        placeholder="••••••••"
                        placeholderTextColor="#94a3b8"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Text className="text-sm font-inter text-muted mb-1">Repetir Contraseña</Text>
                    <TextInput
                        className="border border-gray-200 rounded-lg px-4 py-3 mb-4 font-inter text-secondary bg-bgLight"
                        placeholder="••••••••"
                        placeholderTextColor="#94a3b8"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    <Pressable
                        onPress={handleRegister}
                        disabled={loading}
                        className={`rounded-lg py-4 items-center mt-2 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
                    >
                        <Text className="text-white font-interBold text-base">
                            {loading ? 'Creando...' : 'Crear Cuenta'}
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => router.push('/')} className="mt-4">
                        <Text className="text-center text-blue-500 underline font-inter">¿Ya tienes cuenta? Inicia sesión</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}