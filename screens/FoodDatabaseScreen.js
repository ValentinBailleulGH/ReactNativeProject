import React, { useState, useContext } from 'react'
import { View, FlatList, Text } from 'react-native'
import {
  Searchbar,
  List,
  IconButton
} from 'react-native-paper'

import globalStyles from '../styles'
import MainView from '../components/MainView'
import TabTitle from '../components/TabTitle'
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

  const handleConfirmSelectMealPlan = (
    selectedMealPlan,
    selectedDay,
    quantity
  ) => {
    setMealToPlan({
      ...mealToPlan,
      [selectedDay]: {
        ...mealToPlan[selectedDay],
        [selectedMealPlan]: [
          ...mealToPlan[selectedDay][selectedMealPlan],
          { ...foodSelected, quantity }
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
      'Calories',
      'Protein',
      'Fat', // lipides
      'Carbs', // glucides
      'Fibers'
    ]

    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton
          icon="plus"
          rippleColor={'green'}
          onPress={() => {
            setFoodSelected(food)
            setDisplayMealPlanSelectionModal(true)
          }}
        />
        <View style={{ flex: 1 }}>
          <List.Accordion id={foodLabel} key={foodLabel} title={foodLabel}>
            <List.Item
              title={'For 100g :'}
              style={{ backgroundColor: globalStyles.colors.SecondaryButton }}
            />
            {Object.values(foodNutrients).map((nutrimentValue, index) => {
              return (
                <List.Item
                  key={index}
                  title={`${LABELS_NUTRIMENTS[index]} : ${nutrimentValue}`}
                />
              )
            })}
          </List.Accordion>
        </View>
      </View>
    )
  }

  return (
    <MainView>
      <View>
        <TabTitle tabTitle='Search for food' />
        <View style={{ marginBottom: 20, marginHorizontal: 10, gap: 10, marginTop: 10 }}>
          <Searchbar
            label="Chercher un aliment"
            value={foodNameToSearch}
            onChangeText={setFoodNameToSearch}
            onSubmitEditing={handlePressSearchFoodIcon}
            onIconPress={handlePressSearchFoodIcon}
            placeholder="Select your food..."
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16 }}>
              ~{hintResults.length} results.
            </Text>
          </View>
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
