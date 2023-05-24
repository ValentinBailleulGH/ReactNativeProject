import { View, FlatList } from 'react-native'
import { Text, Searchbar, Card, List  } from 'react-native-paper';
import React from 'react'

import MainView from '../components/MainView'
import FoodApiService from '../services/FoodApiService';

export default function FoodDatabaseScreen ({ route }) {
  const [foodNameToSearch, setFoodNameToSearch] = React.useState(undefined);
  const [hintResults, setHintsResults] = React.useState([]);

  const handlePressSearchFoodIcon = () => {
    if(!foodNameToSearch){
      return;
    }
    
    FoodApiService.getFoods(foodNameToSearch)
    .then((response) => {
      setHintsResults(response.hints);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const renderFood = ({label: foodLabel, nutrients: foodNutrients}) => {
      const LABELS_NUTRIMENTS = [
        "Calories/Energie",
        "Protéines",
        "Lipides",
        "Glucides",
        "Fibre alimentaire"
      ]
    
      return(
        <Card>
          <Card.Title title={foodLabel} />
          <Card.Content>
            {Object.values(foodNutrients).map((nutrimentValue, index) => {
              <List.Item 
                title={`${LABELS_NUTRIMENTS[index]} : ${nutrimentValue}`}
              />
            })
            }
          </Card.Content>
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
              onChangeText={(newFoodNameToSearch) => setFoodNameToSearch(newFoodNameToSearch)}
              onIconPress={handlePressSearchFoodIcon}
            />
            <FlatList
              data={hintResults}
              renderItem={(item) => {console.log('item : ', item)}}
              keyExtractor={({food}) => {food.foodId}}
            />
          </View>
        </View>
      </MainView>
  )
}
