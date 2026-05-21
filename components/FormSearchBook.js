import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const FormSearchBook = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        title: '',
        author: '',
        year: '',
    });

    const handleChange = (name, value) => {
        const updated = { ...filters, [name]: value };
        setFilters(updated);
        onFilterChange(updated);
    };

    return (
        <View className="px-4 mb-4 gap-3">

            {/* Título */}
            <View>
                <Text className="font-interBold text-secondary text-sm mb-1">
                    Título
                </Text>
                <TextInput
                    value={filters.title}
                    onChangeText={(val) => handleChange('title', val)}
                    placeholder="Ej: El Quijote"
                    placeholderTextColor="#94a3b8"
                    className="bg-card border border-gray-200 rounded-nexus px-4 py-3 font-inter text-secondary text-sm"
                />
            </View>

            {/* Autor */}
            <View>
                <Text className="font-interBold text-secondary text-sm mb-1">
                    Autor
                </Text>
                <TextInput
                    value={filters.author}
                    onChangeText={(val) => handleChange('author', val)}
                    placeholder="Ej: Cervantes"
                    placeholderTextColor="#94a3b8"
                    className="bg-card border border-gray-200 rounded-nexus px-4 py-3 font-inter text-secondary text-sm"
                />
            </View>

            {/* Año */}
            <View>
                <Text className="font-interBold text-secondary text-sm mb-1">
                    Año
                </Text>
                <TextInput
                    value={filters.year}
                    onChangeText={(val) => handleChange('year', val)}
                    placeholder="Ej: 2020"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    className="bg-card border border-gray-200 rounded-nexus px-4 py-3 font-inter text-secondary text-sm"
                />
            </View>

            {/* Texto de ayuda */}
            <Text className="font-inter text-muted text-xs">
                Se buscará por la mejor coincidencia del título, autor y/o año.
                Todos los campos son opcionales.
            </Text>

        </View>
    );
};

export default FormSearchBook;