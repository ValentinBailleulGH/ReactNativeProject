import React from 'react'
import { Modal, Portal, Button, List } from 'react-native-paper'

export default function MealPlanSelectionModal({
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
          {mealPlan.map(({ title, data }, index) => {
            return (
              <List.Accordion key={title} title={title} id={index + 1}>
                {data.map(({ label: foodLabel }, index) => (
                  <List.Item key={`${foodLabel}-${index}`} title={foodLabel} />
                ))}
              </List.Accordion>
            )
          })}
        </List.AccordionGroup>
        <Button onPress={() => handleDismissMealPlanCartModal()}>Fermer</Button>
      </Modal>
    </Portal>
  )
}
