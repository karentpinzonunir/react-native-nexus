import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useBooks } from '../hooks/useBooks';

export default function BookDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { bookId } = route.params;
    const { getBookById, error } = useBooks();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            const data = await getBookById(bookId);
            setBook(data);
            setLoading(false);
        };
        fetchBook();
    }, [bookId]);

    // Loading
    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-bgLight items-center justify-center">
                <ActivityIndicator size="large" color="#4f46e5" />
                <Text className="font-inter text-muted text-sm mt-3">
                    Cargando libro...
                </Text>
            </SafeAreaView>
        );
    }

    // Error o no encontrado
    if (!book || error) {
        return (
            <SafeAreaView className="flex-1 bg-bgLight items-center justify-center px-6">
                <Text className="text-5xl mb-4">📚</Text>
                <Text className="font-headingBold text-secondary text-xl mb-2">
                    Libro no encontrado
                </Text>
                {error && (
                    <Text className="font-inter text-red-500 text-sm text-center mb-4">
                        {error}
                    </Text>
                )}
                <Pressable
                    onPress={() => {
                        Haptics.selectionAsync();
                        navigation.goBack();
                    }}
                    className="bg-primary px-6 py-3 rounded-nexus"
                >
                    <Text className="text-white font-interBold text-sm">
                        Volver al inicio
                    </Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-bgLight">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Botón volver */}
                <Pressable
                    onPress={() => {
                        Haptics.selectionAsync();
                        navigation.goBack();
                    }}
                    className="flex-row items-center px-4 pt-4 pb-2"
                >
                    <Ionicons name="arrow-back" size={20} color="#4f46e5" />
                    <Text className="font-interBold text-primary text-sm ml-1">
                        Volver
                    </Text>
                </Pressable>

                {/* Contenedor principal */}
                <View className="mx-4 bg-card rounded-nexus shadow-nexus p-5">

                    {/* Título */}
                    <Text className="font-headingBold text-secondary text-2xl mb-4">
                        {book.titulo}
                    </Text>

                    {/* Grid de info */}
                    <View className="gap-4">

                        {/* Autor */}
                        <View className="bg-bgLight rounded-lg p-4">
                            <Text className="font-interBold text-muted text-xs uppercase mb-1">
                                Autor
                            </Text>
                            <Text className="font-inter text-secondary text-base">
                                {book.autor}
                            </Text>
                        </View>

                        {/* Precio */}
                        <View className="bg-bgLight rounded-lg p-4">
                            <Text className="font-interBold text-muted text-xs uppercase mb-1">
                                Precio
                            </Text>
                            <Text className="font-headingBold text-primary text-2xl">
                                $us. {book.precio}
                            </Text>
                        </View>

                        {/* Descripción */}
                        <View className="bg-bgLight rounded-lg p-4">
                            <Text className="font-interBold text-muted text-xs uppercase mb-1">
                                Descripción del Libro
                            </Text>
                            <Text className="font-inter text-secondary text-sm leading-6">
                                {book.descripcion}
                            </Text>
                        </View>

                    </View>

                    {/* Botón agregar al carrito */}
                    <Pressable
                        onPress={() => {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        }}
                        className="bg-primary mt-6 py-4 rounded-nexus items-center flex-row justify-center gap-2"
                    >
                        <Ionicons name="cart-outline" size={20} color="white" />
                        <Text className="text-white font-interBold text-base">
                            Agregar al carrito
                        </Text>
                    </Pressable>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}