import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import * as Calendar from "expo-calendar";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useReservations } from "../../../../context/ReservationsContext";

export default function CoWorkingDetailScreen() {
  const { data } = useLocalSearchParams();
  const { addReservation } = useReservations();
  const [space, setSpace] = useState(null);

  useEffect(() => {
    if (data) {
      setSpace(JSON.parse(data));
    }
  }, [data]);

  const handleGoBack = () => {
    Haptics.selectionAsync();
    router.push("/coworking");
  };

  const createCalendarEvent = async (selectedDate) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Necesitamos acceso al calendario.");
      return;
    }

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find((cal) => cal.isPrimary) || calendars.find((cal) => cal.allowsModifications) || calendars[0];

    if (!defaultCalendar) {
      Alert.alert("Error", "No se encontró calendario.");
      return;
    }

    try {
      const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
        title: `Reserva Coworking: ${space.nombre}`,
        startDate: selectedDate,
        endDate: new Date(selectedDate.getTime() + 60 * 60 * 1000),
        location: space.ubicacion || "Nexus",
        notes: `Reserva en espacio de coworking Nexus. ID: ${space.id}`,
      });

      addReservation({
        id_espacio: space.id,
        nombre: space.nombre || `Espacio ${space.id}`,
        ubicacion: "Presencial",
        fecha: selectedDate.toISOString(),
        calendarEventId: eventId,
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Reserva agendada!", `Tu reserva fue añadida al calendario.`);
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el evento.");
    }
  };

  const handleReservar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "date",
      minimumDate: new Date(),
      onChange: (event, selectedDate) => {
        if (!selectedDate) return;
        DateTimePickerAndroid.open({
          value: selectedDate,
          mode: "time",
          is24Hour: true,
          onChange: (timeEvent, selectedTime) => {
            if (selectedTime) createCalendarEvent(selectedTime);
          },
        });
      },
    });
  };

  if (!space) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 py-3 flex-row items-center bg-[#f8fafc] border-b border-gray-200">
        <Pressable
          onPress={handleGoBack}
          className="p-2 bg-white rounded-full shadow-sm border border-gray-100"
        >
          <Ionicons name="arrow-back" size={22} color="#4f46e5" />
        </Pressable>
        <Text className="flex-1 text-center text-gray-800 font-bold text-lg pr-10">
          Detalle CoWorking
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-4 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <Text className="text-gray-800 font-bold text-2xl mb-4">
            {space.nombre}
          </Text>

          <View className="gap-4">
            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Capacidad</Text>
              <Text className="text-gray-700 text-base font-medium">{space.capacidad} personas</Text>
            </View>

            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Estado</Text>
              <Text className={`text-base font-bold ${space.ocupado ? "text-red-500" : "text-emerald-500"}`}>
                {space.ocupado ? "Ocupado" : "Libre / Disponible"}
              </Text>
            </View>

            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Características</Text>
              <Text className="text-gray-700 text-sm leading-5">
                {Array.isArray(space.servicios) ? space.servicios.join(" • ") : space.servicios || "WiFi de alta velocidad, Café ilimitado, Aire acondicionado."}
              </Text>
            </View>

            <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Precio sugerido</Text>
              <Text className="text-indigo-600 font-extrabold text-2xl">$ {space.precio_hora || "5.00"} / hr</Text>
            </View>
          </View>

          <Pressable
            onPress={handleReservar}
            disabled={space.ocupado}
            className={`mt-6 py-4 rounded-xl items-center shadow-sm ${space.ocupado ? "bg-gray-300" : "bg-indigo-600 active:bg-indigo-700"}`}
          >
            <Text className="text-white font-bold text-base">
              {space.ocupado ? "Espacio No Disponible" : "Agendar en Calendario"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}