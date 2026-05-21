import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Pantallas
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import EBooksScreen from '../screens/EBooksScreen';
import CoWorkingScreen from '../screens/CoWorkingScreen';
import MyBooksScreen from '../screens/MyBooksScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#4f46e5',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 60, paddingBottom: 10 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
                    else if (route.name === 'EBooks') iconName = focused ? 'book' : 'book-outline';
                    else if (route.name === 'CoWorking') iconName = focused ? 'people' : 'people-outline';
                    else if (route.name === 'MyBooks') iconName = focused ? 'library' : 'library-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar' }} />
            <Tab.Screen name="EBooks" component={EBooksScreen} options={{ title: 'Tienda' }} />
            <Tab.Screen name="CoWorking" component={CoWorkingScreen} options={{ title: 'Cowork' }} />
            <Tab.Screen name="MyBooks" component={MyBooksScreen} options={{ title: 'Mis Libros' }} />
        </Tab.Navigator>
    );
}