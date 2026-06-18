import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import * as Haptics from "expo-haptics";

const BookCard = ({
  book,
  onPress,
  onAddToCart,
  user,
  detailPurchase,
  siCarrito = true,
}) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    // Feedback háptico al agregar al carrito
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (onAddToCart) onAddToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-4 mx-2 border border-gray-100">
      {/* Toast de confirmación */}
      {added && (
        <View className="absolute top-2 right-2 bg-green-500 px-3 py-1 rounded-full z-10 shadow-md">
          <Text className="text-white text-xs font-bold">✅ Agregado</Text>
        </View>
      )}

      {/* Título */}
      <Text
        className="text-gray-800 font-bold text-base mb-2"
        style={{ fontFamily: "System" }} // Fuerza la fuente nativa si tu alias falla
        numberOfLines={2}
      >
        {book?.title || "Sin título"}
      </Text>

      {/* Info - Estructura corregida sin flexbox pesados para evitar colapsos de altura */}
      <View className="mb-3 space-y-1">
        <View className="flex-row items-center justify-between py-0.5">
          <Text className="text-gray-500 font-bold text-xs uppercase tracking-wider">
            Categoría
          </Text>
          <Text className="text-gray-700 text-sm font-medium">
            {book?.category || "Sin categoría"}
          </Text>
        </View>

        <View className="flex-row items-center justify-between py-0.5 border-t border-gray-50">
          <Text className="text-gray-500 font-bold text-xs uppercase tracking-wider">
            Autor
          </Text>
          <Text className="text-gray-700 text-sm font-medium">
            {book?.author || "Anónimo"}
          </Text>
        </View>

        <View className="flex-row items-center justify-between py-1 border-t border-gray-50">
          <Text className="text-gray-500 font-bold text-xs uppercase tracking-wider">
            Precio
          </Text>
          <Text className="text-indigo-600 font-extrabold text-base">
            $ {book?.price || "0.00"}
          </Text>
        </View>
      </View>

      {/* Detalles de compra (MyBooks) */}
      {!siCarrito && detailPurchase && (
        <View className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
          <Text className="text-gray-800 font-bold text-sm mb-1">
            Detalles de tu compra:
          </Text>
          <Text className="text-gray-600 text-xs py-0.5">
            Fecha:{" "}
            {detailPurchase.fecha
              ? new Date(detailPurchase.fecha).toLocaleDateString()
              : "N/A"}
          </Text>
          <Text className="text-gray-600 text-xs py-0.5">
            Método: {detailPurchase.metodoPago || "N/A"}
          </Text>
          <Text className="text-gray-600 text-xs py-0.5">
            Estado: {detailPurchase.estado || "N/A"}
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
          className="flex-1 bg-indigo-600 active:bg-indigo-700 py-2.5 rounded-lg items-center justify-center"
        >
          <Text className="text-white font-bold text-sm">Ver detalles</Text>
        </Pressable>

        {/* Agregar al carrito */}
        {user && siCarrito && (
          <Pressable
            onPress={handleAddToCart}
            className="flex-1 bg-gray-800 active:bg-gray-900 py-2.5 rounded-lg items-center justify-center"
          >
            <Text className="text-white font-bold text-sm">Agregar 🛒</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default BookCard;
