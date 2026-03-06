const categoryContainer = document.getElementById("category-container")
const treesContainer = document.getElementById("trees-container")
const loadingSpinner = document.getElementById("loading-spinner")

// showing the loading spinner
function showLoading() {
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML = "";

}

// removing the loading spinner
function removeLoading() {
    loadingSpinner.classList.add("hidden")
}

// loading the catagory
async function loadCatagory() {
    const res = await fetch("https://openapi.programming-hero.com/api/categories")
    const data = await res.json()

    data.categories.forEach(catagory => {
        const button = document.createElement("button");
        button.className = "btn w-full justify-start outline-gray-500 outline py-2 "
        button.innerHTML = catagory.category_name;
        categoryContainer.appendChild(button)

    });
}

// loading the trees
async function loadTrees() {
    showLoading()
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json()
    removeLoading()
    displayTrees(data)
}

// displaying the trees
function displayTrees(trees) {
    trees.plants.forEach((trees) => {
        card = document.createElement("div");
        card.className = "card bg-base-100 shadow-sm"
        card.innerHTML = `
                        <img src="${trees.image}"
                            alt="Shoes" class="rounded-t-xl h-40" />
                        <div class="card-body p-3">
                            <h2 class="card-title">${trees.name}</h2>
                            <p class="line-clamp-2">${trees.description}</p>
                            <div class="flex justify-between">
                                <div class="badge badge-soft badge-success bg-sky-100 text-sm">${trees.category}</div>
                                <h3 class="font-bold text-sm">$${trees.price}</h3>
                            </div>
                            <div class="card-actions">
                                <button class="btn btn-primary w-full rounded-4xl">Buy Now</button>
                            </div>
                        </div>
        `
        treesContainer.appendChild(card)
    })
}

loadTrees()
loadCatagory()