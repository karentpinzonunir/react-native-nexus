import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCoworking } from "../../hooks/useCoworking";
import CoWorkingCard from "../../components/CoWorkingCard";

export default function CoworkingScreen() {
    const { coworkings, loading, error, reload } = useCoworking();

    useEffect(() => {
        reload();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <FlatList
                data={coworkings}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View className="px-4 pt-6 pb-4">
                        {/* Header idéntico al Home */}
                        <Text className="font-headingBold text-secondary text-3xl mb-1">
                            Espacios de CoWorking
                        </Text>
                        <Text className="font-inter text-muted text-sm">
                            Reserva tu lugar de trabajo ideal y potencia tu productividad.
                        </Text>

                        {error && (
                            <View className="bg-red-100 border border-red-300 rounded-lg p-3 mt-4">
                                <Text className="text-red-600 font-bold text-sm">¡Ups!</Text>
                                <Text className="text-red-500 text-sm">{error}</Text>
                            </View>
                        )}

                        {loading && (
                            <View className="items-center py-10">
                                <ActivityIndicator size="large" color="#4f46e5" />
                                <Text className="text-gray-500 text-sm mt-3 font-medium">
                                    Buscando espacios disponibles...
                                </Text>
                            </View>
                        )}
                    </View>
                }
                renderItem={({ item }) => <CoWorkingCard coworking={item} />}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}