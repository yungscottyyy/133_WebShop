import { Hero } from "../../types";

var htmlElements = "";

var numberOfProducts = 8;
for (var i = 0; i < 8; i++) {
   htmlElements += `<div class="col-sm-6 col-3"><img src="app/views/assets/images/product-${i}.jpg" /></div>`;
}
var container = document.getElementById("container");
container.innerHTML = htmlElements;

const tbody = document.querySelector("table tbody");
fetch("/api/heroes")
    .then(r => r.json())
    .then((heroes: Hero[]) => heroes
        .forEach(hero => tbody
            .innerHTML += `
                <tr>
                    <td>${hero.name}</td>
                </tr>`));