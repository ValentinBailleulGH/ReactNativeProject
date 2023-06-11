import React, { useReducer, useContext, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Card, IconButton, Text, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import MainView from '../components/MainView'
import MealPlan from '../components/MealPlan'
import { MealPlanContext } from '../services/MealPlanContext'
import TabTitle from '../components/TabTitle'

import { ProfileContext } from '../services/ProfileContext'

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
  const { idealCalories, setIdealCalories } = useContext(ProfileContext)

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

  const getDailyData = (nutrimentID, decimalPlaces) => {
    let finalData = 0

    for (const mealPlan in mealToPlan[currentDay]) {
      const foods = mealToPlan[currentDay][mealPlan]
      for (const food of foods) {
        const { nutrients: foodNutrients, quantity } = food
        const nutrimentValueByQuantity =
          (foodNutrients[nutrimentID] * quantity) / 100
        finalData += nutrimentValueByQuantity
      }
    }

    return finalData.toFixed(decimalPlaces)
  }

  const getDailyCalories = () => {
    return parseFloat(getDailyData('ENERC_KCAL', 0))
  }
  const getDailyProtein = () => {
    return parseFloat(getDailyData('PROCNT', 2))
  }
  const getDailyFat = () => {
    return parseFloat(getDailyData('FAT', 2))
  }
  const getDailyCarbs = () => {
    return parseFloat(getDailyData('CHOCDF', 2))
  }
  const getDailyFibers = () => {
    return parseFloat(getDailyData('FIBTG', 1))
  }
  const getDailyMacros = () => {
    return getDailyProtein() + getDailyFat() + getDailyCarbs()
  }
  const getDailyProteinPercentage = () => {
    return ((getDailyProtein() * 100) / getDailyMacros()).toFixed(1)
  }
  const getDailyFatPercentage = () => {
    return ((getDailyFat() * 100) / getDailyMacros()).toFixed(1)
  }
  const getDailyCarbsPercentage = () => {
    return ((getDailyCarbs() * 100) / getDailyMacros()).toFixed(1)
  }

  return (
    <MainView>
      <TabTitle tabTitle="Plan your meals" />
      <ScrollView>
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

          <View style={{ margin: 20 }}>
            <Text>{'Today stats:'}</Text>
            <View
              style={{
                margin: 10,
                gap: 12,
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <View style={{ display: 'flex', gap: 4 }}>
                <Text>Calories</Text>
                <Text>Protein</Text>
                <Text>Fat</Text>
                <Text>Carbs</Text>
                <Text>Fibers</Text>
              </View>

              <View style={{ display: 'flex', gap: 4 }}>
                <Text>{`${getDailyCalories()} cal`}</Text>
                <Text>{`${getDailyProtein()}g`}</Text>
                <Text>{`${getDailyFat()}g`}</Text>
                <Text>{`${getDailyCarbs()}g`}</Text>
                <Text>{`${getDailyFibers()}g`}</Text>
              </View>

              <View style={{ display: 'flex', gap: 4 }}>
                <Text>{`(${idealCalories}% of ideal cal intake)`}</Text>
                <Text>{`(${getDailyProteinPercentage()}% of today's macros)`}</Text>
                <Text>{`(${getDailyFatPercentage()}% of today's macros)`}</Text>
                <Text>{`(${getDailyCarbsPercentage()}% of today's macros)`}</Text>
                <Text>{null}</Text>
              </View>
            </View>
          </View>

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
      </ScrollView>
    </MainView>
  )
}
