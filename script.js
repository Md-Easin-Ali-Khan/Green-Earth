const categoryContainer = document.getElementById("category-container")
console.log(categoryContainer)

async function loadCatagory() {
    const res = await fetch("https://openapi.programming-hero.com/api/categories")
    const data = await res.json()

    data.categories.forEach(catagory => {

        const div = document.createElement("button");
        div.className = "btn w-full justify-start outline-gray-500 outline py-2 "
        div.innerHTML = catagory.category_name;
        categoryContainer.appendChild(div)
        console.log(div)

    });
}
loadCatagory()