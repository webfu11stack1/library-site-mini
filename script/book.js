const cart = []; // Savatcha ro‘yxati

// Savatga qo‘shish
// Toastni ishlatish uchun Bootstrap komponentlarini yuklaymiz
const toast = new bootstrap.Toast(document.getElementById('toastMessage'));

// Savatga qo'shish funksiyasida Toastni qo'shamiz
document.querySelectorAll('.btn-add-cart').forEach(button => {
button.addEventListener('click', () => {
const name = button.getAttribute('data-name');
const price = parseInt(button.getAttribute('data-price'));
const existingItem = cart.find(item => item.name === name);

if (existingItem) {
    existingItem.quantity++;
} else {
    cart.push({ name, price, quantity: 1 });
}
updateCart();

// Toastni ko'rsatish
toast.show();
});
});
// Tozalash tugmasi bosilganda savatchani tozalash
document.getElementById('clearCartButton').addEventListener('click', () => {
// Savatni tozalash
cart.length = 0;
updateCart();
});


// Savatchani yangilash
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const totalPriceSpan = document.getElementById('totalPrice');
    cartItemsDiv.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        cartItemsDiv.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <img src 
                    <strong>${item.name}</strong><br>
                    Narx: ${item.price.toLocaleString()} so'm<br>
                    Miqdor: ${item.quantity}
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary" onclick="changeQuantity(${index}, 1)">+</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="changeQuantity(${index}, -1)">-</button>
                </div>
            </div>`;
    });

    totalPriceSpan.textContent = totalPrice.toLocaleString();
}

// Mahsulot miqdorini o‘zgartirish
function changeQuantity(index, delta) {
    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

// Buyurtma berish
document.getElementById('orderButton').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Savatchangiz bo'sh!");
        return;
    }

    let orderSummary = "Buyurtmangiz:\n";
    cart.forEach(item => {
        orderSummary += `${item.name} - ${item.quantity} ta, jami ${item.price * item.quantity} so'm\n`;
    });
    orderSummary += `\nUmumiy summa: ${document.getElementById('totalPrice').textContent} so'm`;

    alert(orderSummary);
    cart.length = 0;
    updateCart();
});
function searchBooks() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const books = document.querySelectorAll('.book-card');

    books.forEach(book => {
        const title = book.getAttribute('data-title').toLowerCase();
        book.style.display = title.includes(searchTerm) ? '' : 'none';
    });
}
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) { // Scroll qilinganda 50px dan ortiq bo'lsa
        header.classList.add('scrolled'); // "scrolled" klassini qo‘shish
    } else {
        header.classList.remove('scrolled'); // Scroll yuqoriga qaytganida klassni olib tashlash
    }
});

