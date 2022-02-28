document.getElementById('search-btn').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase();

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;


    fetch(url)
        .then(res => res.json())
        .then(data => showSearchResult(data.data))

})

const showSearchResult = (SearchResult) => {



    for (result of SearchResult) {
        const container = document.getElementById('cards-container');
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');

        newDiv.innerHTML = `<img src="${result.image}" class="card-img-top img-thumbnail" alt="..." style="height: 500px;">
        <div class="card-body">
            <h4 class="card-title">Phone Name: ${result.phone_name}</h4>
            <h5 class="card-text">Brand Name: ${result.brand}</h5 >
        </div >
    <div class="card-footer ">
        <button class="btn btn-primary w-100">See more details</button>
    </div>`
        container.appendChild(newDiv);
    }



}