import React, { useState } from 'react'
import { View, Alert, TextInput } from 'react-native'
import {
  Text,
  Modal,
  Portal,
  Button,
  Chip
} from 'react-native-paper'
import DisplayWarning from '../components/DisplayWarning'

const SectionTitle = ({ title }) => {
  return (
    <View style={styles.modalTitleView}>
      <Text style={styles.modalTitle}>{title}</Text>
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

  const DAYS_LABEL = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  const [selectedDay, setSelectedDay] = useState(DAYS_LABEL[0])
  const [quantity, setQuantity] = useState('')

  const onQuantitySubmit = () => {
    const minQuantity = 1
    const maxQuantity = 3000

    if (!quantity) {
      Alert.alert(
        'Quantity',
        'Please select your desired quantity.'
      )
      setQuantity('')
    } else if (quantity < minQuantity || quantity > maxQuantity) {
      Alert.alert(
        'Quantity',
        `Please select a weight between ${minQuantity} and ${maxQuantity} grams.`
      )
      setQuantity('')
    }
  }

  return (
    <Portal>
      <Modal
        visible={modalIsVisible}
        onDismiss={handleAbortSelectMealPlan}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          marginHorizontal: 20
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 20,
            marginBottom: 10
          }}
        >
          <View style={{ gap: 6 }}>
            <SectionTitle title="Day" />
            {DAYS_LABEL.map((myDay, key) => (
              <Chip
                selected={selectedDay === myDay}
                onPress={() => setSelectedDay(myDay)}
                showSelectedOverlay={true}
                key={key}
              >
                {myDay}
              </Chip>
            ))}
          </View>
          <View style={{ gap: 6 }}>
            <SectionTitle title="Meal" />
            {MEAL_PLAN_LABELS.map((myMeal, key) => (
              <Chip
                selected={selectedMealPlan === myMeal}
                onPress={() => setSelectedMealPlan(myMeal)}
                showSelectedOverlay={true}
                key={key}
              >
                {myMeal}
              </Chip>
            ))}

            <View style={{ marginTop: 12 }}>
              <SectionTitle title="Quantity (g)" />
              <View style={{ gap: 6 }}>
                <TextInput
                  value={quantity.toString()}
                  onChangeText={setQuantity}
                  placeholder="grams"
                  keyboardType="numeric"
                  maxLength={4}
                  onEndEditing={onQuantitySubmit}
                />
                {
                  quantity
                    ? null
                    : <DisplayWarning warningText="This field cannot be empty" />
                }
              </View>
            </View>
          </View>
        </View>

        <Button
          onPress={() =>
            handleConfirmSelectMealPlan(selectedMealPlan, selectedDay, quantity)
          }
        >
          Confirm
        </Button>
      </Modal>
    </Portal>
  )
}

const styles = {
  title: { fontSize: 18 },
  modalTitleView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 20
  }
}
