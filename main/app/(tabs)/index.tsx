import { View,Text,StyleSheet } from 'react-native'
import React from 'react'
import Screen from '@/components/Screen'

const index = () => {
  return (
    <Screen>
       <Text style={styles.text}>index</Text>
    </Screen>
  )
}

export default index

const styles = StyleSheet.create({
  text:{
    textAlign:'center',
  }
})