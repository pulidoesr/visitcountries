import { loadHeaderFooter, readFlag, getLocalStorage,setLocalStorage} from '/src/js/utils.mjs';

loadHeaderFooter();

// Get the dropdown element and output paragraph
const dropdown = document.getElementById('regions');
dropdown.selectedIndex = 0;

// Add an event listener for the 'change' event
dropdown.addEventListener('change', function() {
    // Get the selected value
    const selectedRegion = dropdown.value;
    loadRegionCountries(selectedRegion);
});



async function loadRegionCountries(selectedRegion) {
  try {
      // Fetch the JSON file
      const response = await fetch('/src/json/countriesv1.json');
      const gridCountries = document.getElementById('gridCountries');
    
      // Clear existing grid items before adding new ones
      gridCountries.innerHTML = '';

      // Check if the response is successful
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Loop through the data and create grid items
      const data = await response.json(); // Parse JSON data
      data.forEach(item => {
     
        // Add content to the grid country
        if (item.region === selectedRegion) { 
            getCountryFlag(item);
            
        }
    });

  } catch (error) {
      console.error('Error fetching or parsing the JSON file:', error);
  }
}
async function getCountryFlag(item) {
    const flagUrl = await readFlag(item.name.common);
    const gridItem = document.createElement('div');
    const Country = item.name.common;
    gridItem.classList.add('grid-country');
    if (flagUrl) {
       
        // You can use `flagUrl` here to set the `src` of an image, for example
        gridItem.innerHTML = `
            <a href="/src/pages/index.html?country=${encodeURIComponent(Country)}">
                <img src="${flagUrl}" style="width: 30px; height: 20px; margin-right: 10px;" onclick="storeCountry('${Country}')">
            </a>
                <h3>${item.name.common}</h3>
                <p>Native Language: ${item.nativeLanguage}</p>
                <p>Currency: ${item.currency}</p>
                <p>Calling Code: ${item.callingCode}</p>
                <p>Area: ${item.area} km²</p>
            `;
        // Append the grid item to the grid container
        gridCountries.appendChild(gridItem);
    } else {
        console.log("Flag not available." + Country);
    }
}

function storeCountry(Country) {
    let cartCountry = getLocalStorage("so-country");
    if (!cartCountry) {
      cartCountry = [];
    }
    // Now cartContents is guaranteed to be an array
    cartCountry.push(Country);
    setLocalStorage("so-country", JSON.stringify(cartCountry)); // Store as JSON string
  }
  
// Make storeCountry accessible globally
window.storeCountry = storeCountry;