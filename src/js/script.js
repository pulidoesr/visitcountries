document.getElementById('fetchButton').addEventListener('click', fetchCountryInfo);

  const countryMapDiv = document.getElementById('mapFrame');
  const { AdvancedMarkerElement, PinElement } = google.maps.importLibrary("marker");

import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: "AIzaSyDUH8wXyMKJGeueEYOc4XI55U-hfuUZv",
  version: "weekly",
  libraries: ["maps","places"]
});

const mapOptions = {
  center: {
    lat: 0,
    lng: 0
  },
  zoom: 4
};

function fetchCountryInfo() {
    const countryName = document.getElementById('countryInput').value.trim();
    const countryInfoDiv = document.getElementById('countryInfo');
   
    if (!countryName) {
        countryInfoDiv.innerHTML = '<p>Please enter a country name.</p>';
        return;
    }

    // Fetch data from the REST Countries API
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
             // Convert the shortened URL into an embeddable format
            const countryDetails = `
                <img class="country-flag" src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <p><strong>Name:</strong> ${country.name.common}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>           
            `;
            countryInfoDiv.innerHTML = countryDetails;
            if (countryName) {
                getCountryCoordinates(countryName)
                    .then(coords => {
                        initMap(coords.lat, coords.lng);  // Update the map with new coordinates
                    })
                    .catch(error => {
                        console.error(error);
                    });}
        })
        .catch(error => {
            countryInfoDiv.innerHTML = '<p>Country not found. Please try again.</p>';
        });
}

async function initMap(lat, lng){
    var countryLocation = { lat: lat, lng: lng };
    
    // Create the map centered on the country
    var map = new google.maps.Map(document.getElementById('mapFrame'), {
        zoom: 6,  // Adjust zoom level
        center: countryLocation  // Set the map's center to the country coordinates
    });

        const marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: countryLocation,
            title: 'Uluru',
        });

}

  // Function to get coordinates for a country using the Geocoding API
  function getCountryCoordinates(countryName) {
    var geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
        geocoder.geocode({ address: countryName }, (results, status) => {
            if (status === 'OK' && results[0]) {
                var location = results[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
            } else {
                reject('Country not found: ' + status);
            }
        });
    });    
}

