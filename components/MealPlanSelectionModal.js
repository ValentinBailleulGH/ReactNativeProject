import React, { useState } from 'react'
import { Modal, Portal, Button } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

export default function MealPlanSelectionModal({
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
        <Picker
          selectedValue={selectedMealPlan}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedMealPlan(itemValue)
          }
        >
          {MEAL_PLAN_LABELS.map((value) => {
            return <Picker.Item key={value} label={value} value={value} />
          })}
        </Picker>
        <Button onPress={() => handleConfirmSelectMealPlan(selectedMealPlan)}>
          Confirm
        </Button>
      </Modal>
    </Portal>
  )
}
