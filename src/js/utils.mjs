
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'"></meta>



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
  const dateTimeElement = document.getElementById('#dateTime');
  const now = new Date();
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



