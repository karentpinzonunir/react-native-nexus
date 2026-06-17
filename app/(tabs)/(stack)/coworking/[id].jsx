import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import * as Calendar from 'expo-calendar'; // Importar Calendario
import DateTimePicker from '@react-native-community/datetimepicker'; // Importar Picker
import { useCoworking } from "../../../../hooks/useCoworking";
import { Ionicons } from "@expo/vector-icons";

export default function CoWorkingDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getDetailsCoWorkingById } = useCoworking();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estados para el calendario y fecha
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getDetailsCoWorkingById(id);
      setSpace(data);
      setLoading(false);
    };
    load();
  }, [id]);

  // Función para solicitar permisos e insertar en el calendario
  const createCalendarEvent = async (selectedDate) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = Platform.OS === 'ios' 
        ? await Calendar.getDefaultCalendarAsync() 
        : calendars.find(cal => cal.isPrimary) || calendars[0];

      try {
        const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
          title: `Reserva Coworking: ${space.nombre}`,
          startDate: selectedDate,
          endDate: new Date(selectedDate.getTime() + 60 * 60 * 1000), // 1 hora de duración
          location: space.location,
          notes: `Reserva en el espacio de coworking de Nexus. ID: ${space.id}`,
        });
        
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert("¡Éxito!", "Reserva añadida a tu calendario personal.");
      } catch (error) {
        Alert.alert("Error", "No se pudo agendar en el calendario.");
      }
    } else {
      Alert.alert("Permiso denegado", "Necesitamos acceso al calendario para agendar tu reserva.");
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      createCalendarEvent(selectedDate);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-bgLight items-center justify-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="mx-4 bg-card rounded-nexus shadow-nexus p-5">
          <Text className="font-headingBold text-secondary text-2xl mb-2">
            {space.nombre || `Espacio ${space.id}`}
          </Text>

          <View className="mb-4">
             <Text className="font-interBold text-muted text-xs uppercase mb-1">Ubicación</Text>
             <Text className="font-inter text-secondary">{space.location || "No disponible"}</Text>
          </View>

          {/* ... otros datos del espacio ... */}

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setShowPicker(true); // Abrir el selector de fecha
            }}
            className="bg-primary mt-4 py-3 rounded-nexus items-center"
          >
            <Text className="text-white font-interBold">
              Agendar Reserva en Calendario
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}