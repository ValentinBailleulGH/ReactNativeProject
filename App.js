import React from 'react'
import { PaperProvider } from 'react-native-paper';

import ViewsHandler from './components/ViewsHandler'

export default function App () {
  return (
    <PaperProvider>
      <ViewsHandler />
    </PaperProvider>
  )
}
