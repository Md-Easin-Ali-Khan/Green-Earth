const categoryContainer = document.getElementById("category-container");
const treesContainer = document.getElementById("trees-container");
const loadingSpinner = document.getElementById("loading-spinner");
const allTreesBtn = document.getElementById("allTreesBtn");
const treeDetailsModal = document.getElementById("tree-details-modal");
const modalName = document.getElementById("modalName");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const cartContainer = document.getElementById("cart-container");
let totalPrice = document.getElementById("total-price")

let cart = []

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
allTreesBtn.addEventListener("click", () => {
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
                <h2 class="card-title" onclick="openTreeModal(${tree.id})">${tree.name}</h2>

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
                    <button onclick="addToCart('${tree.id}', '${tree.name}', ${tree.price})" class="btn btn-primary w-full rounded-4xl">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        treesContainer.appendChild(card);
    });
}

// plant modal
async function openTreeModal(plantId) {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
    const data = await res.json();
    const modalDetails = data.plants;
    treeDetailsModal.showModal();
    modalName.innerText = modalDetails.name;
    modalImage.src = modalDetails.image;
    modalCategory.innerText = modalDetails.category;
    modalDescription.innerText = modalDetails.description;
    modalPrice.innerText = modalDetails.price;
}

// add to cart
function addToCart(id, name, price) {
    const existingCart = cart.find((item) => item.id === id)
    if (existingCart) {
        existingCart.quantity += 1
    } else {
        cart.push({
            id,
            price,
            name,
            quantity: 1
        })
    }
    updateCart()
}

// dynamic cart
function updateCart() {
    cartContainer.innerHTML = "";

    let total = 0;
    cart.forEach((items) => {
        total += items.price *items.quantity;
        const cartItems = document.createElement("div");
        cartItems.className = "flex justify-between flex-col py-2 px-3";
        cartItems.innerHTML = `
                        <div class="flex justify-between">
                            <div>
                                <h2 class="font-bold text-sm mb-1">${items.name}</h2>
                                <p class="text-[16px] text-gray-500">${items.price} x ${items.quantity}</p>
                            </div>
                            <button onClick="removeCart(${items.id})">X</button>
                        </div>
                    <p class="mt-4 flex justify-between text-[16px]">${items.price * items.quantity}</p>
        `
        cartContainer.appendChild(cartItems);
    });
    totalPrice.innerText = total
}

// removing cart
function removeCart(cartId){
    console.log(cartId);
    const updatedCartElement = cart.filter((item)=>item.id != cartId);
    cart = updatedCartElement;
    updateCart()
};

loadTrees();
loadCatagory();