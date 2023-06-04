import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import styles from '../styles'

const DisplayEmptyWarning = ({ value }) => {
  return !value
    ? <Text style={{ color: styles.colors.ErrorText }}>This field cannot be empty</Text>
    : null
}

export default function ProfileForm () {
  const [age, setAge] = useState(undefined)
  const [gender, setGender] = useState(undefined)
  const [height, setHeight] = useState(undefined)
  const [weight, setWeight] = useState(undefined)
  const [activity, setActivity] = useState(undefined)
  const [goal, setGoal] = useState(undefined)

  return (
    <View style={styles.profileForm}>
      {/* AGE */}
      <View style={styles.flexCenter}>
        <View style={styles.flexRowCenter}>
          <Text style={styles.settingsTitle}>Your age :</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="-"
            keyboardType="numeric"
            maxLength={2}
            style={ age ? styles.profileTextAnswer : styles.profilePlaceholderText }
          />
        </View>
        {age ? null : <DisplayEmptyWarning />}
      </View>

      {/* GENDER */}
      <View style={styles.flexCenter}>
        <Text style={styles.settingsTitle}>Your gender :</Text>
        <View style={styles.flexRowCenter}>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: gender === 'male' ? '#ccc' : '#fff' }]}
            onPress={() => setGender('male')}
          >
            <Ionicons name="male" size={16} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icon, { backgroundColor: gender === 'female' ? '#ccc' : '#fff' }]}
            onPress={() => setGender('female')}
          >
            <Ionicons name="female" size={16} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icon, { backgroundColor: gender === 'other' ? '#ccc' : '#fff' }]}
            onPress={() => setGender('other')}
          >
            <Ionicons name="body" size={16} />
          </TouchableOpacity>
        </View>
        {gender ? null : <DisplayEmptyWarning />}
      </View>

      {/* HEIGHT */}
      <View style={styles.flexCenter}>
        <View style={styles.flexRowCenter}>
          <Text style={styles.settingsTitle}>Your height :</Text>
          <TextInput
            value={height}
            onChangeText={setHeight}
            placeholder="in cm"
            keyboardType="numeric"
            maxLength={3}
            style={ height ? styles.profileTextAnswer : styles.profilePlaceholderText }
          />
        </View>
        {height ? null : <DisplayEmptyWarning />}
      </View>

      {/* WEIGHT */}
      <View style={styles.flexCenter}>
        <View style={styles.flexRowCenter}>
          <Text style={styles.settingsTitle}>Your weight :</Text>
          <TextInput
            value={weight}
            onChangeText={setWeight}
            placeholder="in kg"
            keyboardType="numeric"
            maxLength={3}
            style={ weight ? styles.profileTextAnswer : styles.profilePlaceholderText }
          />
        </View>
        {weight ? null : <DisplayEmptyWarning />}
      </View>

      {/* ACTIVITY */}
      <View style={styles.flexCenter}>
        <Text style={styles.settingsTitle}>Your activity level :</Text>
        <View style={styles.flexRowCenter}>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: activity === '0' ? '#ccc' : '#fff' }]}
            onPress={() => setActivity('0')}
          >
            <Ionicons name="remove" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: activity === '1' ? '#ccc' : '#fff' }]}
            onPress={() => setActivity('1')}
          >
            <Ionicons name="reorder-two" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: activity === '2' ? '#ccc' : '#fff' }]}
            onPress={() => setActivity('2')}
          >
            <Ionicons name="reorder-three" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: activity === '3' ? '#ccc' : '#fff' }]}
            onPress={() => setActivity('3')}
          >
            <Ionicons name="reorder-four" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: activity === '4' ? '#ccc' : '#fff' }]}
            onPress={() => setActivity('4')}
          >
            <Ionicons name="flame" size={16} />
          </TouchableOpacity>
        </View>
        {activity ? null : <DisplayEmptyWarning />}
      </View>

      {/* GOAL */}
      <View style={styles.flexCenter}>
        <Text style={styles.settingsTitle}>Your weight change goal :</Text>
        <View style={styles.flexRowCenter}>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: goal === 'down' ? '#ccc' : '#fff' }]}
            onPress={() => setGoal('down')}
          >
            <Ionicons name="trending-down" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: goal === 'stable' ? '#ccc' : '#fff' }]}
            onPress={() => setGoal('stable')}
          >
            <Ionicons name="reorder-two" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: goal === 'up' ? '#ccc' : '#fff' }]}
            onPress={() => setGoal('up')}
          >
            <Ionicons name="trending-up" size={16} />
          </TouchableOpacity>
        </View>
        {goal ? null : <DisplayEmptyWarning />}
      </View>
    </View>
  )
}
