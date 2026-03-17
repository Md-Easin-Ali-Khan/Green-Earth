const categoryContainer = document.getElementById("category-container");
const treesContainer = document.getElementById("trees-container");
const loadingSpinner = document.getElementById("loading-spinner");
const allTreesBtn = document.getElementById("allTreesBtn") 

// showing the loading spinner
function showLoading() {
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML = "";
}

// removing the loading spinner
function removeLoading() {
    loadingSpinner.classList.add("hidden");
}

// loading the category
async function loadCatagory() {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();

    data.categories.forEach((category) => {
        const btn = document.createElement("button");

        btn.className = "btn w-full outline-gray-500 outline py-2";
        btn.innerText = category.category_name;

        btn.onclick = () => selectCatagory(category.id, btn);

        categoryContainer.appendChild(btn);
    });
}

// select category
async function selectCatagory(categoryId, btn) {

    showLoading();

    const allBtns = document.querySelectorAll("#category-container button , #allTreesBtn");

    allBtns.forEach((button) => {
        button.classList.remove("bg-green-800", "text-white");
    });

    btn.classList.add("bg-green-800", "text-white");

    const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
    const data = await res.json();

    displayTrees(data.plants);

    removeLoading();
}

// select all trees button 
allTreesBtn.addEventListener("click", ()=>{
    const allBtns = document.querySelectorAll("#category-container button , #allTreesBtn");

    allBtns.forEach((button) => {
        button.classList.remove("bg-green-800", "text-white");
    });

    allTreesBtn.classList.add("bg-green-800", "text-white");
    loadTrees();
})

// loading all trees
async function loadTrees() {

    showLoading();

    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();

    displayTrees(data.plants);

    removeLoading();
}

// displaying the trees
function displayTrees(trees) {

    treesContainer.innerHTML = "";

    trees.forEach((tree) => {

        const card = document.createElement("div");

        card.className = "card bg-base-100 shadow-sm";

        card.innerHTML = `
            <img src="${tree.image}" 
                 alt="${tree.name}" 
                 class="rounded-t-xl h-40 w-full object-cover" />

            <div class="card-body p-3">
                <h2 class="card-title">${tree.name}</h2>

                <p class="line-clamp-2">${tree.description}</p>

                <div class="flex justify-between">
                    <div class="badge badge-soft badge-success bg-sky-100 text-sm">
                        ${tree.category}
                    </div>

                    <h3 class="font-bold text-sm">
                        $${tree.price}
                    </h3>
                </div>

                <div class="card-actions">
                    <button class="btn btn-primary w-full rounded-4xl">
                        Buy Now
                    </button>
                </div>
            </div>
        `;

        treesContainer.appendChild(card);
    });
}

loadTrees();
loadCatagory();