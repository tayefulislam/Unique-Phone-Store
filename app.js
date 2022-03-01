// get result field 
const setResult = document.getElementById('result');

// take user input
document.getElementById('search-btn').addEventListener('click', function () {

    const getInput = document.getElementById('search');
    const inputValue = loadData(getInput.value.toLowerCase());
    getInput.value = '';

});


// loadData
const loadData = (value) => {
    // console.log(value);
    const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === false) {
                console.log('result not fount')
                setResult.innerHTML = ``;
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
    console.log(results.slice(0, 20));

    setResult.innerHTML = ``;

    // for of loop in results array
    for (const result of results.slice(0, 20)) {

        const div = document.createElement('div');

        div.classList.add('col');

        div.innerHTML = `
                <div class="card h-100">
                        <img class="mt-3 img-body" src="${result.image}"
                            class="card-img-top" alt="...">
                        <div class="card-body">
                            <h2 class="card-title">${result.phone_name}</h2>
                            <h5>Brand : ${result.brand}</h5>
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button onclick=details('${result.slug}') class="btn btn-primary" type="button" data-bs-toggle="modal"
                                    data-bs-target="#detailsModal">
                                    Details
                                </button>

                            </div>

                        </div>
                    </div>
    `
        // console.log(setResult);

        setResult.appendChild(div);
    }

}

// Get Result by ID (slug)
const details = (id) => {
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(result => displayDetails(result.data))
    console.log(result.data);
}

// Display Modal (All Details)

const displayDetails = (phone) => {

    const modalId = document.getElementById('detail-modal');
    modalId.innerHTML = `
    <div class="modal-header">
    <h2 class="modal-title" id="detailsModalLabel">${phone.name}</h2>
    
    <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body">
            <div>
            
            <img src="${phone.image}">
            <br>

            <h3>Brand : ${phone.brand}</h3>
            <h5>${releaseDateCheck(phone.releaseDate)}</h5>
            <h4>Features:</h4>
            <p>
            <span class="fw-bold"> Storage :</span> ${phone.mainFeatures.storage} <br>
            <span class="fw-bold"> Display Size :</span> ${phone.mainFeatures.displaySize} <br>
            <span class="fw-bold"> Chip Set :</span> ${phone.mainFeatures.chipSet} <br>
            <span class="fw-bold"> Memory :</span> ${phone.mainFeatures.memory} <br>
            </p>

            <h4>Others:</h4>
            <p> <span class="fw-bold"> Bluetooth :</span> ${phone.others.Bluetooth} <br>
            <span class="fw-bold"> GPS :</span> ${phone.others.GPS} <br>
            <span class="fw-bold"> NFC :</span> ${phone.others.NFC} <br>
            <span class="fw-bold"> Radio :</span> ${phone.others.Radio} <br>
            <span class="fw-bold"> USB :</span> ${phone.others.USB} <br>
            <span class="fw-bold"> WLAN :</span> ${phone.others.WLAN} <br>
            </p>

            <p> <span class="fw-bold">SENSOR :</span> ${phone.mainFeatures.sensors} </p>
            </div >


    </div >

    `
    console.log(phone)
}


// Check Release Date
const releaseDateCheck = (value) => {

    console.log(value)
    if (value === "") {
        return "Released Date Not Found"
    }
    else {
        return value;
    }
}
