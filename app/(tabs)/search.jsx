import React from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useBooks } from '../../hooks/useBooks';
import BookCard from '../../components/BookCard';
import CategoriaSelector from '../../components/CategoriaSelector';
import FormSearchBook from '../../components/FormSearchBook';

export default function SearchScreen() {
    const {
        filteredBooks,
        paramSearch,
        changeParamSearch,
        searching,
    } = useBooks();

    const { categoriaId } = paramSearch;

    const changeCategoriaId = (newCategoriaId) => {
        changeParamSearch({ ...paramSearch, categoriaId: newCategoriaId });
    };

    const handleFilterChange = (filters) => {
        changeParamSearch({ ...paramSearch, ...filters });
    };

    return (
        <SafeAreaView className="flex-1 bg-bgLight">
            <FlatList
                data={!searching ? filteredBooks : []}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        <View className="px-4 pt-6 pb-4">
                            <Text className="font-headingBold text-secondary text-2xl mb-1">
                                Busca tu E-Book favorito
                            </Text>
                            {!searching && (
                                <Text className="font-inter text-muted text-sm">
                                    Resultados encontrados:{' '}
                                    <Text className="font-interBold text-secondary">
                                        {filteredBooks.length}
                                    </Text>
                                </Text>
                            )}
                        </View>

                        {/* Filtros */}
                        <CategoriaSelector
                            categoriaId={categoriaId ?? 0}
                            changeCategoriaId={changeCategoriaId}
                        />
                        <FormSearchBook onFilterChange={handleFilterChange} />

                        {/* Loading búsqueda */}
                        {searching && (
                            <View className="items-center py-10">
                                <ActivityIndicator size="large" color="#4f46e5" />
                                <Text className="font-inter text-muted text-sm mt-3">
                                    Buscando en la biblioteca...
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
                ListEmptyComponent={
                    !searching ? (
                        <View className="items-center py-10 px-6">
                            <Text className="text-4xl mb-2">🔍</Text>
                            <Text className="font-interBold text-secondary text-base mb-1">
                                Sin resultados
                            </Text>
                            <Text className="font-inter text-muted text-sm text-center">
                                No encontramos libros que coincidan con tu búsqueda.
                                Prueba con otros términos o categorías.
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