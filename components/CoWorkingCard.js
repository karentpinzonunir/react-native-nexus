import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

const CoWorkingCard = ({ coworking }) => {
  const handlePress = () => {
    Haptics.selectionAsync();
    router.push({
      pathname: `/coworking/${coworking.id}`,
      params: { 
        data: JSON.stringify(coworking),
        from: 'coworking'
      }
    });
  };

  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-4 mx-4 border border-gray-100">
      {/* Título */}
      <Text className="text-gray-800 font-bold text-lg mb-2">
        {coworking.nombre}
      </Text>

      {/* Info unificada con BookCard */}
      <View className="mb-3 space-y-1">
        <View className="flex-row items-center justify-between py-0.5">
          <Text className="text-gray-500 font-bold text-xs uppercase tracking-wider">Estado</Text>
          <Text className={`text-sm font-bold ${coworking.ocupado ? "text-red-500" : "text-emerald-500"}`}>
            {coworking.ocupado ? "Ocupado" : "Libre"}
          </Text>
        </View>

        <View className="flex-row items-center justify-between py-0.5 border-t border-gray-50">
          <Text className="text-gray-500 font-bold text-xs uppercase tracking-wider">Capacidad</Text>
          <Text className="text-gray-700 text-sm font-medium">{coworking.capacidad} pers.</Text>
        </View>

        <View className="flex-row items-center justify-between py-1 border-t border-gray-50">
          <Text className="text-gray-500 font-bold text-xs uppercase tracking-wider">Precio/hr</Text>
          <Text className="text-indigo-600 font-extrabold text-base">$ {coworking.precio_hora || "5.00"}</Text>
        </View>
      </View>

      {/* Botón Ver Detalles (igual al de libros) */}
      <Pressable
        onPress={handlePress}
        className="bg-indigo-600 active:bg-indigo-700 py-2.5 rounded-lg items-center justify-center shadow-sm"
      >
        <Text className="text-white font-bold text-sm">Ver detalles y Reservar</Text>
      </Pressable>
    </View>
  );
};

export default CoWorkingCard;