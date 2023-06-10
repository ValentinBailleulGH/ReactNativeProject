import React from 'react'
import { List, IconButton } from 'react-native-paper'

export default function MealFoodsDisplay ({ mealPlan, data, handleDeleteFood }) {
  return (
    <List.Accordion id={mealPlan} key={mealPlan} title={mealPlan}>
      {data.map((food, index) => (
        <List.Item
          key={`${food.label}-${index}`}
          title={`${food.label} (${food.quantity}g)`}
          right={(props) => <IconButton iconColor='red' icon="delete" onPress={() => handleDeleteFood(mealPlan, food)} />}
        />
      ))}
    </List.Accordion>
  )
}
