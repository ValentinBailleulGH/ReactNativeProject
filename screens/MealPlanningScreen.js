import React, { useReducer, useContext, useEffect } from 'react'
import { View } from 'react-native'
import { Card, IconButton, Text, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import MainView from '../components/MainView'
import MealPlan from '../components/MealPlan'
import { MealPlanContext } from '../services/MealPlanContext'
import TabTitle from '../components/TabTitle'

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

export default function MealPlanningScreen ({ navigation }) {
  const [dayIndexState, dispatchDayIndex] = useReducer(dayReducer, {
    dayIndex: 0
  })
  const { mealToPlan, setMealToPlan } = useContext(MealPlanContext)
  const currentDay = Object.keys(mealToPlan)[dayIndexState.dayIndex]

  useEffect(() => {
    saveMealPlan()
  }, [mealToPlan])

  const saveMealPlan = async () => {
    try {
      const mealToPlanJsonValue = JSON.stringify(mealToPlan)
      await AsyncStorage.setItem('mealToPlan', mealToPlanJsonValue)
    } catch (e) {
      throw Error('Error saving meal plan to async storage')
    }
  }

  const handleDeleteFood = (mealPlan, foodToRemove) => {
    const indexToRemove = mealToPlan[currentDay][mealPlan].findIndex(
      (food) => food === foodToRemove
    )

    if (indexToRemove === -1) {
      throw Error("Element doesn't exist in mealToPlan")
    }

    const updatedMealPlan = [...mealToPlan[currentDay][mealPlan]]
    updatedMealPlan.splice(indexToRemove, 1)

    setMealToPlan({
      ...mealToPlan,
      [currentDay]: {
        ...mealToPlan[currentDay],
        [mealPlan]: updatedMealPlan
      }
    })
  }

  const getDailyCalories = () => {
    let dailySumCalories = 0

    for (const mealPlan in mealToPlan[currentDay]) {
      const foods = mealToPlan[currentDay][mealPlan]
      for (const food of foods) {
        const { nutrients: foodNutrients, quantity } = food
        const nutrimentKey = 'ENERC_KCAL'
        const nutrimentValueByQuantity =
          (foodNutrients[nutrimentKey] * (quantity ?? 1000)) / 1000
        dailySumCalories += nutrimentValueByQuantity
      }
    }

    return dailySumCalories
  }

  return (
    <MainView>
      <TabTitle tabTitle='Plan your meals' />

      <View>
        <Card>
          <Card.Title title={currentDay} />
          <Card.Content>
            <MealPlan
              mealPlan={Object.entries(mealToPlan[currentDay]).map(
                ([meal, food]) => ({
                  title: meal,
                  data: [...food]
                })
              )}
              handleDeleteFood={handleDeleteFood}
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
        <Text variant="titleMedium">{getDailyCalories()}</Text>
        <View style={{ marginHorizontal: 10 }}>
          <Button
            mode="contained"
            buttonColor="green"
            onPress={() => navigation.navigate('FoodDatabase')}
          >
            Add food to your Meal Planning
          </Button>
        </View>
      </View>
    </MainView>
  )
}
