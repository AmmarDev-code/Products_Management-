let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

// Calculate Total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#2e7d32';
    } else {
        total.style.backgroundColor = '#b71c1c';
        total.innerHTML = '';
    }
}
getTotal();

// Retrieve Data from LocalStorage
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

// Create & Update Product
submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };

    if (title.value != '' && price.value != '') {
        if (mood === 'create') {
            if (+newPro.count > 1) {
                for (let i = 0; i < +newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
};

// Render Data to Table
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += ` 
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td> 
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" class="btn-table btn-update">update</button></td>
            <td><button onclick="deleteData(${i})" class="btn-table btn-delete">delete</button></td>
        </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;
    let del = document.getElementById('delete');

    if (dataPro.length > 0) {
        del.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
        del.innerHTML = '';
    }
}
showData();

// Clear Form Inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.backgroundColor = '#b71c1c';
}

// Delete Single Product
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// Delete All Products
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// Update Product
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// Search Mood
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + (searchMood === 'title' ? 'Title' : 'Category');
    search.focus();
    search.value = '';
    showData();
}

// Search Filter
function searchData(value) {
    let table = '';
    let val = value.toLowerCase();
    for (let i = 0; i < dataPro.length; i++) {
        let match = false;
        if (searchMood === 'title') {
            if (dataPro[i].title && dataPro[i].title.toLowerCase().includes(val)) {
                match = true;
            }
        } else {
            if (dataPro[i].category && dataPro[i].category.toLowerCase().includes(val)) {
                match = true;
            }
        }

        if (match) {
            table += ` 
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td> 
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" class="btn-table btn-update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-table btn-delete">delete</button></td>
            </tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// Scroll To Top Handler (Mobile UX)
window.onscroll = function () {
    let scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}
