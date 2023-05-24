import { View } from 'react-native'
import React from 'react'

import MainView from '../components/MainView'
import ProfileForm from '../components/ProfileForm'

export default function ProfileScreen () {
  return (
      <MainView>
        <View>
          <ProfileForm />
        </View>
      </MainView>
  )
}
