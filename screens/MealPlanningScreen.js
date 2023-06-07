import React, { useReducer, useContext } from 'react'
import { View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'

import MainView from '../components/MainView'
import MealPlan from '../components/MealPlan'
import { MealPlanContext } from '../services/MealPlanContext'

function dayReducer (state, action) {
  switch (action.type) {
    case 'next_day':
      return {
        dayIndex:
          state.dayIndex === action.days.length - 1 ? 0 : state.dayIndex + 1
      }
    case 'previous_day':
      return {
        dayIndex:
          state.dayIndex === 0 ? action.days.length - 1 : state.dayIndex - 1
      }
    default:
      throw Error('Unknow action.')
  }
}

export default function MealPlanningScreen () {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
  const [dayIndexState, dispatchDayIndex] = useReducer(dayReducer, {
    dayIndex: 0
  })
  const { mealToPlan, setMealToPlan } = useContext(MealPlanContext)

  const getDailyCalories = () => {
    let dailySumCalories = 0

    for (const meal in mealToPlan[days[0]]) {
      const { nutrients: foodNutrients } = mealToPlan[days[0]][meal]

      for (const nutrimentKey in foodNutrients) {
        const nutrimentValue = foodNutrients[nutrimentKey]
        dailySumCalories += nutrimentValue
      }
    }

    return dailySumCalories
  }

  return (
    <MainView>
      <View>
        <Card>
          <Card.Title title={days[dayIndexState.dayIndex]} />
          <Card.Content>
            <MealPlan
              mealPlan={Object.entries(mealToPlan).map(([key, value]) => ({
                title: key,
                data: [...value]
              }))}
            />
          </Card.Content>
          <Card.Actions>
            <IconButton
              icon="arrow-left"
              onPress={() => dispatchDayIndex({ type: 'previous_day', days })}
            />
            <IconButton
              icon="arrow-right"
              onPress={() => dispatchDayIndex({ type: 'next_day', days })}
            />
          </Card.Actions>
        </Card>
        <Text>{getDailyCalories()}</Text>
      </View>
    </MainView>
  )
}
