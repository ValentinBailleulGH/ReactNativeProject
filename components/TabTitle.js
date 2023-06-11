import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from '../styles'

export default function TabTitle ({ tabTitle }) {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: styles.colors.PrimaryButton,
        padding: 16
      }}
    >
      <View>
        <Image
          source={require('../assets/logo_transparent.png')}
          style={
            {
              width: 70,
              height: 40
            }}
        />
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>
        {tabTitle}
      </Text>
    </View>
  )
}
