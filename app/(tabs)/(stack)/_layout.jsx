import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen
        name="books/[id]"
        options={{
          headerShown: true,
          title: 'Detalle del Libro',
          headerTintColor: '#4f46e5',
          headerStyle: { backgroundColor: '#f8fafc' },
        }}
      />
      <Stack.Screen
        name="coworking/[id]"
        options={{
          headerShown: true,
          title: 'Detalle CoWorking',
          headerTintColor: '#4f46e5',
          headerStyle: { backgroundColor: '#f8fafc' },
        }}
      />
    </Stack>
  );
}