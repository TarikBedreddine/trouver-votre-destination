import { header } from "./components/header/header.component";
import { searchBarHtml, searchForSuggestion } from "./components/searchbar/Searchbar.component";
import { weatherDetailsHtml, searchCity } from "./components/weather-details/WeatherDetailsComponent"
import { mapHtml } from "./components/map/Map.component";

$('body').prepend(header)
$('main').append(searchBarHtml)
$('main').append(mapHtml)
$('main').append(weatherDetailsHtml)


// VARIABLES
export const map = L.map('mapid').setView([46.71109, 1.7191036], 1);

$("#input-search").change(function() {
  const city = this.value;
  searchCity(city);
  searchForSuggestion(city);
});


// MAP CONTROL
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmRob3giLCJhIjoiY2tycWQycXhkMDZmNjMwbzRqMzlqb2h3NCJ9.w11nqRMKGflwuJMIJ8upTg'
}).addTo(map);