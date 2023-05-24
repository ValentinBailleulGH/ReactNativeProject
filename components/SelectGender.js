import { Text, View } from 'react-native'
import React from 'react'

import { Picker } from '@react-native-picker/picker'

import styles from '../styles'

export default function SelectGender ({ gender, setGender }) {
  return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.settingsTitle}>{gender && gender !== '-' ? `Gender: ${gender}` : 'Select your gender'}</Text>
            <Picker style={{ width: 200 }}
              selectedValue={gender}
              onValueChange={(v) => setGender(v)}
            >
              <Picker.Item label=" " value="-" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
        </View>
  )
}
