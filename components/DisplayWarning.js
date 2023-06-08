import React from 'react'
import { Text } from 'react-native-paper'
import globalStyles from '../styles'

export default function DisplayWarning({
  warningText = 'This is a warning'
}) {
  return (
    <Text style={{ color: globalStyles.colors.ErrorText }}>{warningText}</Text>
  )
}
