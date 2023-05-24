import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

export default function MainView ({ children }) {
  return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          { children }
        </SafeAreaView>
      </SafeAreaProvider>
  )
}
