import { View, FlatList } from 'react-native'
import { Text, Searchbar, Card, List, IconButton } from 'react-native-paper'
import React from 'react'

import MainView from '../components/MainView'
import FoodApiService from '../services/FoodApiService'

const mealToPlanReducer = (state, action) => {
  switch (action.type) {
    case 'addMealToPlan': {
      return {
        name: state.name,
        age: state.age + 1
      }
    }
    case 'removeMealToPlan': {
      return {
        name: action.nextName,
        age: state.age
      }
    }
  }
  throw Error('Unknown action: ' + action.type)
}

export default function FoodDatabaseScreen ({ route }) {
  const [foodNameToSearch, setFoodNameToSearch] = React.useState('')
  const [hintResults, setHintsResults] = React.useState([])
  const [mealToPlan, dispatchMealToPlan] = React.useReducer(mealToPlanReducer, { breakfast: [], lunch: [], snack: [], dinner: [] })

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

  const renderFood = ({ foodId, label: foodLabel, nutrients: foodNutrients }) => {
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
            onPress={() => console.log('')}
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
    </MainView>
  )
}
