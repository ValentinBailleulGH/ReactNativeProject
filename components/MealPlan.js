import React from 'react'
import { List } from 'react-native-paper'
import MealFoodsDisplay from './MealFoodsDisplay'

export default function MealPlan ({
  mealPlan,
  handleDeleteFood
}) {
  return (
    <List.AccordionGroup>
      {mealPlan.map(({ title: mealPlan, data }, index) => {
        return (
          <MealFoodsDisplay mealPlan={mealPlan} data={data} handleDeleteFood={handleDeleteFood} key={index + 1} />
        )
      })}
    </List.AccordionGroup>
  )
}
