import React, { useState } from 'react'
import { PaperProvider } from 'react-native-paper'

import ViewsHandler from './components/ViewsHandler'
import { MealPlanContext } from './services/MealPlanContext'

export default function App () {
  const [mealToPlan, setMealToPlan] = useState({
    Monday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Tuesday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Wednesday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Thursday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Friday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Saturday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    Sunday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] }
  })

  return (
    <MealPlanContext.Provider value={{ mealToPlan, setMealToPlan }}>
      <PaperProvider>
        <ViewsHandler />
      </PaperProvider>
    </MealPlanContext.Provider>
  )
}
