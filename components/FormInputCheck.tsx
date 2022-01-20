import React from 'react'
import { View, Image } from 'react-native'
import { COLORS, icons } from '../constants'

const FormInputCheck = ({ error, value }: { error: string, value: string }) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <Image 
        source={(value === '' || (value !== "" && error === "") ? icons.correct : icons.cross)} 
        style={{ width: 20, height: 20, tintColor: (value === '') ? COLORS.gray : (value !== "" && error === "") ? COLORS.green : COLORS.red }} 
      />
    </View>
  )
}

export default FormInputCheck
