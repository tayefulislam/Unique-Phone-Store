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
            <p>Storage : ${phone.mainFeatures.storage} <br>
            Display Size : ${phone.mainFeatures.displaySize} <br>
            Chip Set : ${phone.mainFeatures.chipSet} <br>
            Memory : ${phone.mainFeatures.memory} <br>
            </p>

            <h4>Others:</h4>
            <p>Bluetooth : ${phone.others.Bluetooth} <br>
            GPS : ${phone.others.GPS} <br>
            NFC : ${phone.others.NFC} <br>
            Radio : ${phone.others.Radio} <br>
            USB : ${phone.others.USB} <br>
            WLAN : ${phone.others.WLAN} <br>
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

// check sennor

// const checkSensor = (sensor) => {

//     sensors.forEach(sensor => {

//         console.log(sensor);

//     });


// }
