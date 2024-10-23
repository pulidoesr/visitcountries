  // class ExternalServices that fetches the product data
import { loadHeaderFooter, initMap, readcountry} from '/src/js/utils.mjs';

document.getElementById('fetchButton').addEventListener('click', fetchCountryInfo);

 // load Header and Footer
 loadHeaderFooter();
 initMap(); 
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

