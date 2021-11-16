/**render basket */
const renderBasket = () => {
    if(basket.length > 0) {
        document.getElementById('basket-content').classList.remove('hide');
        document.getElementById('empty-basket-container').classList.add('hide');

        const basketContent = document.getElementById('basket-content');
        basketContent.innerHTML = '';
    
        for(i = 0; i < basket.length; i++) {
            basketContent.innerHTML +=      `<div class="row center basket-item">
                                                <span>${basket[i].amount}x</span>
                                                <span class="basket-item-name">${basket[i].name}</span>
                                                <div class="basket-item-amount-button" onclick="updateBasketWith(${restaurant.products.indexOf(basket[i])}, -1)">-</div>
                                                <div class="basket-item-amount-button"  onclick="updateBasketWith(${restaurant.products.indexOf(basket[i])}, 1)">+</div>
                                                <span class="basket-price">${dressUpPrice(basket[i].price * basket[i].amount)}</span>
                                                <i class="fas fa-trash"  onclick="updateBasketWith(${restaurant.products.indexOf(basket[i])}, 'all')"></i>
                                            </div>`;
        };          
    } else {
        document.getElementById('basket-content').classList.add('hide');
        document.getElementById('empty-basket-container').classList.remove('hide');
    };
};

const renderRestaurant = () => {
    const productsContent = document.getElementById('products-content');
    const categoriesHeaderContent = document.getElementById('categories-header-content');

    productsContent.innerHTML = '';

    /**render name and description */
    document.getElementById('restaurant-name').innerHTML = restaurant.name;
    document.getElementById('restaurant-description').innerHTML = restaurant.description;

    /**Basket*/
    document.getElementById('delivery-price').innerHTML = dressUpPrice(restaurant.deliveryPrice);
    document.getElementById('minimum-not-reached-label').innerHTML = 'Leider kannst Du noch nicht bestellen. ' + restaurant.name + ' liefert erst ab einem Mindestbestellwert von ' + dressUpPrice(restaurant.minimumOrderValue) + ' (exkl. Lieferkosten).';


    /**render cateogires */
    for(i = 0; i < restaurant.categories.length; i++) {
        /**categories menu */
        let productsContentHTML = '';

        if(i == 0){
            categoriesHeaderContent.innerHTML +=    `<a id="categories-menu-button-${i}" href="#category-${i}" class="selected-categories-button categories-button">${restaurant.categories[i].name}</a>`;
        } else {
            categoriesHeaderContent.innerHTML +=    `<a id="categories-menu-button-${i}" href="#category-${i}" class="categories-button">${restaurant.categories[i].name}</a>`;
        };

        /**categories headers */
        productsContentHTML =                   `<div id="category-${i}" class="category-header-container point-out-bg">`;

        if(restaurant.categories[i].image) {
            productsContentHTML+=                       `<img class="category-header-image" src="${restaurant.categories[i].image}"/>`;
        };
        productsContentHTML+=                            `<div class="padding-15">
                                                            <h3>${restaurant.categories[i].name}</h3>`;
        if(restaurant.categories[i].description) { 
            productsContentHTML +=                          `<span class="font-12">${restaurant.categories[i].description}</span>`;
        };
        productsContentHTML +=                            `</div>
                                                        </div>
                                                        <div id="${restaurant.categories[i].name}-content"></div>`;

        productsContent.innerHTML += productsContentHTML;
    };

    /**render products */
    for(i = 0; i < restaurant.products.length; i++) {
        let htmlToAdd = '';
        htmlToAdd +=                                `<div class="product-container">
                                                        <div class="padding-15 product-details" onclick="updateBasketWith(${i}, 1)">
                                                            <h3>${restaurant.products[i].name}</h3>`;
        if(restaurant.products[i].description){
            htmlToAdd +=                                    `<span class="font-12">${restaurant.products[i].description}</span>
                                                            <br>`;
        };
        htmlToAdd +=                                        `<h3 class="color-orange">${dressUpPrice(restaurant.products[i].price)}</h3>
                                                            <div id="add-product-button-${i}" class="add-product-button center">+</div>
                                                        </div>
                                                    </div>`;

        document.getElementById(restaurant.products[i].category + '-content').innerHTML += htmlToAdd;                                                                           
    };
};