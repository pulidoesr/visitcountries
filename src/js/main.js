// class ExternalServices that fetches the product data
import { loadHeaderFooter } from './utils.mjs';

function goToPage(option) {
    if (option === 'name') {
        window.location.href = './src/pages/index.html';
    } else if (option === 'region') {
        window.location.href = 'review-by-region.html';
    } else if (option === 'language') {
        window.location.href = 'review-by-language.html';
    }
}

function updateDateTime() {
    const dateTimeElement = document.getElementById('dateTime');
    const now = new Date();
    dateTimeElement.textContent = now.toLocaleString(); // Display date and time
}

 // Update the date and time every second
 setInterval(updateDateTime, 1000);

 // load Header and Footer
loadHeaderFooter();