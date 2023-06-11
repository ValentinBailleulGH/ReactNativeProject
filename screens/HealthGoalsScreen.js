import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import globalStyles from '../styles'
import MainView from '../components/MainView'
import TabTitle from '../components/TabTitle'
import DisplayWarning from '../components/DisplayWarning'
import { ProfileContext } from '../services/ProfileContext'

const CONSTANTS = {
  GENDERS: {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
  },
  ACTIVITY: {
    SEDENTARY: '0',
    LIGHTLY_ACTIVE: '1',
    MODERATELY_ACTIVE: '2',
    VERYACTIVE: '3',
    SUPER_ACTIVE: '4'
  },
  GOAL: {
    DOWN: '-1',
    EQUAL: '0',
    UP: '1'
  }
}

export default function HealthGoalsScreen() {
  const [age, setAge] = useState(null)
  const [gender, setGender] = useState(null)
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [activity, setActivity] = useState(null)
  const [goal, setGoal] = useState(null)
  const [BMR, setBMR] = useState(null)
  const { idealCalories, setIdealCalories } = useContext(ProfileContext)
  const allHooksTruthy = !(!age || !gender || !height || !weight || !activity || !goal)

  useEffect(() => {
    // display BMR
    const calories = finalCaloriesIntake()
    setBMR(calories)
  }, [age, gender, height, weight, activity, goal])

  const getBMR = () => {
    // For men: BMR = 88.362 + (13.397 * weight in kg) + (4.799 * height in cm) - (5.677 * age in years)
    // For women: BMR = 447.593 + (9.247 * weight in kg) + (3.098 * height in cm) - (4.330 * age in years)
    // for other: mean of men and women

    if (!allHooksTruthy) return null

    const menBmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    if (gender === CONSTANTS.GENDERS.MALE) return menBmr

    const womenBmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    if (gender === CONSTANTS.GENDERS.FEMALE) return womenBmr

    return (menBmr + womenBmr) / 2
  }

  const adjustBMRWithActivityLevel = (BMR) => {
    if (!allHooksTruthy) return null
    if (!BMR) return null

    switch (activity) {
      case CONSTANTS.ACTIVITY.SEDENTARY:
        return BMR * 1.2
      case CONSTANTS.ACTIVITY.LIGHTLY_ACTIVE:
        return BMR * 1.375
      case CONSTANTS.ACTIVITY.MODERATELY_ACTIVE:
        return BMR * 1.55
      case CONSTANTS.ACTIVITY.VERYACTIVE:
        return BMR * 1.725
      case CONSTANTS.ACTIVITY.SUPER_ACTIVE:
        return BMR * 1.9
    }
  }

  const adjustBMRWithWeightGoal = (BMR) => {
    if (!allHooksTruthy) return null
    if (!BMR) return null

    switch (goal) {
      case CONSTANTS.GOAL.DOWN:
        return BMR - 500
      case CONSTANTS.GOAL.UP:
        return BMR + 500
      default:
        return BMR
    }
  }

  const finalCaloriesIntake = () => {
    if (!allHooksTruthy) {
      return null
    }

    const initialBMR = getBMR()
    const withActivityBMR = adjustBMRWithActivityLevel(initialBMR)
    const withGoalBMR = adjustBMRWithWeightGoal(withActivityBMR)
    const finalCalories = withGoalBMR.toFixed(0).toString()
    setIdealCalories(finalCalories)
    return finalCalories
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
      <TabTitle tabTitle="Select your profile" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          {/* DEVS ONLY */}
          {/* <Button
            onPress={() => {
              setAge('20')
              setGender(CONSTANTS.GENDERS.MALE)
              setHeight('180')
              setWeight('74')
              setActivity(CONSTANTS.ACTIVITY.MODERATELY_ACTIVE)
              setGoal(CONSTANTS.GOAL.EQUAL)
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
                  onChangeText={(value) =>
                    setAge(value.replaceAll('.', '').replaceAll(',', ''))
                  }
                  placeholder="-"
                  keyboardType="numeric"
                  maxLength={2}
                  onEndEditing={onAgeSubmit}
                  style={age ? styles.textAnswer : styles.placeholderText}
                />
              </View>
              {age ? null : (
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
                    {
                      backgroundColor:
                        gender === CONSTANTS.GENDERS.MALE ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setGender(CONSTANTS.GENDERS.MALE)}
                >
                  <Ionicons name="male" size={16} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        gender === CONSTANTS.GENDERS.FEMALE ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setGender(CONSTANTS.GENDERS.FEMALE)}
                >
                  <Ionicons name="female" size={16} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        gender === CONSTANTS.GENDERS.OTHER ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setGender(CONSTANTS.GENDERS.OTHER)}
                >
                  <Ionicons name="body" size={16} />
                </TouchableOpacity>
              </View>
              {gender ? null : (
                <DisplayWarning warningText="This field cannot be empty" />
              )}
            </View>

            {/* HEIGHT */}
            <View style={globalStyles.flexCenter}>
              <View style={[globalStyles.flexRowCenter, { gap: 6 }]}>
                <Text style={styles.title}>Height :</Text>
                <TextInput
                  value={height}
                  onChangeText={(value) =>
                    setHeight(value.replaceAll('.', '').replaceAll(',', ''))
                  }
                  placeholder="in cm"
                  keyboardType="numeric"
                  maxLength={3}
                  onEndEditing={onHeightSubmit}
                  style={height ? styles.textAnswer : styles.placeholderText}
                />
              </View>
              {height ? null : (
                <DisplayWarning warningText="This field cannot be empty" />
              )}
            </View>

            {/* WEIGHT */}
            <View style={globalStyles.flexCenter}>
              <View style={[globalStyles.flexRowCenter, { gap: 6 }]}>
                <Text style={styles.title}>Weight :</Text>
                <TextInput
                  value={weight}
                  onChangeText={(value) =>
                    setWeight(value.replaceAll('.', '').replaceAll(',', ''))
                  }
                  placeholder="in kg"
                  keyboardType="numeric"
                  maxLength={3}
                  onEndEditing={onWeightSubmit}
                  style={weight ? styles.textAnswer : styles.placeholderText}
                />
              </View>
              {weight ? null : (
                <DisplayWarning warningText="This field cannot be empty" />
              )}
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
                        activity === CONSTANTS.ACTIVITY.SEDENTARY
                          ? '#ccc'
                          : '#fff'
                    }
                  ]}
                  onPress={() => setActivity(CONSTANTS.ACTIVITY.SEDENTARY)}
                >
                  <Ionicons name="remove" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        activity === CONSTANTS.ACTIVITY.LIGHTLY_ACTIVE
                          ? '#ccc'
                          : '#fff'
                    }
                  ]}
                  onPress={() => setActivity(CONSTANTS.ACTIVITY.LIGHTLY_ACTIVE)}
                >
                  <Ionicons name="reorder-two" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        activity === CONSTANTS.ACTIVITY.MODERATELY_ACTIVE
                          ? '#ccc'
                          : '#fff'
                    }
                  ]}
                  onPress={() =>
                    setActivity(CONSTANTS.ACTIVITY.MODERATELY_ACTIVE)
                  }
                >
                  <Ionicons name="reorder-three" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        activity === CONSTANTS.ACTIVITY.VERYACTIVE
                          ? '#ccc'
                          : '#fff'
                    }
                  ]}
                  onPress={() => setActivity(CONSTANTS.ACTIVITY.VERYACTIVE)}
                >
                  <Ionicons name="reorder-four" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        activity === CONSTANTS.ACTIVITY.SUPER_ACTIVE
                          ? '#ccc'
                          : '#fff'
                    }
                  ]}
                  onPress={() => setActivity(CONSTANTS.ACTIVITY.SUPER_ACTIVE)}
                >
                  <Ionicons name="flame" size={16} />
                </TouchableOpacity>
              </View>
              {activity ? null : (
                <DisplayWarning warningText="This field cannot be empty" />
              )}
            </View>

            {/* GOAL */}
            <View style={globalStyles.flexCenter}>
              <Text style={styles.title}>Weight change goal :</Text>
              <View style={[globalStyles.flexRowCenter, { gap: 6 }]}>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        goal === CONSTANTS.GOAL.DOWN ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setGoal(CONSTANTS.GOAL.DOWN)}
                >
                  <Ionicons name="trending-down" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        goal === CONSTANTS.GOAL.EQUAL ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setGoal(CONSTANTS.GOAL.EQUAL)}
                >
                  <Ionicons name="reorder-two" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.icon,
                    {
                      backgroundColor:
                        goal === CONSTANTS.GOAL.UP ? '#ccc' : '#fff'
                    }
                  ]}
                  onPress={() => setGoal(CONSTANTS.GOAL.UP)}
                >
                  <Ionicons name="trending-up" size={16} />
                </TouchableOpacity>
              </View>
              {goal ? null : (
                <DisplayWarning warningText="This field cannot be empty" />
              )}
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
