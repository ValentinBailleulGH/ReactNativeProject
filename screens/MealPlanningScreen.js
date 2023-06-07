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
        dayIndex: state.dayIndex === action.nbJours - 1 ? 0 : state.dayIndex + 1
      }
    case 'previous_day':
      return {
        dayIndex: state.dayIndex === 0 ? action.nbJours - 1 : state.dayIndex - 1
      }
    default:
      throw Error('Unknow action.')
  }
}

export default function MealPlanningScreen () {
  const [dayIndexState, dispatchDayIndex] = useReducer(dayReducer, {
    dayIndex: 0
  })
  const { mealToPlan, setMealToPlan } = useContext(MealPlanContext)

  const currentDay = Object.keys(mealToPlan)[dayIndexState.dayIndex]

  const getDailyCalories = () => {
    let dailySumCalories = 0

    for (const meal in mealToPlan[currentDay]) {
      const { nutrients: foodNutrients } = mealToPlan[currentDay][meal]

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
          <Card.Title title={currentDay} />
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
              onPress={() =>
                dispatchDayIndex({
                  type: 'previous_day',
                  nbJours: Object.keys(mealToPlan).length
                })
              }
            />
            <IconButton
              icon="arrow-right"
              onPress={() =>
                dispatchDayIndex({
                  type: 'next_day',
                  nbJours: Object.keys(mealToPlan).length
                })
              }
            />
          </Card.Actions>
        </Card>
        <Text>{getDailyCalories()}</Text>
      </View>
    </MainView>
  )
}
