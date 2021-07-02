import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import {useState, useEffect} from 'react'
import * as Location from 'expo-location'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import weather from '../api/consultApi'


export function Home() {

  const [localizacao, setLocalizacao] = useState('')
  const [atualTempp, setAtualTempp] = useState('')
  const [coordenates, setCoordenates] = useState(null);
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [rajadaVento, setRajadaVento] = useState('')
  const [humidity, setHumidade] = useState('')
  const [sensacao, setSensacao] = useState('')
  const [nascerSol, setNascerSol] = useState('')
  const [total, setTotal] = useState('')
  const [segundos, setSegundos] = useState('')
  const [minutos, setMinutos] = useState('')
  const [horas, setHoras] = useState('')

  async function realLocation(){
    let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permissão negada!!!')
      }else{
        let location = await Location.getCurrentPositionAsync({})
        await setCoordenates(location.coords)
      }
  }

  async function _weather(){
    await realLocation()
    const data = await weather(coordenates)

    setAtualTempp(graus(data[0]))
    setMin(graus(data[1]))
    setMax(graus(data[2]))
    setLocalizacao(data[3])
    setRajadaVento(data[4])
    setHumidade(data[5])
    setSensacao(graus(data[6]))
    var h = new Date().getHours()
    var m = new Date().getMinutes()
    var total = h + ":" + m
    setTotal(total)
    
    
  }

  function graus(kelvin){
    return parseInt(kelvin - 273)
  }



  useEffect(() => {
   
    _weather()

    var h = new Date().getHours()
    var m = new Date().getMinutes()
    var total = h + ":" + m

    setTotal(total)

    let dateTeste = 1560396563
    let dateFinal = new Date(dateTeste * 1000)
    
    console.log(dateFinal)
    
  }, [])

  

  return (
      // <SafeAreaView>
      <View style={styles.container}>
      
        <TouchableOpacity style={styles.refreshButton} onPress={() => _weather()} activeOpacity={0.5}>
          <MaterialCommunityIcons name="refresh" color='black' size={45}/>
        </TouchableOpacity>
        
       
        
          <MaterialCommunityIcons style={{marginTop: 25}} name="weather-sunset" size={50} />
        

        
        <View style={styles.temperatureView}>
          <Text style={{ color: 'black', fontSize: 70, fontWeight: 'bold'}}>{atualTempp}</Text>
          <Text style={{marginBottom: 40, fontWeight: 'bold'}}>°C</Text>
          
        </View>
        
        <Text>{total}</Text>

        <Text style={{fontSize: 12}}>{localizacao}</Text>

        <View style={styles.cardsView}>
            <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold'}}>Sensação: {sensacao}</Text>
            <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 8}}>°C</Text>
        </View>
    
        <View style={styles.info}>
          <View style={styles.addtionalInfo}>

            <View style={{flexDirection: 'row', alignContent: 'space-around', marginBottom: 25}}>
              <View style={{flexDirection: "column", alignContent: 'space-around', minWidth: 200,}}>
                  <Text style={styles.text}>Velocidade Vento</Text>
                  <Text style={[styles.text, {color: '#adadad'}]}>{rajadaVento}</Text>
                  <Text style={[styles.text, {color: '#adadad'}]}>{nascerSol}</Text>
              </View>

              <View style={{flexDirection: "column", alignContent: 'space-between'}}>
                  <Text style={styles.text}>Humidade</Text>
                  <Text style={[styles.text, {color: '#adadad'}]}>{humidity}</Text>
              </View>
            </View>

            

            <View style={{borderBottomColor: 'grey', borderBottomWidth: 1}}></View>

            

            <View style={{flexDirection: 'row', alignContent: 'space-around', marginTop: 25}}>
              <View style={{flexDirection: "column", alignContent: 'space-between', minWidth: 200,}}>
                  <Text style={styles.text}>Mínima</Text>
                  <Text style={[styles.text, {color: '#adadad'}]}>{min}</Text>
              </View>
              
              <View style={{flexDirection: "column", alignContent: 'space-between'}}>
                  <Text style={styles.text}>Máxima</Text>
                  <Text style={[styles.text, {color: '#adadad'}]}>{max}</Text>
              </View>
            </View>
            
          </View>
          
        </View>

        
        <Image resizeMode="contain" source={require("../../assets/builders.png")} style={{width: 250, height: 50, marginBottom: 50, alignContent: 'center', alignSelf: 'center', flex: 1}} />
        
      </View>
      // </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e5ab',
    alignItems: 'center',
  },
  refreshButton: {
    // position: 'absolute',
    alignSelf: 'flex-end', 
    marginRight: 30,
    marginTop: 50
  },    
  temperatureView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  cardsView:{
    
    margin: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },

  info: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    width: 350,
    height: 230,
    flexDirection: 'column',
  
  },
  infoText: {
    color: 'white',
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',

  },
  addtionalInfo:{
    flexDirection: 'column',
    
  },
  text: { 
    fontSize: 14,
    fontWeight: 'bold'
  }

});