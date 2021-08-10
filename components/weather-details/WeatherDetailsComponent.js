import { map } from "../../script"
class WeatherDetailsComponent {
    weatherDetailHtml = `<section class="flex flex-wrap justify-around">
    <div class="w-5/12 flex flex-col items-center m-5">
      <h3 id="titleWeather" class="text-xl font-medium">Quel météo?</h3>
      <span id="descriptionWeather" class="italic"></span>
      <ul>
        <li>Il fait <span id="temperature">surement très chaud!</span></li>
        <li>La température ressentie est <span id="temperatureFeel">encore plus chaude!</span></li>
        <li>L'humidité est de <span id="humidity">100% pour le pastis!</span></li>
        <li>La pression est de <span id="pressure">0 au niveau des tongs.</span></li>
        <li>La température maximum sera de <span id="tempMax">beaucoup.</span></li>
        <li>La température minimum sera de <span id="tempMin">quelques degrés de moins.</span></li>
      </ul>
    </div>
  </section>`

    searchCity(city) {
        const apiKey = "56b54737cee432fa16e84110b8e24e90";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                if (data.cod != 404) {
                    const {
                        coord: {
                            lon,
                            lat
                        },
                        name,
                        weather,
                        main: {
                            feels_like,
                            humidity,
                            pressure,
                            temp,
                            temp_max,
                            temp_min
                        }
                    } = data;
                    map.setView([lat, lon], 10);
                    $('#titleWeather').html(`La météo sur ${name}`);
                    $('#descriptionWeather').html(weather.map(o => o.description).toString());
                    $('#temperature').html(`${temp}°C`);
                    $('#temperatureFeel').html(`${feels_like}°C`);
                    $('#humidity').html(`${humidity}%`);
                    $('#pressure').html(`${pressure}Pa`);
                    $('#tempMax').html(`${temp_max}°C`);
                    $('#tempMin').html(`${temp_min}°C`);
                }
            })
            .catch(error => console.log(error));
    }
}

export const weatherDetailsHtml = new WeatherDetailsComponent().weatherDetailHtml
export const searchCity = new WeatherDetailsComponent().searchCity
