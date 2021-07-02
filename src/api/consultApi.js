export default async function weather(coordenates){

    const axios = require('axios')

    const lat = coordenates.latitude
    
    const long = coordenates.longitude

    let res = []

    

    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=40a5f7559101e8312445dfae9a9b0db1`)
    await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=40a5f7559101e8312445dfae9a9b0db1`)
        .then(function (response){

            

            const data = response.data     
            const localizacao = (data.sys.country + ', ' + ' ' + data.name)
            const min = data.main.temp_min
            const max = data.main.temp_max
            const rajadaVento = data.wind.speed
            const humidade = data.main.humidity
            const atualTempp = data.main.temp
            const sensacao = data.main.feels_like
           
            
            
            res = [atualTempp, min, max, localizacao, rajadaVento, humidade, sensacao]
            
        })
        .catch(function (error) {
            console.log(error)
        })

    return res
  }