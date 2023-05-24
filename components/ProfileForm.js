import { View, Text } from 'react-native'
import React, { useState } from 'react'

import Slider from '@react-native-community/slider'
import styles from '../styles'
import { Picker } from '@react-native-picker/picker'

export default function ProfileForm () {
  const [age, setAge] = useState(undefined)
  const [gender, setGender] = useState(undefined)

  return (
    <View style={{ display: 'flex', alignItems: 'center', backgroundColor: 'lightblue', paddingTop: 20, minHeight: '100%' }}>

      {/* AGE */}
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.settingsTitle}>{age ? `Age: ${age}` : 'Select your age'}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={15}
          maximumValue={80}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(newValue) => setAge(newValue.toFixed(0))}
        />
      </View>

      {/* GENDER */}
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.settingsTitle}>{gender ? `Gender: ${gender}` : 'Select your gender'}</Text>
        <Picker style={{ width: 200 }}
          selectedValue={gender}
          onValueChange={(newValue) => setGender(newValue)}
        >
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

    </View>
  )
}
