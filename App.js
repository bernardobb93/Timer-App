import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Picker } from '@react-native-community/picker';
import { StyleSheet, Text, View} from 'react-native';

export default function App() {

const [segundos,setarSegundos] = useState(0);
const [minutos,setarMinutos] = useState(0);
const [alarmSound,setarAlarmeSound] = useState([
  {
    selecionado: true,
    som:'alarme 1',
    file: 'alarm1.mp3'
  },
  {
    selecionado: false,
    som:'alarme 2',
    file:'alarm2.mp3',
  },
]);
var numeros=[];
for(var i = 1; i<=60; i++){
  numeros.push(i);
}
  return (
    <View style={styles.container}>
      <Text style={{color:'white',fontSize:30}}>Selecione o seu tempo:</Text>
      <View style={{flexDirection:'row'}}>
      <Picker  
      style={{height:50,width:100,color:'white'}}
      //</View>onValueChange={}
      >
        {
          numeros.map(function(val){
            return (<Picker.Item label={val.toString()} value={val.toString()}/>);
          })
        
        }
      </Picker>
      <Picker  
      style={{height:50,width:100,color:'white'}}
      //</View>onValueChange={}
      >
         {
          numeros.map(function(val){
            return (<Picker.Item label={val.toString()} value={val.toString()}/>);
          })
        
        }
      </Picker>
      <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(237, 102, 24)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
