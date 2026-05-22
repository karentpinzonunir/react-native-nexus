import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useBooks } from "../../../../hooks/useBooks";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getBookById, error } = useBooks();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
      setLoading(false);
    };
    fetchBook();
  }, [id]);

  // Estado de carga corregido con Tailwind nativo uniforme
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-gray-500 text-sm font-medium mt-3">
          Cargando libro...
        </Text>
      </SafeAreaView>
    );
  }

  // Pantalla de error / no encontrado corregida
  if (!book || error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
        <Text className="text-5xl mb-4">📚</Text>
        <Text className="text-gray-800 font-bold text-xl mb-2">
          Libro no encontrado
        </Text>
        {error && (
          <Text className="text-red-500 text-sm text-center mb-4">{error}</Text>
        )}
        <Pressable
          onPress={() => {
            Haptics.selectionAsync();
            router.back();
          }}
          className="bg-indigo-600 active:bg-indigo-700 px-6 py-3 rounded-xl shadow-sm"
        >
          <Text className="text-white font-bold text-sm">Volver atrás</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Barra superior con botón para regresar */}
      <View className="px-4 py-2 flex-row items-center">
        <Pressable
          onPress={() => {
            Haptics.selectionAsync();
            router.back();
          }}
          className="p-2 bg-white rounded-full shadow-sm border border-gray-100"
        >
          <Ionicons name="arrow-back" size={22} color="#4f46e5" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          {/* Título corregido a inglés (book.title) */}
          <Text className="text-gray-800 font-bold text-2xl mb-4">
            {book.title || "Sin título"}
          </Text>

          <View className="gap-4">
            {/* Bloque de Categoría añadido (utiliza book.category) */}
            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">
                Categoría
              </Text>
              <Text className="text-gray-700 text-base font-medium">
                {book.category || "Sin categoría"}
              </Text>
            </View>

            {/* Autor corregido a inglés (book.author) */}
            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">
                Autor
              </Text>
              <Text className="text-gray-700 text-base font-medium">
                {book.author || "Anónimo"}
              </Text>
            </View>

            {/* Precio corregido a inglés (book.price) */}
            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">
                Precio
              </Text>
              <Text className="text-indigo-600 font-extrabold text-2xl">
                $us {book.price || "0.00"}
              </Text>
            </View>

            {/* Descripción corregido a inglés (book.description) */}
            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">
                Descripción del Libro
              </Text>
              <Text className="text-gray-600 text-sm leading-6 font-normal">
                {book.description ||
                  "Este libro no cuenta con una descripción disponible actualmente."}
              </Text>
            </View>
          </View>

          {/* Botón de Acción Principal */}
          <Pressable
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );
            }}
            className="bg-indigo-600 active:bg-indigo-700 mt-6 py-3.5 rounded-xl items-center flex-row justify-center gap-2 shadow-sm"
          >
            <Ionicons name="cart-outline" size={20} color="white" />
            <Text className="text-white font-bold text-base">
              Agregar al carrito
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
