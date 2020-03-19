 // 'https://api.darksky.net/forecast/390879a3c6a16c08a7095b742685533a/37.8267,-122.4233'
      window.onload = () => {
         let long, lat;
         let temperatureDescription = document.querySelector('.temperature-description')
         let temperatureDegree = document.querySelector('.temperature-degree')
         let locationTimezone = document.querySelector('.location-timezone')
         let tempSec = document.querySelector('.temperature')
         let tempSpan = document.querySelector('.degree-section span');
         
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
               long = position.coords.longitude;
               lat = position.coords.latitude;
               const proxy ='https://cors-anywhere.herokuapp.com/';
               const api =`${proxy}https://api.darksky.net/forecast/390879a3c6a16c08a7095b742685533a/${lat},${long}`;
               fetch(api).then(response=>response.json()).then(response=>{console.log(response)
               const {temperature,summary,icon} = response.currently;
               temperatureDegree.textContent=temperature
               temperatureDescription.textContent=summary
               locationTimezone.textContent=response.timezone
               // set dom Element fron the api
               setIcons(icon, document.querySelector('.icon'))
               // formular for celcius
               let celcius =(temperature - 32) * (5/9) 
               // change temperature to Celcius/Fehrenheit
                  tempSec.addEventListener('click', () => {
                     if(tempSpan.innerHTML=="f"){
                        temperatureDegree.textContent= Math.floor(celcius)
                        tempSpan.innerHTML='°C'
                     }else{
                        temperatureDegree.textContent=temperature
                        tempSpan.innerHTML='f'
                     }
                  })
               })
            })
         }
         
      }
            function setIcons(icon,iconID){
               console.log(icon)
               const  skycons = new Skycons({color:"white"});
               const currentIcon =icon.replace(/-/g,"_").toUpperCase()
               skycons.play();
               return skycons.set(iconID, Skycons[currentIcon])
            }
            