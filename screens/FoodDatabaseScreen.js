import React, { useState, useContext } from 'react'
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
import FoodApiService from '../services/FoodApiService'
import { MealPlanContext } from '../services/MealPlanContext'

export default function FoodDatabaseScreen ({ route }) {
  const [displayMealPlanSelectionModal, setDisplayMealPlanSelectionModal] =
    useState(false)
  const [foodSelected, setFoodSelected] = useState('')
  const [foodNameToSearch, setFoodNameToSearch] = useState('')
  const [hintResults, setHintsResults] = useState([])
  const { mealToPlan, setMealToPlan } = useContext(MealPlanContext)

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

  const handleConfirmSelectMealPlan = (selectedMealPlan, selectedDay) => {
    setMealToPlan({
      ...mealToPlan,
      [selectedDay]: {
        ...mealToPlan[selectedDay],
        [selectedMealPlan]: [
          ...mealToPlan[selectedDay][selectedMealPlan],
          foodSelected
        ]
      }
    })
    handleAbortSelectMealPlan()
  }

  const handleAbortSelectMealPlan = () => {
    setDisplayMealPlanSelectionModal(false)
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
        <View style={styles.titleBox}>
          <Text style={styles.title}>Rechercher un aliment</Text>
        </View>
        <View style={{ marginBottom: 20, marginHorizontal: 10, gap: 10 }}>
          <Searchbar
            label="Chercher un aliment"
            value={foodNameToSearch}
            onChangeText={setFoodNameToSearch}
            onSubmitEditing={handlePressSearchFoodIcon}
            onIconPress={handlePressSearchFoodIcon}
            placeholder='Select your food...'
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
    </MainView>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  }
})
