import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet} from 'react-native';


const usePickerUbicaciones = (label , items) => {
    
  const [state , setState] = useState('');

  const selectUbicaciones = () => (

    <RNPickerSelect
      placeholder = {{
          label: label,
          value: null,
          color: '#3b3b3b',}
      }
      style={pickerSelectStyles}
      value ={state}
      onValueChange={ value => ( setState(value)) }
      items={items.map(item => (
        {
           key: item.key,
           label: item.label,
           value: item.value,
        }))}
    />

  )
    /* retornando nuestra funcion */
    return [ state ,selectUbicaciones];
        
    
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: '#3b3b3b',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      width: '100%',
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: '#3b3b3b',
      borderRadius: 8,
      color: '#3b3b3b',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

export default usePickerUbicaciones