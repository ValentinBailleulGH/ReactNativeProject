import React from 'react'
import { Modal, Portal, Button } from 'react-native-paper'
import MealPlan from './MealPlan'

export default function MealPlanSelectionModal ({
  modalIsVisible,
  mealPlan,
  handleDismissMealPlanCartModal
}) {
  return (
    <Portal>
      <Modal
        visible={modalIsVisible}
        onDismiss={handleDismissMealPlanCartModal}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
      >
        <MealPlan mealPlan={mealPlan} />
        <Button onPress={() => handleDismissMealPlanCartModal()}>Fermer</Button>
      </Modal>
    </Portal>
  )
}
