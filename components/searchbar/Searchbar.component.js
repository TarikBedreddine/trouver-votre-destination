import { searchCity } from "../weather-details/WeatherDetailsComponent";

class SearchBarComponent {
    searchBarHtml = `<section class="py-5 flex flex-col justify-center items-center">
    <label for="input-search">Entrer votre destination :</label>
    <input
      id="input-search"
      type="text"
      placeholder="Lyon, Marseille, etc."
      class=" text-center mt-2 h-14 rounded-3xl w-5/6 text-10 bg-gray-50 px-10 border-blue-500 border-2"
    >
  </section>
  <section id="suggestions" class="flex flex-row h-16 items-center justify-center mb-5"></section>`

  constructor() {}

    searchForSuggestion(city) {
        fetch(`https://geo.api.gouv.fr/communes?nom=${city}&fields=departement&boost=population&limit=5`)
            .then(res => res.json())
            .then(data => {
                const section = document.querySelector('#suggestions');
                section.innerHTML = '';
                if (data) {
                    data.forEach(o => generateSuggestion(o));
                }
            })
            .catch(error => console.log(error));
    }

    generateSuggestion(data) {
        const {
            nom,
            code,
            departement: {
                code: codeDepartement,
                nom: nomDepartement
            }
        } = data;

        const card = document.createElement('div');
        const ville = document.createElement('span');
        const departement = document.createElement('span');
        ville.innerHTML = `${nom} (${code})`;
        departement.innerHTML = `${nomDepartement || '??'} (${codeDepartement || '??'})`;
        card.setAttribute('class', 'flex flex-col min-w-1/6 h-16 px-2 items-center justify-center cursor-pointer');
        departement.setAttribute('class', 'text-gray-400 text-sm')
        card.appendChild(ville);
        card.appendChild(departement);
        card.addEventListener('click', () => {
            $('#input-search').val(nom);
            searchCity(nom);
            searchForSuggestion(nom);
        });

        const section = document.querySelector('#suggestions');
        section.appendChild(card);
    }
}

const generateSuggestion = new SearchBarComponent().generateSuggestion

export const searchBarHtml = new SearchBarComponent().searchBarHtml
export const searchForSuggestion = new SearchBarComponent().searchForSuggestion