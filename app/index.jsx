import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable,
  SafeAreaView, KeyboardAvoidingView, Platform
} from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

const USERS = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'user', password: 'user', role: 'user' },
];

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const found = USERS.find(
      u => u.username === username && u.password === password
    );

    if (found) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(tabs)/home');
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-4xl font-headingBold text-primary">NEXUS</Text>
          <Text className="text-muted text-sm mt-1">Bienvenido a NEXUS Librería</Text>
        </View>

        {/* Card */}
        <View className="bg-card rounded-nexus p-6 shadow-nexus">
          <Text className="text-xl font-interBold text-secondary mb-6">
            Iniciar Sesión
          </Text>

          {/* Usuario */}
          <Text className="text-sm font-inter text-muted mb-1">Usuario</Text>
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 mb-4 font-inter text-secondary bg-bgLight"
            placeholder="Ej: admin"
            placeholderTextColor="#94a3b8"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          {/* Contraseña */}
          <Text className="text-sm font-inter text-muted mb-1">Contraseña</Text>
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 mb-4 font-inter text-secondary bg-bgLight"
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Error */}
          {error ? (
            <Text className="text-red-500 text-sm mb-3 font-inter">{error}</Text>
          ) : null}

          {/* Botón */}
          <Pressable
            onPress={handleLogin}
            className="bg-primary rounded-lg py-4 items-center mt-2"
          >
            <Text className="text-white font-interBold text-base">
              Acceder al Portal
            </Text>
          </Pressable>

          {/* Hint */}
          <Text className="text-center text-muted text-xs mt-4 font-inter">
            Acceso de prueba:{'\n'}admin / admin · user / user
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}