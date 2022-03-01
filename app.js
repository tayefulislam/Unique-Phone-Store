
//grobal Varailbe

// get result field 
const setResult = document.getElementById('result');


// common funtion

// Check Release Date
const releaseDateCheck = (valueDate) => {

    if (valueDate === "") {
        return "Released Date Not Found";
    }

    else {
        return valueDate;
    }
}

//check data 

const checkData = (valueData) => {

    if (valueData === undefined) {
        return " Data Not Found";
    }

    else {
        return valueData;
    }



}

//sensors

const sensor = (sensors) => {
    let totalSensor = '';
    sensors.forEach(sensor => {
        totalSensor = totalSensor + sensor + ', ';
    });

    let totalSensorDot = totalSensor.slice(0, totalSensor.length - 2);
    return totalSensorDot + '.';
}


// Display alert

const showAlert = (alertId, alert) => {
    document.getElementById(alertId).style.display = alert;
}


// take user input
document.getElementById('search-btn').addEventListener('click', function () {

    const getInput = document.getElementById('search');
    const inputValue = getInput.value.toLowerCase();

    getInput.value = '';

    if (inputValue == '') {
        showAlert('empty', 'block');
        showAlert('not-found', 'none');
        setResult.innerHTML = ``;
    }

    else {
        showAlert('empty', 'none');
        showAlert('not-found', 'none');
        return loadData(inputValue);
    }

});


// loadData
const loadData = (inputValue) => {

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;

    fetch(url)
        .then(response => response.json())
        .then(results => {
            if (results.status === false) {

                setResult.innerHTML = ``;
                showAlert('not-found', 'block');
                showAlert('empty', 'none');

            }

            else {

                showAlert('not-found', 'none');
                showAlert('empty', 'none');
                searchResult(results.data);

            }
        })
}



// display result 

// set result 
const searchResult = (results) => {

    setResult.innerHTML = ``;

    // for of loop in results array

    for (const result of results.slice(0, 20)) {

        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
                <div class="card h-100">
                        <img class="mt-3 img-body" src="${result.image}"
                            class="card-img-top">
                        <div class="card-body">
                            <h2 class="card-title">${checkData(result?.phone_name)}</h2>
                            <h5>Brand : ${checkData(result?.brand)}</h5>
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button onclick=details('${checkData(result?.slug)}') class="btn btn-primary" type="button" data-bs-toggle="modal"
                                    data-bs-target="#detailsModal">
                                    Details
                                </button>

                            </div>

                        </div>
                    </div>
    `

        setResult.appendChild(div);
    }

}


// Get Result by ID (slug)

const details = (phoneId) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(result => displayDetails(result.data))

}

// Display Modal (All Details)

const displayDetails = (phone) => {

    const modalId = document.getElementById('detail-modal');
    modalId.innerHTML = `
            <div class="modal-header">
            <h2 class="modal-title" id="detailsModalLabel">${checkData(phone?.name)}</h2>
            
            <button type="button" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>

            <div class="modal-body">
            <div>
            
            <img src="${phone?.image}">
            <br>     

            <h3>Brand : ${checkData(phone?.brand)}</h3>
            <h5>${releaseDateCheck(checkData(phone?.releaseDate))}</h5>
            <h4>Main Features:</h4>
            <p>
            <span class="fw-bold"> Storage :</span> ${checkData(phone.mainFeatures?.storage)} <br>
            <span class="fw-bold"> Display Size :</span> ${checkData(phone.mainFeatures?.displaySize)} <br>
            <span class="fw-bold"> Chip Set :</span> ${checkData(phone.mainFeatures?.chipSet)} <br>
            <span class="fw-bold"> Memory :</span> ${checkData(phone.mainFeatures?.memory)} <br>
            </p>

            <p> <span class="fw-bold">SENSOR :</span> ${checkData(sensor(phone.mainFeatures?.sensors))} </p>

            <h4>Others Features:</h4>
         
            <p> <span class="fw-bold"> Bluetooth :</span> ${checkData(phone.others?.Bluetooth)} <br>
            <span class="fw-bold"> GPS :</span> ${checkData(phone.others?.GPS)} <br>
            <span class="fw-bold"> NFC :</span> ${checkData(phone.others?.NFC)} <br>
            <span class="fw-bold"> Radio :</span> ${checkData(phone.others?.Radio)} <br>
            <span class="fw-bold"> USB :</span> ${checkData(phone.others?.USB)} <br>
            <span class="fw-bold"> WLAN :</span> ${checkData(phone.others?.WLAN)} <br>
           
            </p>

            </div >

            
    </div >

    `
}

