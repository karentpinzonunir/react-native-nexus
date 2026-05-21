import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CoWorkingCard from '../components/CoWorkingCard';
import { useCoworking } from '../hooks/useCoworking';

export default function CoWorkingScreen() {
    const navigation = useNavigation();
    const { coworkings, loading, error, getCoworkings } = useCoworking();

    const freeSpaces = getCoworkings(false);
    const occupiedSpaces = getCoworkings(true);

    return (
        <SafeAreaView className="flex-1 bg-bgLight">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Sección: Disponibles */}
                <View className="px-4 pt-6 pb-2">
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="w-3 h-3 rounded-full bg-emerald-500" />
                        <Text className="font-headingBold text-secondary text-xl">
                            Espacios Disponibles ({freeSpaces.length})
                        </Text>
                    </View>

                    {loading && (
                        <View className="items-center py-6">
                            <Text className="font-inter text-muted">Consultando disponibilidad...</Text>
                        </View>
                    )}

                    {error && (
                        <View className="mx-4 bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                            <Text className="text-red-600 font-interBold">¡Ups!</Text>
                            <Text className="text-red-500 font-inter text-sm">{error}</Text>
                        </View>
                    )}

                    {!loading && freeSpaces.length === 0 && (
                        <View className="px-4 py-6">
                            <Text className="font-inter text-muted">No hay espacios libres en este momento.</Text>
                        </View>
                    )}

                    {!loading && freeSpaces.map((space) => (
                        <CoWorkingCard
                            key={space.id}
                            coworking={space}
                            onPress={(s) => navigation.navigate('CoWorkingDetail', { id: s.id })}
                        />
                    ))}
                </View>

                {/* Sección: Ocupados */}
                <View className="px-4 pt-4 pb-2">
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="w-3 h-3 rounded-full bg-red-500" />
                        <Text className="font-headingBold text-secondary text-xl">
                            En Uso ({occupiedSpaces.length})
                        </Text>
                    </View>

                    {!loading && occupiedSpaces.length === 0 && (
                        <View className="px-4 py-6">
                            <Text className="font-inter text-muted">Todos los espacios están desocupados.</Text>
                        </View>
                    )}

                    {!loading && occupiedSpaces.map((space) => (
                        <CoWorkingCard
                            key={space.id}
                            coworking={space}
                            onPress={(s) => navigation.navigate('CoWorkingDetail', { id: s.id })}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}