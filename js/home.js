const links = document.querySelectorAll(".menu a");
const loader = document.querySelector(".loading");

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
//! Logout Button
document.querySelector(".logout").addEventListener("click",function(){
    location.href = "./home.html";
    localStorage.removeItem("userToken");
});


getGames("mmorpg");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        document.querySelector(".menu .active").classList.remove("active");
        links[i].classList.add("active");
        // const category = links[i].dataset.category;
        const category = links[i].getAttribute("data-category");
        // console.log(category);

        getGames(category);

    });
}

async function getGames(categoryName){

    loader.classList.remove("d-none");

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b8bdbea168msh16e3b27e5416e59p1c3abdjsn6d9224d1603d',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        },
    }

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
    const data = await api.json();
    // console.log(data);

    displayGames(data);
    loader.classList.add("d-none");
}

function displayGames(gamesData){

    let gamesBox = ``;

    for (let i = 0; i < gamesData.length; i++) {

        gamesBox += `
            <div class="col-md-3 g-3">
                <div class="card h-100 bg-transparent" role="button"  onmouseenter="startVideo(event)" onclick="showDetails(${gamesData[i].id})">
                    <div class="card-body">

                        <figure class="position-relative">
                            <img src="${gamesData[i].thumbnail}" alt="${gamesData[i].title}" class="w-100 rounded">
                        </figure>

                        <figcaption>
                            <div class="d-flex justify-content-between justify-content-center align-items-center">
                                <h3 class="h6 small">${gamesData[i].title}</h3>
                                <span class="badge text-bg-primary px-2">Free</span>
                            </div>
                        </figcaption>
                        <p class="card-text small text-center opacity-50 py-3">
                        ${gamesData[i].short_description}
                        </p>
                    </div>
                    <div class="card-footer d-flex justify-content-between justify-content-center align-items-center">
                        <sapn class="badge badge-color">${gamesData[i].genre}</sapn>
                        <span class="badge badge-color">${gamesData[i].platform}</span>
                    </div>
                </div>
            </div>
        `
        document.querySelector(".rowData").innerHTML = gamesBox;
    }
}

//! Show Details
function showDetails(id){
    location.href = `./details.html?id=${id}`;
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
