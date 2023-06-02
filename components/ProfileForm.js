import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import styles from '../styles'

const Warnin = ({ value }) => {
  return !value
    ? <Text style={styles.errorText}>This field cannot be empty</Text>
    : null
}

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
      <View style={styles.flexCenter}>
        <View style={styles.flexRowCenter}>
          <Text style={styles.settingsTitle}>Your age :</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Select your age"
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <Warnin value={age}/>
      </View>

      {/* GENDER */}
      <View style={styles.flexCenter}>
        <View style={styles.flexRowCenter}>
          <Text style={styles.settingsTitle}>Your gender :</Text>
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
        <Warnin value={age}/>
      </View>

      {/* HEIGHT */}
      <View style={styles.flexCenter}>
        <View style={styles.flexRowCenter}>
          <Text style={styles.settingsTitle}>Your height :</Text>
          <TextInput
            value={height}
            onChangeText={setHeight}
            placeholder="Select your height (cm)"
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
        <Warnin value={age}/>
      </View>
    </View>
  )
}
