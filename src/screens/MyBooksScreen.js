import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';

export default function MyBooksScreen() {
    const { user } = useContext(AuthContext);
    const { getMyBooks, loading, error, books } = useBooks();
    const [myBooks, setMyBooks] = useState([]);
    const [myPurchases, setMyPurchases] = useState([]);
    const navigation = useNavigation();

    // Trae las compras del usuario desde la API
    useEffect(() => {
        const fetchMyBooks = async () => {
            if (user) {
                const purchases = await getMyBooks(user.id);
                if (purchases) setMyPurchases(purchases);
            }
        };
        fetchMyBooks();
    }, [user]);

    // Cruza las compras con el listado de libros
    useEffect(() => {
        if (user && books.length > 0 && myPurchases.length > 0) {
            const filtered = books.filter((book) =>
                myPurchases.some((p) => p.bookId === book.id)
            );
            setMyBooks(filtered);
        }
    }, [books, myPurchases, user]);

    // Sin sesión iniciada
    if (!user) {
        return (
            <SafeAreaView className="flex-1 bg-bgLight items-center justify-center px-6">
                <Text className="text-5xl mb-4">🔒</Text>
                <Text className="font-headingBold text-secondary text-xl mb-2 text-center">
                    Inicia sesión
                </Text>
                <Text className="font-inter text-muted text-sm text-center mb-6">
                    Necesitas iniciar sesión para ver tus libros.
                </Text>
                <View
                    onTouchEnd={() => navigation.navigate('Login')}
                    className="bg-primary px-6 py-3 rounded-nexus"
                >
                    <Text className="text-white font-interBold">Ir al Login</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-bgLight">
            <FlatList
                data={!loading && !error ? myBooks : []}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View className="px-4 pt-6 pb-4">
                        {/* Header */}
                        <Text className="font-headingBold text-secondary text-2xl mb-1">
                            Mis eBooks
                        </Text>
                        <Text className="font-inter text-muted text-sm">
                            Gestiona y disfruta de tu colección personal.
                        </Text>

                        {/* Loading */}
                        {loading && (
                            <View className="items-center py-10">
                                <ActivityIndicator size="large" color="#4f46e5" />
                                <Text className="font-inter text-muted text-sm mt-3">
                                    Cargando tu biblioteca personal...
                                </Text>
                            </View>
                        )}

                        {/* Error */}
                        {error && (
                            <View className="bg-red-100 border border-red-300 rounded-lg p-3 mt-4">
                                <Text className="text-red-600 font-interBold text-sm">¡Ups!</Text>
                                <Text className="text-red-500 font-inter text-sm">{error}</Text>
                            </View>
                        )}
                    </View>
                }
                renderItem={({ item }) => (
                    <BookCard
                        book={item}
                        siCarrito={false}
                        detailPurchase={myPurchases.find((p) => p.bookId === item.id)}
                        onPress={(book) =>
                            navigation.navigate('BookDetail', { bookId: book.id })
                        }
                    />
                )}
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="items-center py-10 px-6">
                            <Text className="text-4xl mb-3">📚</Text>
                            <Text className="font-inter text-muted text-sm text-center">
                                No has comprado ningún libro aún.{'\n'}
                                <Text className="font-interBold text-secondary">
                                    ¡Explora nuestra librería y adquiere tus favoritos!
                                </Text>
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