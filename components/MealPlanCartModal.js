import React from 'react'
import { Modal, Portal, Button, List } from 'react-native-paper'
import MealPlanDisplay from './MealPlan'

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
        <MealPlanDisplay mealPlan={mealPlan} />
        <Button onPress={() => handleDismissMealPlanCartModal()}>Fermer</Button>
      </Modal>
    </Portal>
  )
}
