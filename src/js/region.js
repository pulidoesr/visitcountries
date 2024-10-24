import { loadHeaderFooter} from '/src/js/utils.mjs';

loadHeaderFooter();

// Get the dropdown element and output paragraph
const dropdown = document.getElementById('regions');


// Add an event listener for the 'change' event
dropdown.addEventListener('change', function() {
    // Get the selected value
    const selectedRegion = dropdown.value;
    console.log(selectedRegion);
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
      console.log(data);
      data.forEach(item => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-country');
  
        // Add content to the grid country
        if (item.region === selectedRegion) {
            gridItem.innerHTML = `
                <h3>${item.name.common}</h3>
                <p>Native Language: ${item.nativeLanguage}</p>
                <p>Currency: ${item.currency}</p>
                <p>Calling Code: ${item.callingCode}</p>
                <p>Area: ${item.area} km²</p>
            `;
    
            // Append the grid item to the grid container
            gridCountries.appendChild(gridItem);
        }
    });

  } catch (error) {
      console.error('Error fetching or parsing the JSON file:', error);
  }
}
  