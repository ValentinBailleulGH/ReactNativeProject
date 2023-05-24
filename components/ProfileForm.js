import { View } from 'react-native'
import React, { useState } from 'react'

import SelectGender from './SelectGender'
import SelectAge from './SelectAge'

export default function ProfileForm () {
  const [age, setAge] = useState(undefined)
  const [gender, setGender] = useState(undefined)

  return (
      <View style={{ display: 'flex', alignItems: 'center', backgroundColor: 'green', paddingTop: 20, minHeight: '100%' }}>
        <SelectAge age={age} setAge={setAge}/>
        <SelectGender gender={gender} setGender={setGender} />
      </View>
  )
}
