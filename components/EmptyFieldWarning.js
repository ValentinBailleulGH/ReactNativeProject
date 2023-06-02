
import React from 'react'
import { Text } from 'react-native'
import styles from '../styles'

export default function EmptyFieldWarning ({ value }) {
  return (
    !value
      ? <Text style={styles.errorText}>This field cannot be empty</Text>
      : null
  )
}
