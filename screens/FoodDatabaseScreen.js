import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import {
  Text,
  Searchbar,
  Card,
  List,
  IconButton,
  FAB
} from 'react-native-paper'

import MainView from '../components/MainView'
import MealPlanSelectionModal from '../components/MealPlanSelectionModal'
import MealPlanCartModal from '../components/MealPlanCartModal'
import FoodApiService from '../services/FoodApiService'

export default function FoodDatabaseScreen ({ route }) {
  const [displayMealPlanSelectionModal, setDisplayMealPlanSelectionModal] =
    React.useState(false)
  const [displayMealPlanCartModal, setDisplayMealPlanCartModal] =
    React.useState(false)
  const [foodSelected, setFoodSelected] = React.useState('')
  const [foodNameToSearch, setFoodNameToSearch] = React.useState('')
  const [hintResults, setHintsResults] = React.useState([])
  const [mealToPlan, setMealToPlan] = React.useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: []
  })

  const handlePressSearchFoodIcon = () => {
    if (!foodNameToSearch) {
      return
    }

    FoodApiService.getFoods(foodNameToSearch)
      .then((response) => {
        setHintsResults(response.hints)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleConfirmSelectMealPlan = (selectedMealPlan) => {
    setMealToPlan({
      ...mealToPlan,
      [selectedMealPlan]: [...mealToPlan[selectedMealPlan], foodSelected]
    })
    handleAbortSelectMealPlan()
  }

  const handleAbortSelectMealPlan = () => {
    setDisplayMealPlanSelectionModal(false)
  }

  const handleDismissMealPlanCartModal = () => {
    setDisplayMealPlanCartModal(false)
  }

  const renderFood = (food) => {
    const { label: foodLabel, nutrients: foodNutrients } = food

    const LABELS_NUTRIMENTS = [
      'Calories/Energie',
      'Protéines',
      'Lipides',
      'Glucides',
      'Fibre alimentaire'
    ]

    return (
      <Card>
        <Card.Title title={foodLabel} />
        <Card.Content>
          {Object.values(foodNutrients).map((nutrimentValue, index) => {
            return (
              <List.Item
                key={index}
                title={`${LABELS_NUTRIMENTS[index]} : ${nutrimentValue}`}
              />
            )
          })}
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="plus"
            rippleColor={'green'}
            onPress={() => {
              setFoodSelected(food)
              setDisplayMealPlanSelectionModal(true)
            }}
          />
        </Card.Actions>
      </Card>
    )
  }

  return (
    <MainView>
      <View>
        <Text variant="displaySmall">Rechercher un aliment</Text>
        <View>
          <Searchbar
            label="Chercher un aliment"
            value={foodNameToSearch}
            onChangeText={setFoodNameToSearch}
            onSubmitEditing={handlePressSearchFoodIcon}
            onIconPress={handlePressSearchFoodIcon}
          />
          <FlatList
            data={hintResults}
            renderItem={({ item: { food } }) => renderFood(food)}
            keyExtractor={({ food }) => `${food.foodId}-${food.label}`}
          />
        </View>
      </View>
      <MealPlanSelectionModal
        modalIsVisible={displayMealPlanSelectionModal}
        handleConfirmSelectMealPlan={handleConfirmSelectMealPlan}
        handleAbortSelectMealPlan={handleAbortSelectMealPlan}
      />
      <MealPlanCartModal
        modalIsVisible={displayMealPlanCartModal}
        mealPlan={Object.entries(mealToPlan).map(([key, value]) => ({
          title: key,
          data: [...value]
        }))}
        handleDismissMealPlanCartModal={handleDismissMealPlanCartModal}
      />
      <FAB
        style={styles.fab}
        disabled={displayMealPlanSelectionModal}
        icon="cart"
        onPress={() => setDisplayMealPlanCartModal(true)}
      />
    </MainView>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
})
