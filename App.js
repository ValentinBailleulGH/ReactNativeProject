import React, { useEffect, useState } from 'react'
import { PaperProvider } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import ViewsHandler from './components/ViewsHandler'
import { MealPlanContext } from './services/MealPlanContext'

export default function App() {
  const [mealToPlan, setMealToPlan] = useState({
    Monday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Tuesday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Wednesday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Thursday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Friday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Saturday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Sunday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] }
  })

  useEffect(() => {
    getMealToPlanAsyncStorage()
  }, [])

  const getMealToPlanAsyncStorage = async () => {
    AsyncStorage.getItem('mealToPlan')
      .then((mealToPlanAsyncStorage) => {
        if (mealToPlanAsyncStorage !== null) {
          setMealToPlan({
            ...JSON.parse(mealToPlanAsyncStorage)
          })
        }
      })
      .catch((e) => Promise.reject(e))
  }

  return (
    <MealPlanContext.Provider value={{ mealToPlan, setMealToPlan }}>
      <PaperProvider>
        <ViewsHandler />
      </PaperProvider>
    </MealPlanContext.Provider>
  )
}
