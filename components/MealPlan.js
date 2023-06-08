import React from 'react'
import { List } from 'react-native-paper'
import MealFoodsDisplay from './MealFoodsDisplay'

export default function MealPlan ({
  mealPlan
}) {
  console.log('meal plan : ', mealPlan)

  return (
    <List.AccordionGroup>
      {mealPlan.map(({ title, data }, index) => {
        return (
          <MealFoodsDisplay title={title} data={data} key={index + 1} />
        )
      })}
    </List.AccordionGroup>
  )
}
