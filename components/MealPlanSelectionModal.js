import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Modal, Portal, Button, Chip } from 'react-native-paper'

const SectionTitle = ({ title }) => {
  return (
    <View style={_styles.modalTitleView}>
      <Text style={_styles.modalTitle}>
        {title}
      </Text>
    </View>
  )
}

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
        <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 20, marginBottom: 10 }}>
          <View style={{ gap: 6 }}>
            <SectionTitle title="Day" />
            {
              DAYS_LABEL.map((myDay, key) =>
                <Chip
                  selected={selectedDay === myDay}
                  onPress={() => setSelectedDay(myDay)}
                  showSelectedOverlay={true}
                  key={key}
                >
                  {myDay}
                </Chip>
              )
            }
          </View>
          <View style={{ gap: 6 }}>
            <SectionTitle title="Meal" />
            {
              MEAL_PLAN_LABELS.map((myMeal, key) =>
                <Chip
                  selected={selectedMealPlan === myMeal}
                  onPress={() => setSelectedMealPlan(myMeal)}
                  showSelectedOverlay={true}
                  key={key}
                >
                  {myMeal}
                </Chip>
              )
            }
          </View>
        </View>

        <Button onPress={() => handleConfirmSelectMealPlan(selectedMealPlan)}>
          Confirm
        </Button>
      </Modal>
    </Portal>
  )
}

const _styles = {
  modalTitleView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 20
  }
}
