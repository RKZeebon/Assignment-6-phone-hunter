/* Functions for Search Result */

const loadSearchResult = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase();

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;


    fetch(url)
        .then(res => res.json())
        .then(data => showSearchResult(data.data))

}

const showSearchResult = (SearchResult) => {
    const noResult = document.getElementById('no-result');
    noResult.textContent = ""

    const container = document.getElementById('cards-container');
    container.textContent = ""

    if (SearchResult < 1) {


        const newElement = document.createElement('h1');
        newElement.classList.add('text-center')
        newElement.innerText = 'Sorry!! Nothing Found....'
        noResult.appendChild(newElement);

    }


    else {
        const needToShow = SearchResult.slice(0, 20)

        for (result of needToShow) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('col');

            newDiv.innerHTML = `<img src="${result.image}" class="card-img-top img-thumbnail" alt="..." style="height: 500px;">
        <div class="card-body">
            <h4 class="card-title">Phone Name: ${result.phone_name}</h4>
            <h5 class="card-text">Brand Name: ${result.brand}</h5 >
        </div >
        <div class="card-footer ">
        <button onclick="loaddetails('${result.slug}')" class="btn btn-primary w-100">See more details</button>
        </div>`


            container.appendChild(newDiv);
        }
    }
}



/* Functions for details */

const loaddetails = (getId) => {

    const url = `https://openapi.programming-hero.com/api/phone/${getId}`;


    fetch(url)
        .then(res => res.json())
        .then(datas => showTheDetails(datas.data));
}


const showTheDetails = (details) => {

    /*     SENSOR work fine even if I don't use for loop. but I use this for loop to add space between two items.  */
    const sensorsList = details.mainFeatures.sensors;
    const sensorList = [];
    for (const sensor of sensorsList) {
        sensorList.push(" " + sensor);
    }

    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent = '';

    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <div class="text-center">
    <img src="${details.image}" alt="...">
    </div>
    <table class="table">
                <tbody>
                    <tr>
                        <td class="text-end"><b>Phone Name:</b></td>
                        <td>${details.name}</td>
                    </tr>
                    <tr>
                        <td class="text-end"><b>Release Date:</b></td>
                        <td>${details.releaseDate}</td>
                    </tr>
                    <tr>
                        <td class="text-end"><h4>Main Features: </h4></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="text-end"><b>Storage:</b></td>
                        <td>${details.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                        <td class="text-end"><b>Display Size:</b></td>
                        <td>${details.mainFeatures.displaySize}</td>
                    </tr>
                    <tr>
                        <td class="text-end"><b>Chip Set:</b></td>
                        <td>${details.mainFeatures.chipSet}</td>
                    </tr>
                    <tr>
                        <td class="text-end"><b>Memory:</b></td>
                        <td>${details.mainFeatures.memory}</td>
                    </tr>
                    <tr>
                        <td class="text-end"><h4>Sensors: </h4></td>
                        <td class="align-middle">${sensorList}</td>
                    </tr>
                </tbody>
    </table>`
    detailsContainer.appendChild(newDiv);
}