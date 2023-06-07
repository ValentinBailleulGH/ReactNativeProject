import React from 'react'
import { List } from 'react-native-paper'

export default function MealFoodsDisplay ({ title, data }) {
  return (
    <List.Accordion id={title} key={title} title={title}>
      {data.map(({ label: foodLabel }, index) => (
        <List.Item key={`${foodLabel}-${index}`} title={foodLabel} />
      ))}
    </List.Accordion>
  )
}
