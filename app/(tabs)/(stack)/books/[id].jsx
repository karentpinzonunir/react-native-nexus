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
  const { id, from } = useLocalSearchParams();
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

  const handleGoBack = () => {
    Haptics.selectionAsync();
    let backRoute = '/ebooks';
    if (from === 'home') backRoute = '/home';
    else if (from === 'search') backRoute = '/search';
    else if (from === 'ebooks') backRoute = '/ebooks';
    router.push(backRoute);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-gray-500 text-sm font-medium mt-3">Cargando libro...</Text>
      </SafeAreaView>
    );
  }

  if (!book || error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
        <Text className="text-5xl mb-4">📚</Text>
        <Text className="text-gray-800 font-bold text-xl mb-2">Libro no encontrado</Text>
        {error && <Text className="text-red-500 text-sm text-center mb-4">{error}</Text>}
        <Pressable onPress={handleGoBack} className="bg-indigo-600 active:bg-indigo-700 px-6 py-3 rounded-xl shadow-sm">
          <Text className="text-white font-bold text-sm">Volver atrás</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header custom - dentro del SafeArea, así no se corta con la hora */}
      <View className="px-4 py-3 flex-row items-center bg-[#f8fafc] border-b border-gray-200">
        <Pressable
          onPress={handleGoBack}
          className="p-2 bg-white rounded-full shadow-sm border border-gray-100"
        >
          <Ionicons name="arrow-back" size={22} color="#4f46e5" />
        </Pressable>

        <Text className="flex-1 text-center text-gray-800 font-bold text-lg pr-10">
          Detalle del Libro
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-4 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <Text className="text-gray-800 font-bold text-2xl mb-4">
            {book.title || "Sin título"}
          </Text>

          <View className="gap-4">
            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Categoría</Text>
              <Text className="text-gray-700 text-base font-medium">{book.category || "Sin categoría"}</Text>
            </View>

            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Autor</Text>
              <Text className="text-gray-700 text-base font-medium">{book.author || "Anónimo"}</Text>
            </View>

            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Año</Text>
              <Text className="text-gray-700 text-base font-medium">{book.year || "0"}</Text>
            </View>

            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Stock</Text>
              <Text className="text-gray-700 text-base font-medium">{book.stock || "0"}</Text>
            </View>

            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Precio</Text>
              <Text className="text-indigo-600 font-extrabold text-2xl">${book.price || "0.00"}</Text>
            </View>
          </View>

          <Pressable
            onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
            className="bg-indigo-600 active:bg-indigo-700 mt-6 py-3.5 rounded-xl items-center flex-row justify-center gap-2 shadow-sm"
          >
            <Ionicons name="cart-outline" size={20} color="white" />
            <Text className="text-white font-bold text-base">Agregar al carrito</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}