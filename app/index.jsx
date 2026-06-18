import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Debes completar email y contraseña');
      return;
    }

    setLoading(true);
    const res = await login(email.trim(), password);
    if (res.success) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(tabs)/home');
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', res.error || 'Error al iniciar sesión');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        <View className="items-center mb-10">
          <Text className="text-4xl font-headingBold text-primary">NEXUS</Text>
          <Text className="text-muted text-sm mt-1">Bienvenido a NEXUS Librería</Text>
        </View>

        <View className="bg-card rounded-nexus p-6 shadow-nexus">
          <Text className="text-xl font-interBold text-secondary mb-6">
            Iniciar Sesión
          </Text>

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

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            className={`bg-primary rounded-lg py-4 items-center mt-2 ${loading ? 'opacity-60' : ''}`}
          >
            <Text className="text-white font-interBold text-base">
              {loading ? 'Ingresando...' : 'Acceder al Portal'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/register')}
            className="mt-4"
          >
            <Text className="text-center text-blue-500 underline font-inter">
              ¿No tienes cuenta? Regístrate aquí
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}