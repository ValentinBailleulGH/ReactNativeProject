import React, { useState } from 'react'
import { Modal, Portal, Button, RadioButton } from 'react-native-paper'

export default function MealPlanSelectionModal ({
  modalIsVisible,
  handleConfirmSelectMealPlan,
  handleAbortSelectMealPlan
}) {
  const MEAL_PLAN_LABELS = ['Breakfast', 'Lunch', 'Snack', 'Dinner']
  const [selectedMealPlan, setSelectedMealPlan] = useState(MEAL_PLAN_LABELS[0])

  return (
    <Portal>
      <Modal
        visible={modalIsVisible}
        onDismiss={handleAbortSelectMealPlan}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
      >
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

        <Button onPress={() => handleConfirmSelectMealPlan(selectedMealPlan)}>
          Confirm
        </Button>
      </Modal>
    </Portal>
  )
}
