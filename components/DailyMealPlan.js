import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-paper'

import MealPlan from '../components/MealPlan'

export default function MealPlanningScreen ({ day, mealPlan }) {
  return (
    <View>
      <Card>
        <Card.Title title={day} />
        <Card.Content>
          <MealPlan mealPlan={mealPlan} />
        </Card.Content>
      </Card>
    </View>
  )
}
