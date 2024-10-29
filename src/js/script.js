  // class ExternalServices that fetches the product data
import { loadHeaderFooter, initMap, readcountry} from '/src/js/utils.mjs';

document.getElementById('fetchButton').addEventListener('click', fetchCountryInfo);

 // load Header and Footer
 loadHeaderFooter();
 initMap(); 
 // On page load, get the country parameter and call readcountry
document.addEventListener("DOMContentLoaded", () => {
  const countryName = getCountryFromURL();
  if (countryName) {
      readcountry(countryName);  // Call readcountry with the country name if it exists
  }
});
 countryInput.focus();
function fetchCountryInfo() {
    const countryName = document.getElementById('countryInput').value.trim();
   
    if (!countryName) {
        countryInfoDiv.innerHTML = '<p>Please enter a country name.</p>';
        return;
    }
    readcountry(countryName);
    countryInput.value = '';
    countryInput.focus();
}

// Function to get the query parameter from the URL
function getCountryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('country');
}

