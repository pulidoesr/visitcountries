(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: "AIzaSyDUH8wXyMKJGeueEYOc4XI55U-hfuUZvBY",
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});
const countryMapDiv = document.getElementById('mapFrame');
let map;

export async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const position = { lat: 0, lng: 0 };
  
  console.log("Google Maps library loaded successfully");
  map = new Map(countryMapDiv, {
  center: position,
  zoom: 8,
  });  
}


// Function

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// General loader Header & Footer

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/src/public/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("/src/public/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

}

// Render Template
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export function readcountry(countryName) {
  const countryInfoDiv = document.getElementById('countryInfo');
   
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
                showMap(coords.lat, coords.lng);  // Update the map with new coordinates
            })
            .catch(error => {
                console.error(error);
            });}
})
.catch(error => {
    countryInfoDiv.innerHTML = '<p>Country not found. Please try again.</p>';
});
}

// Function to show the map
function showMap(lat,lng){
var countryLocation = { lat:lat, lng:lng };

if (map) { // Check if the map instance exists
map.setCenter(countryLocation);
map.setZoom(3); // Adjust the zoom level as needed
} else {
console.error("Map instance is not initialized");
}

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

