let basket = [];

const setup = () => {
    renderRestaurant();
    updateTotalPrice();

    if(window.innerWidth < 1040) {
        document.getElementById('basket-container').classList.add('hide');
    } else {
        document.getElementById('basket-container').style.top = document.getElementById('header-container').clientHeight + 'px';
    };
};


/**update basket with */
const updateBasketWith = (productId, by) => {
    const product = (restaurant.products[productId]);
    const addProductButton = document.getElementById('add-product-button-' + restaurant.products.indexOf(product));
    
    /**update basket list*/
    if (basket.includes(product)){
        if((product.amount == 1 && by == -1 )|| by == 'all') {
            basket.splice(basket.indexOf(product), 1);
            product.amount = 0;
        } else {
            basket[basket.indexOf(product)].amount += by;
        }
    } else {
        product.amount = 1;
        basket.push(product);
    }

    /**update product amount in restaurant product section */
    if(product.amount == 0){
        addProductButton.innerHTML = '+';
        addProductButton.style.fontSize = '32px';
    } else {
        addProductButton.innerHTML = product.amount ;
        addProductButton.style.fontSize = '22px';
    };

    /**show responsive open-basket button*/
    if(basket.length != 0) {
        document.getElementById('basket-responsive-button-container').classList.remove('hide');
    } else {
        document.getElementById('basket-responsive-button-container').classList.add('hide');
    };

    /**update responsive open-basket button number */
    let itemsInBasketAmount = 0;
    for(i = 0; i < basket.length; i++){
        itemsInBasketAmount += basket[i].amount;
    };
    document.getElementById('basket-length-repsonsive-span').innerHTML = itemsInBasketAmount;


    renderBasket();
    updateTotalPrice();
};



/**update subtotal, total, minimum delivery label and orber button */
const updateTotalPrice = () => {
    /**total prices */
    let totalPrice = 0;

    for(i = 0; i < basket.length; i++) {
        totalPrice += basket[i].price * basket[i].amount;
    };

    if(totalPrice > 0) {
        document.getElementById('subtotal').innerHTML = dressUpPrice(totalPrice);
        document.getElementById('total').innerHTML = dressUpPrice(totalPrice + restaurant.deliveryPrice);
        document.getElementById('delivery-price-container').classList.remove('hide');
        document.getElementById('basket-responsive-span').innerHTML = 'Warenkorb (' + dressUpPrice(totalPrice + restaurant.deliveryPrice) + ')';
    } else {
        document.getElementById('delivery-price-container').classList.add('hide');
        document.getElementById('subtotal').innerHTML = dressUpPrice(0);
        document.getElementById('total').innerHTML = dressUpPrice(0);
        document.getElementById('basket-responsive-span').innerHTML = 'Warenkorb (' + dressUpPrice(0) + ')';
    };

    /**Make order button available if minimum order price is reached */
    const orderButton = document.getElementById('order-button');
    if(totalPrice >= restaurant.minimumOrderValue) {
        orderButton.style.background = '#125FCA';
        orderButton.style.cursor = 'pointer';

        document.getElementById('minimum-not-reached-label').classList.add('hide');

    } else {
        orderButton.style.background = '#808080';
        orderButton.style.cursor = 'not-allowed';

        document.getElementById('minimum-not-reached-label').classList.remove('hide');
    };
};


/**dress up price (ex.: 5.5 to 5,50€) */
const dressUpPrice = (priceToDressUp) => {
    return priceToDressUp.toFixed(2).replaceAll('.', ',') + '€';
};


/**Like button */
const heartRestaurant = () => {
    const heartButton = document.getElementById('heart-button');
    if(heartButton.classList.contains('fas')){
        heartButton.classList.replace('fas', 'far');
    } else {
        heartButton.classList.replace('far', 'fas');
    };
};


/**repsonsive basket*/
const openBasket = () => {
    document.getElementById('basket-container').classList.remove('hide');
};

const closeBasket = () => {
    document.getElementById('basket-container').classList.add('hide');
};

window.addEventListener('resize', () => {
    if(window.innerWidth < 1040) {
        document.getElementById('basket-container').classList.add('hide');
        document.getElementById('basket-container').style.top = 0;
    } else {
        document.getElementById('basket-container').classList.remove('hide');
        if(window.scrollY < document.getElementById('header-container').clientHeight) {
            document.getElementById('basket-container').style.top = document.getElementById('header-container').clientHeight + 'px';
        };
    };
});



/**Make header and categories menu fixed when scrolling goes past ++++ show back to top button*/
document.addEventListener('scroll', () => {
    if(window.innerHeight < document.getElementById('body').clientHeight){

        /**basket */
        const basketContainerStyle = document.getElementById('basket-container').style;

        if(scrollY >= document.getElementById('header-container').clientHeight){
            /**header invisible */
            basketContainerStyle.position = "fixed";
            basketContainerStyle.top = 0;
        } else{
            /**header visible */
            basketContainerStyle.position = "absolute";
            if(window.innerWidth > 1040) {
                basketContainerStyle.top = document.getElementById('header-container').clientHeight + 'px';
            };
        };
    
        /**categories menu*/
        const categoriesDistanceToTop = window.pageYOffset + document.getElementById('categories-holder').getBoundingClientRect().top ;
        const categoriesContainer = document.getElementById('categories-header-content');

        if(scrollY >= categoriesDistanceToTop){
            categoriesContainer.classList.add('after');
            categoriesContainer.style.position = "fixed";
        } else {
            categoriesContainer.classList.remove('after');
            categoriesContainer.style.position = "unset";
        };
    };
    
    /**Categories menu buttons */
    for(i = 0; i < restaurant.categories.length; i++){
        if(scrollY > window.pageYOffset + document.getElementById('category-' + i).getBoundingClientRect().top - 340) {
            for(j = 0; j < restaurant.categories.length; j++) {
                document.getElementById('categories-menu-button-' + j).classList.remove('selected-categories-button');
            };
            document.getElementById('categories-menu-button-' + i).classList.add('selected-categories-button');
        };
    };
    
    /**back to top button */
    if(scrollY > window.innerHeight) {
        document.getElementById('back-to-top-button').classList.remove('hide');
    } else {
        document.getElementById('back-to-top-button').classList.add('hide');
    };
 });
