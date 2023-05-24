import { View, Text } from 'react-native'
import React from 'react'

import MainView from '../components/MainView'
import HeaderBar from '../components/HeaderBar'

export default function HealthGoalsScreen ({ route, navigation }) {
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
