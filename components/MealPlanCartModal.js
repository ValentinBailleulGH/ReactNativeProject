import React from 'react'
import { Modal, Portal, Button, List } from 'react-native-paper'
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
        <List.AccordionGroup>
          {Object.entries(mealPlan.data).map(([meal, values]) => {
            console.log(mealPlan)
            return (
              <List.Accordion id={meal} key={meal} title={meal}>
                {/* <MealPlan mealPlan={values} /> */}
              </List.Accordion>
            )
          })}
        </List.AccordionGroup>
        <Button onPress={() => handleDismissMealPlanCartModal()}>Fermer</Button>
      </Modal>
    </Portal>
  )
}
