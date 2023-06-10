import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from '../styles'

export default function TabTitle ({ tabTitle }) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: styles.colors.PrimaryButton,
        padding: 16
      }}
    >
      <View>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png'
          }}
          style={{ width: 30, height: 30 }}
        />
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>
        {tabTitle}
      </Text>
    </View>
  )
}
