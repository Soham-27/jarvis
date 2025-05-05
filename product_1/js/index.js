let currentPage = 1;
const rowsperpage = 3;

const products = [
    { image: "image.png", name: "watch", price: "Rs 50.00", des: "nice" },
    { image: "image.png", name: "watch", price: "Rs 50.00", des: "nice" },
    { image: "image.png", name: "watch", price: "Rs 50.00", des: "nice" },
    { image: "image.png", name: "watch", price: "Rs 50.00", des: "nice" },
    { image: "image.png", name: "wath", price: "Rs 50.00", des: "nice" },
    { image: "image.png", name: "wach", price: "Rs 50.00", des: "nice" },
    { image: "image.png", name: "wtch", price: "Rs 50.00", des: "nice" },
    { image: "image.png", name: "wtch", price: "Rs 50.00", des: "nice" },
    { image: "image.png", name: "wtch", price: "Rs 50.00", des: "nice" }
]

function displayproducts() {
    const start = (currentPage - 1) * rowsperpage;
    const end = start + rowsperpage;
    const visible = products.slice(start, end);
    let tbody = document.getElementById("tablebody");
    tbody.innerHTML = '';
    for (let i = 0; i < visible.length; i++) {
        tbody.innerHTML += `
        <tr>
        <td><img src=${visible[i].image} class="image"></td>
        <td>${visible[i].name}</td>
        <td>${visible[i].price}</td>
        <td>${visible[i].des}</td>
        </tr>
        `
    }
}

function changePage(direction) {
    const totalpage = Math.ceil(products.length / rowsperpage);
    currentPage = currentPage + direction;
    if (currentPage < 1) {
        currentPage = 1;
    }
    else if (currentPage > totalpage) {
        currentPage = totalpage;
    }
    displayproducts();
}
displayproducts();