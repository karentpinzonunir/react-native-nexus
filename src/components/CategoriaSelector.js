import React, { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useBooks } from '../hooks/useBooks';

const CategoriaSelector = ({ categoriaId, changeCategoriaId }) => {
    const { categories } = useBooks();
    const [modalVisible, setModalVisible] = useState(false);

    const selectedName =
        categories.find((cat) => cat.id === categoriaId)?.category ||
        'Todas las Categorías';

    const handleSelect = (id) => {
        Haptics.selectionAsync();
        changeCategoriaId(id);
        setModalVisible(false);
    };

    return (
        <View className="px-4 mb-4">
            <Text className="font-interBold text-secondary text-sm mb-2">
                Filtrar por categoría
            </Text>

            {/* Botón selector */}
            <Pressable
                onPress={() => setModalVisible(true)}
                className="flex-row items-center justify-between bg-card border border-gray-200 rounded-nexus px-4 py-3"
            >
                <Text className="font-inter text-secondary text-sm">{selectedName}</Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
            </Pressable>

            {/* Modal con opciones */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    className="flex-1 bg-black/40 justify-end"
                    onPress={() => setModalVisible(false)}
                >
                    <View className="bg-card rounded-t-2xl p-4 max-h-96">

                        {/* Título del modal */}
                        <Text className="font-headingBold text-secondary text-base mb-3 text-center">
                            Selecciona una categoría
                        </Text>

                        {/* Opción "Todas" */}
                        <Pressable
                            onPress={() => handleSelect(0)}
                            className={`py-3 px-4 rounded-lg mb-1 ${categoriaId === 0 ? 'bg-primary' : 'bg-bgLight'
                                }`}
                        >
                            <Text
                                className={`font-inter text-sm ${categoriaId === 0 ? 'text-white font-interBold' : 'text-secondary'
                                    }`}
                            >
                                Todas las Categorías
                            </Text>
                        </Pressable>

                        {/* Lista de categorías */}
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => handleSelect(item.id)}
                                    className={`py-3 px-4 rounded-lg mb-1 ${categoriaId === item.id ? 'bg-primary' : 'bg-bgLight'
                                        }`}
                                >
                                    <Text
                                        className={`font-inter text-sm ${categoriaId === item.id
                                                ? 'text-white font-interBold'
                                                : 'text-secondary'
                                            }`}
                                    >
                                        {item.category}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default CategoriaSelector;