import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Audio } from 'expo-av';




export default function Contador(props){
  var done = false;

   useEffect(()=>{
    const timer=setInterval(()=>{
        props.setarSegundos(props.segundos-1);
        if(props.segundos<=0){
            if(props.minutos>0){
                props.setarMinutos(minutos-1);
                props.setarSegundos(59);
            }else{
                if(!done){
                    done=true;
                    props.setarEstado('leitura');
                    props.setarMinutos(0);
                    props.setarSegundos(1);
                    playSound();
                }
            }
        }


    },1000)
    return ()=>clearInterval(timer);
  })
  
  async function playSound(){
    const soundObject = new Audio.Sound();
    try {
        var alarme;
        props.alarmes.map(function(val){
            if(val.selecionado){
                alarme=val.file;
            }
        })
        await soundObject.loadAsync(alarme);
        await soundObject.playAsync();
        
        //await soundObject.unloadAsync();
    }catch(error){

    }
}

    function resetar(){
        playSound();
        props.setarEstado('leitura');
        props.setarMinutos(0);
        props.setarSegundos(1);
  }
  
  function formatarNumero(number){
    var finalNumber="";
    if (number<10){
        finalNumber="0"+number;
    }else{
        finalNumber=number;
    }
    return finalNumber;
  }

  var segundos=formatarNumero(props.segundos);
  var minutos= formatarNumero(props.minutos);



    return(
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
      <View style={{flexDirection:'row'}}>
        <Text style={styles.textContador}>
            {minutos}:
        </Text>
        <Text style={styles.textContador}>
            {segundos}
        </Text>
      </View >
      <View>
      <TouchableOpacity onPress={()=>resetar()} style={styles.btnResetar}>
          <Text style={styles.txtBtnResetar}>Resetar</Text>
          </TouchableOpacity>
    </View>

    </View>);
}
const styles=StyleSheet.create({
container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
},
textContador:{
    color:'white',
    fontSize:55,
},
txtBtnResetar:{
    textAlign:'center',
    paddingTop:40,
    fontSize:15,
    color:'white'
  },
  btnResetar:{
    width:120,
    height:120,
    borderRadius:80,
    marginTop:20,
    backgroundColor:'rgb(250, 99, 12)',
    borderColor:'white',
    borderWidth:1,
  },
});