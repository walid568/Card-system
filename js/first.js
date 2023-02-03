var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var productList;
var currentIndex = 0;
var regex = /^[a-z][a-zA-Z]{3,6}$/;


function validateProductName() {
    if (regex.test(productName.value) == false) {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        return false;
    }
    else {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        return true;
    }
}

productName.addEventListener("keyup", validateProductName);


addBtn.addEventListener("click", function () {

    if (addBtn.innerHTML == "add") {

        addProduct();

    }
    else {
        saveProduct();
    }
})





if (localStorage.getItem("walid") == null) {
    productList = [];
}
else {
    productList = JSON.parse(localStorage.getItem("walid"));
    displayData();

}



function addProduct() {

    if (validateProductName() == true) {


        var product =
        {
            name: productName.value,
            price: productPrice.value,
            cat: productCategory.value,
            desc: productDescription.value
        }

        productList.push(product);
        localStorage.setItem("walid", JSON.stringify(productList));
        displayData();
        clearForm();
    }

}


function displayData() {

    var cartona = "";
    for (var i = 0; i < productList.length; i++) {
        cartona += `<tr>
        <td>`+ i + `</td>
        <td>`+ productList[i].name + `</td>
        <td>` + productList[i].price + `</td>
        <td>`  + productList[i].cat + `</td>
        <td>` + productList[i].desc + `</td>
        <td><button onclick='deleteProduct(`+ i + `)' class='btn btn-danger'>Delete</button></td>
        <td><button onclick='updateProduct(`+ i + `)' class='btn btn-warning'>Update</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
}


function searchProduct(term)//mas2ola 3n elkelma ely b search 3liha
{
    var take = "";

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.includes(term.trim())) {
            take += `<tr>
            <td>`+ i + `</td>
            <td>`+ productList[i].name.replace(term, `<span style="color:red">` + term + `</span>`) + `</td><td>` + productList[i].price + `</td><td>` + productList[i].cat + `</td><td>` + productList[i].desc + `</td>
            <td><button onclick='deleteProduct(`+ i + `)' class='btn btn-danger'>Delete</button></td>
            <td><button onclick='updateProduct(`+ i + `)' class='btn btn-warning'>Update</button></td>
            </tr>`;


        }
    }
    document.getElementById("tableBody").innerHTML = take;

}

function deleteProduct(index)//ta5od rkm elmotag ely 3awza tms7o
{
    productList.splice(index, 1);
    localStorage.setItem("walid", JSON.stringify(productList));
    displayData();

}



function updateProduct(index) {

    currentIndex = index;
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].cat;
    productDescription.value = productList[index].desc;

    addBtn.innerHTML = "update";
}

function saveProduct() {

    var product =
    {
        name: productName.value,
        price: productPrice.value,
        cat: productCategory.value,
        desc: productDescription.value
    }

    productList[currentIndex] = product;
    localStorage.setItem("walid", JSON.stringify(productList));
    displayData();
    clearForm();

    addBtn.innerHTML = "add";
}


function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}