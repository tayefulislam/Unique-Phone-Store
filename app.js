document.getElementById('search-btn').addEventListener('click', function () {

    const getInput = document.getElementById('search');
    const inputValue = loadData(getInput.value.toLowerCase());
    getInput.value = '';

});

const loadData = (value) => {
    console.log(value);
    const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === false) {
                console.log('result not fount')
            }
            else {
                result(data.data);
            }
        })
}

// display result 

// set result 

const result = (results) => {
    console.log(results);
    const setResult = document.getElementById('result');
    for (const result of results) {


        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card h-100">
                        <img class="mt-3" src="${result.image}"
                            class="card-img-top" alt="...">
                        <div class="card-body">
                            <h2 class="card-title">${result.phone_name}</h2>
                            <h5>Brand : ${result.brand}</h5>
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button class="btn btn-primary" type="button" data-bs-toggle="modal"
                                    data-bs-target="#detailsModal">
                                    Details
                                </button>

                            </div>

                        </div>
                    </div>

    `

        console.log(setResult);

        setResult.appendChild(div);

    }

}
