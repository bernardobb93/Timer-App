import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-community/picker';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Contador from './Contador';


export default function App() {
  console.disableYellowBox=true;
const [estado,setarEstado] = useState('leitura');
const [segundos,setarSegundos] = useState(1);
const [minutos,setarMinutos] = useState(0);
const [alarmSound,setarAlarmeSound] = useState([
  {
    id:1,
    selecionado: true,
    som:'Alarme 1',
    file: require('./assets/audio1.mp3')
  },
  {
    id:2,
    selecionado: false,
    som:'Alarme 2',
    file:require('./assets/audio2.mp3')
  },
  {
    id:3,
    selecionado: false,
    som:'Alarme 3',
    file:require('./assets/audio3.mp3')
  },
]);
var numeros=[];
for(var i = 1; i<=60; i++){
  numeros.push(i);
}

function setarAlarme(id){
  let alarmesTemp=alarmSound.map(function(val){
    if(id!=val.id)
    val.selecionado=false;
    else
    val.selecionado=true;
    return val;
  })
  setarAlarmeSound(alarmesTemp);
}


if(estado == 'leitura'){
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
       <LinearGradient
        // Background Linear Gradient
        colors={['rgba(237, 102, 24,1)', 'rgba(237, 102, 24,0.6)']}
        style={{
          position:'absolute',
          left:0,
          right:0,
          top:0,
          height:'100%',
        }}

      />
      <Text style={{color:'white',fontSize:30}}>Selecione o seu tempo:</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'white',paddingTop:18}}>Min:</Text>
      <Picker  
      selectedValue={minutos}
      style={{height:50,width:150,color:'white'}}
      onValueChange={(itemValue, itemIndex) =>
        setarMinutos(itemValue)
      }
      >
        <Picker.Item label='0' value='0'/>
        {
          numeros.map(function(val){
            return (<Picker.Item label={val.toString()} value={val.toString()}/>);
          })
        
        }
      </Picker>
      <Text style={{color:'white',paddingTop:18}}>Seg:</Text>
      <Picker  
      selectedValue={segundos}
      style={{height:50,width:150,color:'white'}}
      onValueChange={(itemValue, itemIndex) =>
        setarSegundos(itemValue)
      }
      >
        
         {
          numeros.map(function(val){
            return (<Picker.Item label={val.toString()} value={val.toString()}/>);
          })
        
        }
      </Picker>
           
      </View>

      <View style={{flexDirection:'row'}}>
        {
          alarmSound.map(function(val){
            if(val.selecionado){
            return (<TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.btnEscolherSelecionado}>
          <Text style={{color:'white', fontSize:20}}>{val.som}</Text>
          </TouchableOpacity>);
          }else{
            return (<TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.btnEscolher}>
              <Text style={{color:'white', fontSize:20}}>{val.som}</Text>
              </TouchableOpacity>);

          }
        
        })
          
        }
        </View>
        <TouchableOpacity onPress={()=>setarEstado('iniciar')} style={styles.btnIniciar}>
          <Text style={styles.txtBtnIniciar}>Iniciar</Text>
          </TouchableOpacity>
    </View>
  );
      }else if(estado=='iniciar'){
        return(
        <Contador 
        alarmes={alarmSound}
        setarMinutos={setarMinutos}
        setarSegundos={setarSegundos}
        setarEstado={setarEstado}
        minutos={minutos} 
        segundos={segundos}>         
        </Contador>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgb(237, 102, 24)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEscolher:{
    marginRight:10,
    padding:8,
    backgroundColor:'rgb(250, 99, 12)',
  },
  btnEscolherSelecionado:{
    marginRight:10,
    padding:8,
    backgroundColor:'rgba(250, 99, 12,0.4)',
    borderColor:'black',
    borderWidth:1,
  },
  txtBtnIniciar:{
    textAlign:'center',
    paddingTop:25,
    fontSize:15,
    color:'white'
  },
  btnIniciar:{
    width:80,
    height:80,
    borderRadius:50,
    marginTop:20,
    backgroundColor:'rgb(250, 99, 12)',
    borderColor:'white',
    borderWidth:1,
  },
});
