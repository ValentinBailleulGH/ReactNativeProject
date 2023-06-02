import React from 'react'

import { Ionicons } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HealthGoalsScreen from '../screens/HealthGoalsScreen'
import FoodDatabaseScreen from '../screens/FoodDatabaseScreen'
import MealPlanningScreen from '../screens/MealPlanningScreen'
import ProfileScreen from '../screens/ProfileScreen'

import styles from '../styles'

export default function ViewsHandler () {
  const Tab = createBottomTabNavigator()
  return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HealthGoals"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveBackgroundColor: styles.colors.ActiveTab
          })}
        >
          <Tab.Screen name="HealthGoals" component={ HealthGoalsScreen }
            options={{
              tabBarLabel: 'Health Goals',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen name="FoodDatabase" component={ FoodDatabaseScreen }
            options={{
              tabBarLabel: 'Food Database',
              tabBarIcon: ({ color, size }) => (
              <Ionicons name="fast-food-outline" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen name="MealPlanning" component={ MealPlanningScreen }
            options={{
              tabBarLabel: 'Meal Planning',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-outline" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen name="Profile" component={ ProfileScreen }
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle-outline" color={color} size={size} />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  )
}
