import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          backgroundColor: "#ffffff",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "search")
            iconName = focused ? "search" : "search-outline";
          else if (route.name === "ebooks")
            iconName = focused ? "book" : "book-outline";
          else if (route.name === "coworking")
            iconName = focused ? "people" : "people-outline";
          else if (route.name === "reservations")
            iconName = focused ? "calendar" : "calendar-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Inicio" }} />
      <Tabs.Screen name="search" options={{ title: "Buscar" }} />
      <Tabs.Screen name="ebooks" options={{ title: "Tienda" }} />
      <Tabs.Screen name="coworking" options={{ title: "Cowork" }} />
      <Tabs.Screen name="reservations" options={{ title: "Mis Reservas" }} />
      <Tabs.Screen name="(stack)" options={{ href: null }} />
    </Tabs>
  );
}