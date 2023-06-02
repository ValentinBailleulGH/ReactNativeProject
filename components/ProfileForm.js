import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

// import Slider from '@react-native-community/slider'
import { Picker } from '@react-native-picker/picker'

// import { EmptyFieldWarning } from '../components/EmptyFieldWarning'

import styles from '../styles'

export default function ProfileForm () {
  const [age, setAge] = useState(undefined)
  const [gender, setGender] = useState(undefined)
  const [height, setHeight] = useState(undefined)

  return (
    <View style={{
      display: 'flex',
      alignItems: 'center',
      paddingTop: 32,
      minHeight: '100%',
      gap: 32
    }}>

      {/* AGE */}
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.settingsTitle}>{age ? `Age: ${age}` : 'Select your age'}</Text>
        <TextInput
          onChangeText={setAge}
          value={age}
          placeholder="Select your age"
          keyboardType="numeric"
          maxLength={2}
        />
        {!age ? <Text style={styles.errorText}>This field cannot be empty</Text> : null}
      </View>

      {/* GENDER */}
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.settingsTitle}>{gender ? `Gender: ${gender}` : 'Select your gender'}</Text>
        <Picker style={{ width: 200 }}
          selectedValue={gender}
          onValueChange={setGender}
        >
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Height */}
      <View>
        <Text style={styles.settingsTitle}>{height ? `Height: ${height}` : 'Select your height'}</Text>
        <TextInput
          onChangeText={setHeight}
          value={height}
          placeholder="Select your height (cm)"
          keyboardType="numeric"
          maxLength={3}
        />
      </View>
    </View>
  )
}
