import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import globalStyles from '../styles'

export default function MainView ({ children }) {
  return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: globalStyles.colors.BackgroundColor }}>
          { children }
        </SafeAreaView>
      </SafeAreaProvider>
  )
}
