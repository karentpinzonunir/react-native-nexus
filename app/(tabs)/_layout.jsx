import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60, paddingBottom: 10 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === '(stack)')      iconName = focused ? 'home'    : 'home-outline';
          else if (route.name === 'search')  iconName = focused ? 'search'  : 'search-outline';
          else if (route.name === 'ebooks')  iconName = focused ? 'book'    : 'book-outline';
          else if (route.name === 'coworking') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'mybooks') iconName = focused ? 'library' : 'library-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="(stack)"    options={{ title: 'Inicio' }} />
      <Tabs.Screen name="search"     options={{ title: 'Buscar' }} />
      <Tabs.Screen name="ebooks"     options={{ title: 'Tienda' }} />
      <Tabs.Screen name="coworking"  options={{ title: 'Cowork' }} />
      <Tabs.Screen name="mybooks"    options={{ title: 'Mis Libros' }} />
    </Tabs>
  );
}