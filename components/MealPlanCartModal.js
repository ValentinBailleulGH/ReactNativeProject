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
          {mealPlan.map((dailyMealPlan) => {
            console.log(dailyMealPlan)

            return (
              <List.Accordion
                id={dailyMealPlan.title}
                key={dailyMealPlan.title}
                title={dailyMealPlan.title}
              >
                <MealPlan
                  mealPlan={Object.entries(dailyMealPlan.data).map(([key, value]) => ({
                    title: key,
                    data: [...value]
                  }))}
                />
              </List.Accordion>
            )
          })}
        </List.AccordionGroup>
        <Button onPress={() => handleDismissMealPlanCartModal()}>Fermer</Button>
      </Modal>
    </Portal>
  )
}
