import React from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useBooks } from '../../../hooks/useBooks';
import BookCard from '../../../components/BookCard';

export default function HomeScreen() {
    const { topTenbooks, loading, error } = useBooks();

    return (
        <SafeAreaView className="flex-1 bg-bgLight">
            <FlatList
                data={topTenbooks}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View className="px-4 pt-6 pb-4">
                        {/* Header */}
                        <Text className="font-headingBold text-secondary text-2xl mb-1">
                            Top 10 Destacados
                        </Text>
                        <Text className="font-inter text-muted text-sm">
                            Consulta los títulos más vendidos en la librería, ¿te interesa alguno?
                        </Text>

                        {/* Error */}
                        {error && (
                            <View className="bg-red-100 border border-red-300 rounded-lg p-3 mt-4">
                                <Text className="text-red-600 font-interBold text-sm">¡Ups!</Text>
                                <Text className="text-red-500 font-inter text-sm">{error}</Text>
                            </View>
                        )}

                        {/* Loading */}
                        {loading && (
                            <View className="items-center py-10">
                                <ActivityIndicator size="large" color="#4f46e5" />
                                <Text className="font-inter text-muted text-sm mt-3">
                                    Buscando los mejores libros para ti...
                                </Text>
                            </View>
                        )}
                    </View>
                }
                renderItem={({ item }) => (
                    <BookCard
                        book={item}
                        onPress={(book) => router.push(`/(tabs)/(stack)/books/${book.id}`)}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}