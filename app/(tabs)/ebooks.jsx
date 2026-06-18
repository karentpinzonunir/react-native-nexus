import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useBooks } from "../../hooks/useBooks";
import BookCard from "../../components/BookCard";
import CategoriaSelector from "../../components/CategoriaSelector";

export default function EBooksScreen() {
  const { books, loading, error, categoriaId, changeCategoriaId } = useBooks();

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <FlatList
        data={!loading && !error ? books : []}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View className="px-4 pt-6 pb-4">
              <Text className="font-headingBold text-secondary text-3xl mb-1">
                Explora nuestros <Text className="text-primary">E-Books</Text>
              </Text>
              <Text className="font-inter text-muted text-sm">
                {books.length} títulos disponibles en la categoría seleccionada
              </Text>
            </View>

            {/* Selector de categoría */}
            <CategoriaSelector
              categoriaId={categoriaId}
              changeCategoriaId={changeCategoriaId}
            />

            {/* Loading */}
            {loading && (
              <View className="items-center py-10">
                <ActivityIndicator size="large" color="#4f46e5" />
                <Text className="font-inter text-muted text-sm mt-3">
                  Filtrando biblioteca...
                </Text>
              </View>
            )}

            {/* Error */}
            {error && (
              <View className="mx-4 bg-red-100 border border-red-300 rounded-lg p-3">
                <Text className="text-red-600 font-interBold text-sm">
                  ¡Ups!
                </Text>
                <Text className="text-red-500 font-inter text-sm">
                  Error al cargar libros: {error}
                </Text>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={(book) => router.push({
              pathname: `/books/${book.id}`,
              params: { from: 'ebooks' }
            })}
          />
        )}
        ListEmptyComponent={
          !loading && !error ? (
            <View className="items-center py-10">
              <Text className="text-4xl mb-2">🔍</Text>
              <Text className="font-inter text-muted text-sm">
                No se encontraron libros en esta categoría.
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}