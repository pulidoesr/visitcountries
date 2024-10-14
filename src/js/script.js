document.getElementById('fetchButton').addEventListener('click', fetchCountryInfo);

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
            const countryDetails = `
                <img class="country-flag" src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <p><strong>Name:</strong> ${country.name.common}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
            `;
            countryInfoDiv.innerHTML = countryDetails;
        })
        .catch(error => {
            countryInfoDiv.innerHTML = '<p>Country not found. Please try again.</p>';
        });
}
