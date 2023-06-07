import React from 'react'
import { PaperProvider } from 'react-native-paper'

import ViewsHandler from './components/ViewsHandler'
import { MealPlanContext } from './services/MealPlanContext'

export default function App () {
  const [mealToPlan, setMealToPlan] = React.useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: []
  })

  return (
    <MealPlanContext.Provider value={{ mealToPlan, setMealToPlan }}>
      <PaperProvider>
        <ViewsHandler />
      </PaperProvider>
    </MealPlanContext.Provider>
  )
}
