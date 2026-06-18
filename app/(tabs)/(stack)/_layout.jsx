import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="books/[id]" />
      <Stack.Screen name="coworking/[id]" />
    </Stack>
  );
}