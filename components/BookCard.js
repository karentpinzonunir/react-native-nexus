import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

const BookCard = ({ book, onPress, onAddToCart, user, detailPurchase, siCarrito = true }) => {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        // Feedback háptico al agregar al carrito
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        if (onAddToCart) onAddToCart(book);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <View className="bg-card rounded-nexus shadow-nexus p-4 mb-4 mx-2">

            {/* Toast de confirmación */}
            {added && (
                <View className="absolute top-2 right-2 bg-green-500 px-3 py-1 rounded-full z-10">
                    <Text className="text-white text-xs font-interBold">✅ Agregado</Text>
                </View>
            )}

            {/* Título */}
            <Text className="font-headingBold text-secondary text-base mb-2" numberOfLines={2}>
                {book.title}
            </Text>

            {/* Info */}
            <View className="mb-3 gap-1">
                <Text className="font-inter text-muted text-sm">
                    <Text className="font-interBold">Categoría: </Text>
                    {book.category}
                </Text>
                <Text className="font-inter text-muted text-sm">
                    <Text className="font-interBold">Autor: </Text>
                    {book.author}
                </Text>
                <Text className="font-inter text-primary text-sm font-interBold">
                    $us {book.price}
                </Text>
            </View>

            {/* Detalles de compra (MyBooks) */}
            {!siCarrito && detailPurchase && (
                <View className="bg-bgLight rounded-lg p-3 mb-3">
                    <Text className="font-headingBold text-secondary text-sm mb-1">
                        Detalles de tu compra:
                    </Text>
                    <Text className="font-inter text-muted text-xs">
                        Fecha: {new Date(detailPurchase.fecha).toLocaleDateString()}
                    </Text>
                    <Text className="font-inter text-muted text-xs">
                        Método: {detailPurchase.metodoPago}
                    </Text>
                    <Text className="font-inter text-muted text-xs">
                        Estado: {detailPurchase.estado}
                    </Text>
                </View>
            )}

            {/* Botones */}
            <View className="flex-row gap-2 mt-1">
                {/* Ver detalles */}
                <Pressable
                    onPress={() => {
                        Haptics.selectionAsync();
                        if (onPress) onPress(book);
                    }}
                    className="flex-1 bg-primary py-2 rounded-lg items-center"
                >
                    <Text className="text-white font-interBold text-sm">Ver detalles</Text>
                </Pressable>

                {/* Agregar al carrito */}
                {user && siCarrito && (
                    <Pressable
                        onPress={handleAddToCart}
                        className="flex-1 bg-secondary py-2 rounded-lg items-center"
                    >
                        <Text className="text-white font-interBold text-sm">Agregar 🛒</Text>
                    </Pressable>
                )}
            </View>

            {/* Sin sesión */}
            {!user && siCarrito && (
                <Text className="text-muted text-xs text-center mt-2 font-inter">
                    Inicia sesión para comprar
                </Text>
            )}
        </View>
    );
};

export default BookCard;