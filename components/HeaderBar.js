import { View, Image, Text } from 'react-native'
import React from 'react'

export default function HeaderBar () {
  return (
      <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightgreen', padding: 16 }}>
        <View>
          <Image
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png'
            }}
            style={{ width: 30, height: 30 }}
          />
        </View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>
          OnlyGains
        </Text>
      </View>
  )
}
