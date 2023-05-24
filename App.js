import { Text, View, Image, Switch } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Slider from '@react-native-community/slider'
import { Picker } from '@react-native-picker/picker'

// #region Setup
const styles = {
  flexCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  settingsTitle: { fontSize: 18 }
}

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
        <ProfileForm />
      </View>
    </MainView>
  )
}
// #endregion

const SelectAge = ({ age, setAge }) => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.settingsTitle}>{age ? `Age: ${age}` : 'Select your age'}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={15}
          maximumValue={80}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(newValue) => setAge(newValue.toFixed(0))}
        />
      </View>
  )
}
const SelectGender = ({ gender, setGender }) => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.settingsTitle}>{gender && gender !== '-' ? `Gender: ${gender}` : 'Select your gender'}</Text>
        <Picker style={{ width: 200 }}
          selectedValue={gender}
          onValueChange={(v) => setGender(v)}
        >
          <Picker.Item label=" " value="-" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
    </View>
  )
}

const ProfileForm = () => {
  const [age, setAge] = useState(undefined)
  const [gender, setGender] = useState(undefined)

  return (
    <View style={{ display: 'flex', alignItems: 'center', backgroundColor: 'green', paddingTop: 20, minHeight: '100%' }}>
      <SelectAge age={age} setAge={setAge}/>
      <SelectGender gender={gender} setGender={setGender} />
    </View>
  )
}

export default function App () {
  return (
    <ViewsHandler />
  )
}
