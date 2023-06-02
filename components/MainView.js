import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

import styles from '../styles'

export default function MainView ({ children }) {
  return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: styles.colors.BackgroundColor }}>
          { children }
        </SafeAreaView>
      </SafeAreaProvider>
  )
}
