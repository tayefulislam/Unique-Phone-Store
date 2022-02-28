const setResult = document.getElementById('result');

document.getElementById('search-btn').addEventListener('click', function () {

    const getInput = document.getElementById('search');
    const inputValue = loadData(getInput.value.toLowerCase());
    getInput.value = '';

});

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

    setResult.innerHTML = ``;

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


const details = (id) => {
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(result => displayDetails(result.data))


}


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
            <h5>Brand : ${phone.brand}</h5>
            <img src="${phone.image}">

        
            <h3>${releaseDateCheck(phone.releaseDate)}</h3>

            

            </div >

    </div >

    `

    console.log(phone)


}


const releaseDateCheck = (value) => {

    console.log(value)
    if (value === "") {
        return "Released Date Not Found"
    }
    else {
        return value;
    }
}
