import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const CoWorkingCard = ({ coworking }) => {
    const router = useRouter();
    const isOccupied = coworking.ocupado;

    const handlePress = () => {
        Haptics.selectionAsync();
        router.replace(`/(tabs)/(stack)/coworking/${coworking.id}`);
    };

    return (
        <View className="mx-4 mb-4 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Header con nombre y estado */}
            <View className={`p-4 ${isOccupied ? 'bg-red-50' : 'bg-emerald-50'}`}>
                <View className="flex-row justify-between items-start">
                    <Text className="font-headingBold text-secondary text-lg flex-1">
                        {coworking.nombre || `Espacio ${coworking.id}`}
                    </Text>
                    <View className="ml-2">
                        <View className={`w-3 h-3 rounded-full ${isOccupied ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    </View>
                </View>
            </View>

            {/* Info principal */}
            <View className="p-4">
                <Text className="font-inter text-sm text-secondary mb-1">
                    <Text className="font-interBold">Capacidad: </Text>
                    {coworking.capacidad} personas
                </Text>
                <Text className="font-inter text-sm text-secondary">
                    <Text className="font-interBold">Estado: </Text>
                    {isOccupied ? '🔴 Ocupado' : '🟢 Disponible'}
                </Text>

                {/* Detalle de ocupación */}
                {isOccupied && coworking.ocupadoPor && (
                    <View className="mt-3 pt-3 border-t border-gray-100">
                        <Text className="font-interBold text-secondary text-sm mb-1">
                            Ficha de Ocupación
                        </Text>
                        <Text className="font-inter text-xs text-muted">
                            <Text className="font-interBold">Usuario: </Text>
                            {coworking.ocupadoPor}
                        </Text>
                        {coworking.horaInicio && coworking.horaFin && (
                            <Text className="font-inter text-xs text-muted">
                                <Text className="font-interBold">Horario: </Text>
                                {coworking.horaInicio} - {coworking.horaFin}
                            </Text>
                        )}
                    </View>
                )}

                {/* Acción */}
                <Pressable
                    onPress={handlePress}
                    className="mt-4 py-2 bg-primary rounded-lg items-center"
                >
                    <Text className="font-interBold text-white text-sm">
                        Ver Detalles y Reservar
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default CoWorkingCard;