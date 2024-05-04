const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const idParams = params.get("id");


const mode = document.querySelector(".mode");

//! Theme localStorage
if (localStorage.getItem("theme") != null) {

    const themeData = localStorage.getItem("theme");

    if (themeData === "light") {
        mode.classList.replace("fa-sun","fa-moon");
    }
    else {
        mode.classList.replace("fa-moon","fa-sun");
    }

    document.querySelector("html").setAttribute("data-theme",themeData);
}


let containerDetails = {};


(async function () {
    const options = {
        method: "GET",
        headers: {
        "X-RapidAPI-Key": "b8bdbea168msh16e3b27e5416e59p1c3abdjsn6d9224d1603d",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
    };

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idParams}`,options);
    const data = await api.json();
    containerDetails = data;
    displayData();

    // console.log(data);
})();

function displayData(){

    let detailsBox = `
    <div class="col-md-4">
        <figure>
            <img src="${containerDetails.thumbnail}" alt="${containerDetails.title}" class="w-100">
        </figure>
    </div>
    <div class="col-md-8">
        <nav aria-label="breadcrumb">
            <ul class="list-unstyled d-flex py-3 breadcrumb-item">
                <li class="breadcrumb-item"><a href="./home.html" class="nav-link home pe-2 text-decoration-none fs-6">Home</a></li>
                <li class="breadcrumb-item text-info">${containerDetails.title}</li>
            </ul>
        </nav>
        <h1>${containerDetails.title}</h1>
        <h3>${containerDetails.title}</h3>
        <p>${containerDetails.description}</p>
    </div>`;


    document.querySelector(".rowData").innerHTML = detailsBox;

    const backgroundImage = containerDetails.thumbnail.replace("thumbnail","background");

    document.body.style.cssText = `
        background-image: url(${backgroundImage});
        background-size: cover;
        background-position: center;
    `
}

//! Dark & Light Mode
mode.addEventListener("click", function (e) {

    if (mode.classList.contains("fa-sun")) {
        document.querySelector("html").setAttribute("data-theme" , "light");
        mode.classList.replace("fa-sun","fa-moon");
        localStorage.setItem("theme","light");
    }
    else{
        document.querySelector("html").setAttribute("data-theme" , "dark");
        mode.classList.replace("fa-moon","fa-sun");
        localStorage.setItem("theme","dark");
    }
});