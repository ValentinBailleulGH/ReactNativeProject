import { Text, View, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// #region Setup
// const styles = {
//   flexCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
// }

const MainView = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        { children }
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const ViewsHandler = () => {
  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HealthGoals">
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

const HeaderBar = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightgreen', padding: 16 }}>
      <View>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png'
          }}
          style={{ width: 30, height: 30 }}
        />
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>
        OnlyGains
      </Text>
    </View>
  )
}
// #endregion

// #region Screens
const HealthGoalsScreen = ({ route, navigation }) => {
  return (
    <MainView>
      <HeaderBar />
      <View>
        <Text>
          HealthGoals screen
        </Text>
      </View>
    </MainView>
  )
}

const FoodDatabaseScreen = ({ route }) => {
  return (
    <MainView>
      <View>
        <Text>FoodDatabase Screen</Text>
      </View>
    </MainView>
  )
}

const MealPlanningScreen = () => {
  return (
    <MainView>
      <View>
        <Text>MealPlanning Screen</Text>
      </View>
    </MainView>
  )
}

const ProfileScreen = () => {
  return (
    <MainView>
      <View>
        <Text>Profile Screen</Text>
      </View>
    </MainView>
  )
}
// #endregion

export default function App () {
  return (
    <ViewsHandler />
  )
}
