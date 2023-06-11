import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import globalStyles from '../styles'
import { Button } from 'react-native-paper'
import TabTitle from '../components/TabTitle'
import MainView from '../components/MainView'

import DisplayWarning from '../components/DisplayWarning'

import { ProfileContext } from '../services/ProfileContext'

const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other'
}

const ACTIVITY = {
  SEDENTARY: '0',
  LIGHTLY_ACTIVE: '1',
  MODERATELY_ACTIVE: '2',
  VERYACTIVE: '3',
  SUPER_ACTIVE: '4'
}

const GOAL = {
  DOWN: '-1',
  EQUAL: '0',
  UP: '1'
}

export default function HealthGoalsScreen () {
  const [age, setAge] = useState(undefined)
  const [gender, setGender] = useState(undefined)
  const [height, setHeight] = useState(undefined)
  const [weight, setWeight] = useState(undefined)
  const [activity, setActivity] = useState(undefined)
  const [goal, setGoal] = useState(undefined)
  const [BMR, setBMR] = useState(undefined)
  const { idealCalories, setIdealCalories } = useContext(ProfileContext)
  const [allHooksTruthy, setAllHooksTruthy] = useState(false)

  useEffect(() => {
    // Check if any of the hooks are falsy
    if (!age || !gender || !height || !weight || !activity || !goal) {
      setAllHooksTruthy(false)
    } else {
      setAllHooksTruthy(true)
    }
  }, [age, gender, height, weight, activity, goal])

  useEffect(() => {
    // display BMR
    const calories = finalCaloriesIntake()
    setBMR(calories ?? undefined)
  }, [age, gender, height, weight, activity, goal])

  const getBMR = () => {
    // For men: BMR = 88.362 + (13.397 * weight in kg) + (4.799 * height in cm) - (5.677 * age in years)
    // For women: BMR = 447.593 + (9.247 * weight in kg) + (3.098 * height in cm) - (4.330 * age in years)
    // for other: mean of men and women

    if (!allHooksTruthy) return null

    const menBmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    if (gender === GENDERS.MALE) return menBmr

    const womenBmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    if (gender === GENDERS.FEMALE) return womenBmr

    return (menBmr + womenBmr) / 2
  }

  const adjustBMRWithActivityLevel = (BMR) => {
    if (!allHooksTruthy) return null
    if (!BMR) return null

    switch (activity) {
      case ACTIVITY.SEDENTARY:
        return BMR * 1.2
      case ACTIVITY.LIGHTLY_ACTIVE:
        return BMR * 1.375
      case ACTIVITY.MODERATELY_ACTIVE:
        return BMR * 1.55
      case ACTIVITY.VERYACTIVE:
        return BMR * 1.725
      case ACTIVITY.SUPER_ACTIVE:
        return BMR * 1.9
    }
  }

  const adjustBMRWithWeightGoal = (BMR) => {
    if (!allHooksTruthy) return null
    if (!BMR) return null

    switch (goal) {
      case GOAL.DOWN:
        return BMR - 500
      case GOAL.UP:
        return BMR + 500
      default:
        return BMR
    }
  }

  const finalCaloriesIntake = () => {
    try {
      if (!allHooksTruthy) {
        throw new Error('Form is not filled out')
      }

      const initialBMR = getBMR()
      const withActivityBMR = adjustBMRWithActivityLevel(initialBMR)
      const withGoalBMR = adjustBMRWithWeightGoal(withActivityBMR)
      const finalCalories = withGoalBMR.toFixed(0).toString()
      setIdealCalories(finalCalories)
      return finalCalories
    } catch (e) {
      return undefined
    }
  }

  const onAgeSubmit = () => {
    const title = 'Age'
    const minAge = 10

    if (!age) {
      Alert.alert(title, 'Please select your age.')
      setAge(null)
    } else if (age < minAge) {
      Alert.alert(title, `Please select an age above ${minAge}`)
      setAge(null)
    }
  }

  const onHeightSubmit = () => {
    const title = 'Height'
    const minHeight = 50
    const maxHeight = 220

    if (!height) {
      Alert.alert(title, 'Please select your height')
      setHeight(null)
    } else if (height < minHeight || height > maxHeight) {
      Alert.alert(
        title,
        `Please select a height between ${minHeight} and ${maxHeight}`
      )
      setHeight(null)
    }
  }

  const onWeightSubmit = () => {
    const title = 'Weight'
    const minWeight = 30
    const maxWeight = 300

    if (!weight) {
      Alert.alert(title, 'Please select your weight')
      setWeight(null)
    } else if (weight < minWeight || weight > maxWeight) {
      Alert.alert(
        title,
        `Please select a weight between ${minWeight} and ${maxWeight}`
      )
      setWeight(null)
    }
  }

  return (
    <MainView>
      <TabTitle tabTitle='Select your profile' />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>

          {/* DEVS ONLY */}
          {/* <Button
            onPress={() => {
              setAge('20')
              setGender(GENDERS.MALE)
              setHeight('180')
              setWeight('74')
              setActivity(ACTIVITY.MODERATELY_ACTIVE)
              setGoal(GOAL.EQUAL)
            }}
          >
            Auto load for developments only
          </Button> */}
          {/* DEVS ONLY */}

          <View style={styles.mainView}>
            {/* AGE */}
            <View style={globalStyles.flexCenter}>
              <View style={[globalStyles.flexRowCenter, { gap: 6 }]}>
                <Text style={styles.title}>Age :</Text>
                <TextInput
                  value={age}
                  onChangeText={setAge}
                  placeholder="-"
                  keyboardType="numeric"
                  maxLength={2}
                  onEndEditing={onAgeSubmit}
                  style={age ? styles.textAnswer : styles.placeholderText}
                />
              </View>
              {age
                ? null
                : (
                <DisplayWarning warningText="This field cannot be empty" />
                  )}
            </View>

            {/* GENDER */}
            <View style={globalStyles.flexCenter}>
              <Text style={styles.title}>Gender :</Text>
              <View style={[globalStyles.flexRowCenter, { gap: 6 }]}>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    { backgroundColor: gender === GENDERS.MALE ? '#ccc' : '#fff' }
                  ]}
                  onPress={() => setGender(GENDERS.MALE)}
                >
                  <Ionicons name="male" size={16} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.icon,
                    { backgroundColor: gender === GENDERS.FEMALE ? '#ccc' : '#fff' }
                  ]}
                  onPress={() => setGender(GENDERS.FEMALE)}
                >
                  <Ionicons name="female" size={16} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.icon,
                    { backgroundColor: gender === GENDERS.OTHER ? '#ccc' : '#fff' }
                  ]}
                  onPress={() => setGender(GENDERS.OTHER)}
                >
                  <Ionicons name="body" size={16} />
                </TouchableOpacity>
              </View>
              {gender ? null : <DisplayWarning warningText="This field cannot be empty" />}
            </View>

            {/* HEIGHT */}
            <View style={globalStyles.flexCenter}>
              <View style={[globalStyles.flexRowCenter, { gap: 6 }]}>
                <Text style={styles.title}>Height :</Text>
                <TextInput
                  value={height}
                  onChangeText={setHeight}
                  placeholder="in cm"
                  keyboardType="numeric"
                  maxLength={3}
                  onEndEditing={onHeightSubmit}
                  style={height ? styles.textAnswer : styles.placeholderText}
                />
              </View>
              {height ? null : <DisplayWarning warningText="This field cannot be empty" />}
            </View>

            {/* WEIGHT */}
            <View style={globalStyles.flexCenter}>
              <View style={[globalStyles.flexRowCenter, { gap: 6 }]}>
                <Text style={styles.title}>Weight :</Text>
                <TextInput
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="in kg"
                  keyboardType="numeric"
                  maxLength={3}
                  onEndEditing={onWeightSubmit}
                  style={weight ? styles.textAnswer : styles.placeholderText}
                />
              </View>
              {weight ? null : <DisplayWarning warningText="This field cannot be empty" />}
            </View>

            {/* ACTIVITY */}
            <View style={globalStyles.flexCenter}>
              <Text style={styles.title}>Activity level :</Text>
              <View style={[globalStyles.flexRowCenter, { gap: 6 }]}>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        activity === ACTIVITY.SEDENTARY ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setActivity(ACTIVITY.SEDENTARY)}
                >
                  <Ionicons name="remove" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        activity === ACTIVITY.LIGHTLY_ACTIVE ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setActivity(ACTIVITY.LIGHTLY_ACTIVE)}
                >
                  <Ionicons name="reorder-two" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        activity === ACTIVITY.MODERATELY_ACTIVE ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setActivity(ACTIVITY.MODERATELY_ACTIVE)}
                >
                  <Ionicons name="reorder-three" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        activity === ACTIVITY.VERYACTIVE ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setActivity(ACTIVITY.VERYACTIVE)}
                >
                  <Ionicons name="reorder-four" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        activity === ACTIVITY.SUPER_ACTIVE ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setActivity(ACTIVITY.SUPER_ACTIVE)}
                >
                  <Ionicons name="flame" size={16} />
                </TouchableOpacity>
              </View>
              {activity ? null : <DisplayWarning warningText="This field cannot be empty" />}
            </View>

            {/* GOAL */}
            <View style={globalStyles.flexCenter}>
              <Text style={styles.title}>Weight change goal :</Text>
              <View style={[globalStyles.flexRowCenter, { gap: 6 }]}>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    { backgroundColor: goal === GOAL.DOWN ? '#ccc' : '#fff' }
                  ]}
                  onPress={() => setGoal(GOAL.DOWN)}
                >
                  <Ionicons name="trending-down" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    { backgroundColor: goal === GOAL.EQUAL ? '#ccc' : '#fff' }
                  ]}
                  onPress={() => setGoal(GOAL.EQUAL)}
                >
                  <Ionicons name="reorder-two" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    { backgroundColor: goal === GOAL.UP ? '#ccc' : '#fff' }
                  ]}
                  onPress={() => setGoal(GOAL.UP)}
                >
                  <Ionicons name="trending-up" size={16} />
                </TouchableOpacity>
              </View>
              {goal ? null : <DisplayWarning warningText="This field cannot be empty" />}
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 30,
              marginBottom: 20
            }}
          >
            <Text style={styles.title}>
              {BMR
                ? `Your ideal calories intake : ${BMR}`
                : 'To access your ideal calories intake, please fill out your profile form'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </MainView>
  )
}

const styles = {
  title: { fontSize: 18 },
  textAnswer: { fontSize: 20, color: 'black' },
  placeholderText: { fontSize: 18, color: 'gray', fontStyle: 'italic' },
  mainView: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 32,
    gap: 32
  },
  icon: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 20
  }
}
