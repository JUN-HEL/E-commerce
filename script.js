document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const notifications = [];

    const buttons = document.querySelectorAll(".card button");
    const cartCount = document.getElementById("cartCount");
    const cartButton = document.getElementById("cartButton");
    const cartModal = document.getElementById("cartModal");
    const closeCartModal = document.querySelector(".close-cart");
    const cartItemsList = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const notificationButton = document.getElementById("notificationButton");
    const notificationCount = document.getElementById("notificationCount");
    const notificationModal = document.getElementById("notificationModal");
    const closeNotificationModal = document.querySelector(".close-notification");
    const notificationList = document.getElementById("notificationList");

    const productCards = document.querySelectorAll(".card");

    // Function to update the cart UI
    function updateCartUI() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            let listItem = document.createElement("li");
            listItem.textContent = `${item.name} - ${item.price}`;
            cartItemsList.appendChild(listItem);
            total += parseFloat(item.price.replace("$", ""));
        });

        cartTotal.innerText = "$" + total.toFixed(2);
        cartCount.innerText = cart.length;
    }

    // Function to update notifications UI
    function updateNotificationUI() {
        notificationList.innerHTML = "";
        
        notifications.forEach((notif) => {
            let listItem = document.createElement("li");
            listItem.textContent = notif;
            notificationList.appendChild(listItem);
        });

        notificationCount.innerText = notifications.length;
    }

    // Add to Cart Functionality
    buttons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent the card click event

            const productCard = this.parentElement;
            const productName = productCard.querySelector("h2").innerText;
            const productPrice = productCard.querySelector(".price").innerText;
            const productImage = productCard.querySelector("img").src;

            cart.push({ name: productName, price: productPrice, image: productImage });
            alert(productName + " added to cart!");

            notifications.push(`You added ${productName} to your cart.`);
            updateCartUI();
            updateNotificationUI();
        });
    });

    // Open Product Details in a New Window
    productCards.forEach((card) => {
        card.addEventListener("click", function () {
            const productName = this.querySelector("h2").innerText;
            const productPrice = this.querySelector(".price").innerText;
            const productImage = this.querySelector("img").src;
            const productDescription = "This is a high-quality product with great features!"; // Customize this as needed

            // Open product.html in a new tab with product details in URL parameters
            window.open(
                `product.html?name=${encodeURIComponent(productName)}&price=${encodeURIComponent(productPrice)}&image=${encodeURIComponent(productImage)}&description=${encodeURIComponent(productDescription)}`,
                "_blank"
            );
        });
    });

    // Show cart modal
    cartButton.addEventListener("click", function () {
        cartModal.style.display = "flex";
    });

    // Close cart modal
    closeCartModal.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    // Show notification modal
    notificationButton.addEventListener("click", function () {
        notificationModal.style.display = "flex";
        notificationCount.innerText = "0"; // Reset count when viewed
    });

    // Close notification modal
    closeNotificationModal.addEventListener("click", function () {
        notificationModal.style.display = "none";
    });

    // Close modals when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
        if (event.target === notificationModal) {
            notificationModal.style.display = "none";
        }
    });
});
