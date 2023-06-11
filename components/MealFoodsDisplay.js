import React from 'react'
import { List } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import globalStyles from '../styles'

export default function MealFoodsDisplay ({ mealPlan, data, handleDeleteFood }) {
  return (
    <List.Accordion id={mealPlan} key={mealPlan} title={mealPlan}>
      {data.map((food, index) => (
        <List.Item
          style={{ margin: 0 }}
          key={`${food.label}-${index}`}
          title={`${food.label} (${food.quantity}g)`}
          // right={(props) => <IconButton iconColor='red' icon="delete" onPress={() => handleDeleteFood(mealPlan, food)} />}
          right={() => (
            <Ionicons
              style={{
                backgroundColor: globalStyles.colors.SecondaryButton,
                borderRadius: 10,
                paddingHorizontal: 10
              }}
              color={'red'}
              name="trash-bin"
              size={20}
              onPress={() => handleDeleteFood(mealPlan, food)}
            />
          )}
        />
      ))}
    </List.Accordion>
  )
}
