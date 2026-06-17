import React from 'react';
import { View, Text, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useReservations } from '../../context/ReservationsContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ReservationsScreen() {
  const { myReservations, removeReservation } = useReservations();

  const renderItem = ({ item }) => (
    <View className="bg-white m-2 p-4 rounded-nexus shadow-sm border-l-4 border-primary">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="font-headingBold text-secondary text-lg">{item.nombre}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="calendar-outline" size={14} color="#6b7280" />
            <Text className="font-inter text-muted text-sm ml-1">
              {new Date(item.fecha).toLocaleString()}
            </Text>
          </View>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text className="font-inter text-muted text-sm ml-1">{item.ubicacion}</Text>
          </View>
        </View>
        
        <Pressable 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            removeReservation(item.id_interna);
          }}
          className="p-2"
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <View className="p-4">
        <Text className="font-headingBold text-secondary text-2xl mb-4">Mis Reservas</Text>
        
        {myReservations.length === 0 ? (
          <View className="items-center justify-center mt-20">
            <Ionicons name="calendar-outline" size={80} color="#d1d5db" />
            <Text className="font-inter text-muted mt-4 text-center">
              Aún no tienes reservas agendadas.{"\n"}Ve a la sección de Cowork para empezar.
            </Text>
          </View>
        ) : (
          <FlatList
            data={myReservations}
            keyExtractor={(item) => item.id_interna.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}