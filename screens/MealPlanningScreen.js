import React from 'react'
import { View } from 'react-native'
import {
  Text,
  Card
} from 'react-native-paper'

import MainView from '../components/MainView'

export default function MealPlanningScreen () {
  const days = ['Monday', 'Tuesday', 'Wenesday', 'Thursday', 'Friday']
  const [daySelected, setDaySelected] = React.useState(days[0])

  return (
      <MainView>
        <View>
          <Card>
            <Card.Title title={ daySelected } />
            <Card.Content>
              <Text variant="titleLarge">Card title</Text>
              <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
          </Card>
        </View>
      </MainView>
  )
}
