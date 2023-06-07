import React, { useState } from 'react'
import { View } from 'react-native'
import { Modal, Portal, Button, RadioButton, Chip } from 'react-native-paper'

import styles from '../styles'

export default function MealPlanSelectionModal ({
  modalIsVisible,
  handleConfirmSelectMealPlan,
  handleAbortSelectMealPlan
}) {
  const MEAL_PLAN_LABELS = ['Breakfast', 'Lunch', 'Snack', 'Dinner']
  const [selectedMealPlan, setSelectedMealPlan] = useState(MEAL_PLAN_LABELS[0])

  const DAYS_LABEL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [selectedDay, setSelectedDay] = useState(DAYS_LABEL[0])

  return (
    <Portal>
      <Modal
        visible={modalIsVisible}
        onDismiss={handleAbortSelectMealPlan}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20, marginHorizontal: 20 }}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <RadioButton.Group
            value={selectedDay}
            onValueChange={(value) => setSelectedDay(value)}
          >
            {
              DAYS_LABEL.map((value, key) =>
                <RadioButton.Item label={value} value={value} key={key} />
              )
            }
          </RadioButton.Group>

          <RadioButton.Group
            value={selectedMealPlan}
            onValueChange={(value) => setSelectedMealPlan(value)}
          >
            {
              MEAL_PLAN_LABELS.map((value, key) =>
                <RadioButton.Item label={value} value={value} key={key} />
              )
            }
          </RadioButton.Group>
        </View>

        <Button onPress={() => handleConfirmSelectMealPlan(selectedMealPlan)}>
          Confirm
        </Button>
      </Modal>
    </Portal>
  )
}
