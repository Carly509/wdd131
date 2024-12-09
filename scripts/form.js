const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];


const lastModifiedElement = document.getElementById('last-modified');
lastModifiedElement.textContent = new Date().toLocaleString();


const productNameSelect = document.getElementById('product-name');
if (productNameSelect) {
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productNameSelect.appendChild(option);
    });
}


const form = document.getElementById('product-review-form');
if (form) {
    form.addEventListener('submit', (event) => {

        let reviewCount = parseInt(localStorage.getItem('reviewCount') || '0');
        reviewCount++;
        localStorage.setItem('reviewCount', reviewCount.toString());

        const formData = new FormData(form);
        const selectedProductId = formData.get('product-name');
        localStorage.setItem('selectedProductId', selectedProductId);
    });
}

function displayReviewDetails() {
    const productNameElement = document.getElementById('product-name-display');
    const averageRatingElement = document.getElementById('average-rating');
    const reviewCountElement = document.getElementById('review-count');

    if (productNameElement && averageRatingElement && reviewCountElement) {
        const selectedProductId = localStorage.getItem('selectedProductId');
        const selectedProduct = products.find(product => product.id === selectedProductId);

        if (selectedProduct) {
            productNameElement.textContent = selectedProduct.name;
            averageRatingElement.textContent = selectedProduct.averagerating.toString();
        }

        const reviewCount = localStorage.getItem('reviewCount') || '0';
        reviewCountElement.textContent = reviewCount;
    }
}

if (window.location.pathname.includes('review.html')) {
    displayReviewDetails();
}
