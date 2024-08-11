/*
fetch('header.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_header");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})
*/
async function loadHeader() {
  try {
    const response = await fetch('header.html');
    const data = await response.text();
    const headerContainer = document.getElementById('header-container');
    headerContainer.innerHTML = data;

    // Your dropdown menu logic here
    // ...
  } catch (error) {
    console.error('Error fetching header:', error);
  }
}

loadHeader();