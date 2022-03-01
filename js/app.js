const noResult = document.getElementById('no-result');
const container = document.getElementById('cards-container');
const detailsContainer = document.getElementById('details');
const searchInput = document.getElementById('search-input');

/* Functions for Search Result */
const loadSearchResult = () => {
    const searchText = searchInput.value.toLowerCase();

    if (searchText == '') {
        errorFunction();
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;


        fetch(url)
            .then(res => res.json())
            .then(data => showSearchResult(data.data))
    }
}

const showSearchResult = (SearchResult) => {

    noResult.textContent = ""
    detailsContainer.textContent = '';
    container.textContent = ""


    if (SearchResult < 1) {
        errorFunction();
        searchInput.value = '';
    }


    else {
        const needToShow = SearchResult.slice(0, 20);

        for (const result of needToShow) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('col');

            newDiv.innerHTML = `
           <div class="text-center"> <img src="${result.image}" class="card-img-top img-thumbnail" alt="..." style="width: 250px; height: 325px;"></div>
            <div class="card-body">
            <h5 class="card-title">Phone Name: ${result.phone_name}</h5>
            <p class="card-text"><b>Brand Name: ${result.brand}</b></p ></div >
            <div class="card-footer ">
            <button onclick="loaddetails('${result.slug}')" class="btn btn-primary w-100">See more details</button></div>`

            container.appendChild(newDiv);
            searchInput.value = '';
        }
    }
}



/* Functions for details */

const loaddetails = (getId) => {

    const url = `https://openapi.programming-hero.com/api/phone/${getId}`;


    fetch(url)
        .then(res => res.json())
        .then(result => showTheDetails(result.data));
}


const showTheDetails = (details) => {

    /*     SENSOR work fine even if I don't use for loop. but I use this for loop to add space between two items.  */

    const sensorsList = details.mainFeatures.sensors;
    const sensorList = [];
    for (const sensor of sensorsList) {
        sensorList.push(" " + sensor);
    }

    detailsContainer.textContent = '';

    const newDiv = document.createElement('div');
    const classes = ['d-lg-flex', 'justify-content-between'];
    newDiv.classList.add(...classes);

    newDiv.innerHTML = `
    <div class="text-center me-3 mb-5">
    <img src="${details.image}" alt="..." style="width: 350px;">
    </div>
    <table class="table table-hover table-fixed">
                <tbody>
                    <tr>
                        <td class="text-end align-middle"><b>Item Name:</b></td>
                        <td class="align-middle" colspan="2">${details.name}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>Release Date:</b></td>
                        <td class="align-middle" colspan="2">${details.releaseDate || 'N/A'}</td>
                    </tr>

                    <tr>
                        <td class="text-end align-middle  text-nowrap" rowspan="6"><h5>Main Features: </h5></td>
                        
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>Storage:</b></td>
                        <td class="align-middle">${details.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle  text-nowrap"><b>Display Size:</b></td>
                        <td class="align-middle">${details.mainFeatures.displaySize}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>Chip Set:</b></td>
                        <td class="align-middle">${details.mainFeatures.chipSet}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>Memory:</b></td>
                        <td class="align-middle">${details.mainFeatures.memory}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>Sensors: </b></td>
                        <td class="align-middle">${sensorList}</td>
                    </tr>

                    <tr>
                        <td class="text-end align-middle text-nowrap" rowspan="7"><h5>Other Features: </h5></td>
                    
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>WLAN:</b></td>
                        <td class="align-middle">${details?.others?.WLAN || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>Bluetooth:</b></td>
                        <td class="align-middle">${details?.others?.Bluetooth || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>GPS:</b></td>
                        <td class="align-middle">${details?.others?.GPS || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>NFC:</b></td>
                        <td class="align-middle">${details?.others?.NFC || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>Radio:</b></td>
                        <td class="align-middle">${details?.others?.Radio || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td class="text-end align-middle"><b>USB:</b></td>
                        <td class="align-middle">${details?.others?.USB || 'N/A'}</td>
                    </tr>
                </tbody>
    </table>`;
    detailsContainer.appendChild(newDiv);
}

const errorFunction = () => {
    const newElement = document.createElement('h1');
    newElement.classList.add('text-center');
    newElement.innerText = 'Sorry!! Nothing Found....';
    noResult.appendChild(newElement);
}