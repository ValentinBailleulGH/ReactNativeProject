import { View, Text } from 'react-native'
import React from 'react'

import Slider from '@react-native-community/slider'
import styles from '../styles'

export default function SelectAge ({ age, setAge }) {
  return (
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
  )
}
