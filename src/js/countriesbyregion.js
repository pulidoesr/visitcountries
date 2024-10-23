import { loadHeaderFooter} from '/src/js/utils.mjs';

let countryArray = [];

loadHeaderFooter();

async function fetchJsonAndStoreInArray() {
  try {
      // Fetch the JSON file
      const response = await fetch('/src/json/countriesv1.json');
      
      // Check if the response is successful
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Parse the JSON into a JavaScript object (array in this case)
      const jsonData = await response.json();
      
      // jsonData is now an array
      console.log(jsonData); 
      // You can now manipulate or access the data in the array
      jsonData.forEach(item => {
          let countryEntry = {name: item.name.common,
                              capital:item.capital,
                              region: item.region}
          console.log(`Name: ${item.name.common}, Capital: ${item.capital}, Region: ${item.region}`);
          countryArray.push(countryEntry);
      });
      console.log(countryArray);

  } catch (error) {
      console.error('Error fetching or parsing the JSON file:', error);
  }
}

// Call the function
fetchJsonAndStoreInArray();