import React from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReservations } from '../../context/ReservationsContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ReservationsScreen() {
  const { myReservations, removeReservation } = useReservations();

  const handleConfirmDelete = (id_interna, nombre) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Alert.alert(
      "Eliminar Reserva",
      `¿Estás seguro de que deseas eliminar la reserva de "${nombre}"? También se borrará de tu calendario nativo.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            removeReservation(id_interna);
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-4 mx-4 border border-gray-100">
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text className="font-headingBold text-secondary text-lg mb-1">
            {item.nombre}
          </Text>
          
          <View className="flex-row items-center mt-1.5">
            <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
            <Text className="font-inter text-muted text-sm ml-2">
              {new Date(item.fecha).toLocaleString()}
            </Text>
          </View>
          
          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={14} color="#9ca3af" />
            <Text className="font-inter text-muted text-sm ml-2">
              {item.ubicacion}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => handleConfirmDelete(item.id_interna, item.nombre)}
          className="p-2 bg-red-50 rounded-full active:bg-red-100"
        >
          <Ionicons name="trash-outline" size={18} color="#ef4444" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bgLight" edges={['top', 'left', 'right']}>
      <FlatList
        data={myReservations}
        keyExtractor={(item) => item.id_interna.toString()}
        ListHeaderComponent={
          <View className="px-4 pt-6 pb-4">
            <Text className="font-headingBold text-secondary text-3xl mb-1">
              Mis Reservas
            </Text>
            <Text className="font-inter text-muted text-sm">
              Revisa tus próximas reservas y actividades agendadas.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center justify-center mt-20 px-6">
            <Ionicons name="calendar-outline" size={80} color="#d1d5db" />
            <Text className="font-inter text-muted mt-4 text-center text-sm leading-5">
              Aún no tienes reservas agendadas.{"\n"}Ve a la sección de Cowork para empezar.
            </Text>
          </View>
        }
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}