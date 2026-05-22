import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useCoworking } from '../../../../hooks/useCoworking';
import { Ionicons } from '@expo/vector-icons';

export default function CoWorkingDetailScreen() {
    const { id } = useLocalSearchParams();
    const { getDetailsCoWorkingById } = useCoworking();
    const [space, setSpace] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getDetailsCoWorkingById(id);
            setSpace(data);
            setLoading(false);
        };
        load();
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-bgLight items-center justify-center">
                <ActivityIndicator size="large" color="#4f46e5" />
                <Text className="font-inter text-muted text-sm mt-3">Cargando detalles...</Text>
            </SafeAreaView>
        );
    }

    if (!space) {
        return (
            <SafeAreaView className="flex-1 bg-bgLight items-center justify-center px-6">
                <Text className="text-5xl mb-4">📍</Text>
                <Text className="font-headingBold text-secondary text-xl mb-2">Espacio no encontrado</Text>
                <Pressable
                    onPress={() => {
                        Haptics.selectionAsync();
                        router.back();
                    }}
                    className="bg-primary px-6 py-3 rounded-nexus"
                >
                    <Text className="text-white font-interBold">Volver</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-bgLight">
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                

                <View className="mx-4 bg-card rounded-nexus shadow-nexus p-5">
                    <Text className="font-headingBold text-secondary text-2xl mb-2">
                        {space.name || `Espacio ${space.id}`}
                    </Text>

                    <View className="mb-4">
                        <Text className="font-interBold text-muted text-xs uppercase mb-1">Ubicación</Text>
                        <Text className="font-inter text-secondary">{space.location || 'No disponible'}</Text>
                    </View>

                    <View className="mb-4">
                        <Text className="font-interBold text-muted text-xs uppercase mb-1">Capacidad</Text>
                        <Text className="font-inter text-secondary">{space.capacity ?? 'N/A'}</Text>
                    </View>

                    <View className="mb-4">
                        <Text className="font-interBold text-muted text-xs uppercase mb-1">Estado</Text>
                        <Text className={`font-inter ${space.ocupado ? 'text-red-500' : 'text-emerald-500'}`}>
                            {space.ocupado ? 'Ocupado' : 'Libre'}
                        </Text>
                    </View>

                    {space.features && (
                        <View className="mb-4">
                            <Text className="font-interBold text-muted text-xs uppercase mb-1">Características</Text>
                            <Text className="font-inter text-secondary">
                                {Array.isArray(space.features) ? space.features.join(', ') : space.features}
                            </Text>
                        </View>
                    )}

                    <Pressable
                        onPress={() => {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        }}
                        className="bg-primary mt-4 py-3 rounded-nexus items-center"
                    >
                        <Text className="text-white font-interBold">Reservar / Solicitar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}