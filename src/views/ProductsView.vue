<template>
    <div class="category_wrapper">
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>{{ lang == "en" ? "Products" : "المنتجات" }}</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end"  :style="lang === 'ar' ? { direction: 'ltr', justifyContent: 'start !important', display: 'flex'} : null">
                            <li class="breadcrumb-item"><a href="#">{{ lang == "en" ? "Home" : "الرئيسية" }}</a></li>
                            <li class="breadcrumb-item active">{{ lang == "en" ? "Products" : "المنتجات" }}</li>
                        </ol>
                    </div>
                </div>
            </div><!-- END CONTAINER-->
        </div>
        <div class="main_content">

        <!-- START SECTION SHOP -->
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="row shop_container grid" v-if="products">
                            <div class="col-lg-3 col-md-4 col-6"
                                v-for="product in products" :key="product.id">
                                <div class="product">
                                    <span class="pr_flash bg-success" v-if="product.on_sale">Sale</span>
                                    <div class="product_img">
                                        <a :href="`/product/${product.id}`">
                                            <img :src="product.first_image" alt="product_img6">
                                        </a>
                                        <div class="product_action_box">
                                            <ul class="list_none pr_action_btn">
                                                <li class="add-to-cart"
                                                    @click.prevent="addProductToCart(product.id, 1)"><a href="#"><i
                                                            class="icon-basket-loaded"></i> {{ lang == 'en' ? "Add to Cart" : "اضافة الي العربة" }}</a></li>
                                                <li><a href="/" @click.prevent="showProdDetails = true;selectedProduct = product;" class="popup-ajax"><i
                                                            class="icon-magnifier-add"></i></a></li>
                                                <li><a href="" class="wish_btn"
                                                        :class="product.user_favourite ? 'active' : ''"
                                                        @click.prevent="likeProduct(product.id)"><i
                                                            class="icon-heart"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="product_info">
                                        <h6 class="product_title"><a :href="`/product/${product.id}`">{{ product.name
                                        }}</a></h6>
                                        <div class="product_price">
                                            <span class="price">{{ product.regular_price + ( lang == 'en' ? "EGP" : "جنيه مصري" ) }}</span>
                                            <del v-if="product.on_sale">{{ product.sale_price + ( lang == 'en' ? "EGP" : "جنيه مصري" ) }}</del>
                                        </div>
                                        <!-- <div class="rating_wrap">
                                            <div class="rating">
                                                <div class="product_rate" style="width:68%"></div>
                                            </div>
                                            <span class="rating_num">(15)</span>
                                        </div> -->
                                        <div class="pr_desc">
                                            <p>{{ product.desc }}</p>
                                        </div>
                                        <!-- <div class="pr_switch_wrap">
                                            <div class="product_color_switch">
                                                <span class="active" data-color="#87554B" style="background-color: rgb(135, 85, 75);"></span>
                                                <span data-color="#333333" style="background-color: rgb(51, 51, 51);"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END SECTION SHOP -->

    </div>

        <div class="container not_products" v-if="(!products || !products[0])">
            <h1 style="margin: 5rem 0; text-align:center;color: #717171;">{{ lang == 'en' ? "No reluts found" : "لا توجد نتائج" }}</h1>
        </div>
        <div class="mfp-bg mfp-ready" @click="showProdDetails = false" v-if="showProdDetails && selectedProduct"></div>
        <div class="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" dir="ltr" tabindex="-1" style="overflow: hidden auto;"  v-if="showProdDetails && selectedProduct">
            <div class="mfp-container mfp-ajax-holder mfp-s-ready">
                <div class="mfp-content">
                    <div class="ajax_quick_view">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 mb-4 mb-md-0">
                                <div class="product-image">
                                    <div class="product_img_box">
                                        <img id="product_img" :src="selectedProduct.first_image"
                                            data-zoom-image="assets/images/product_zoom_img1.jpg" alt="product_img1">
                                    </div>
                                    <div id="pr_item_gallery"
                                        class="product_gallery_item slick_slider slick-initialized slick-slider"
                                        data-slides-to-show="4" data-slides-to-scroll="1" data-infinite="false">
                                        <div class="slick-list draggable" v-if="selectedProduct.images">
                                            <div class="slick-track"
                                                style="opacity: 1; width: 575px; transform: translate3d(0px, 0px, 0px);">
                                                <div class="item slick-slide slick-current slick-active" v-for="img in selectedProduct.images"
                                                    data-slick-index="0"  :key="img.id" aria-hidden="false" style="width: 105px;"
                                                    tabindex="0">
                                                    <a href="#" class="product_gallery_item active"
                                                        data-image="assets/images/product_img1.jpg"
                                                        data-zoom-image="assets/images/product_zoom_img1.jpg" tabindex="0">
                                                        <img :src="img.image"
                                                            alt="product_small_img1">
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="pr_detail">
                                    <div class="product_description">
                                        <h4 class="product_title"><a :href="`/product/${selectedProduct.id}`">{{selectedProduct.name}}</a></h4>
                                        <div class="product_price" style="float: none">
                                            <span class="price">{{selectedProduct.sale_price ? selectedProduct.sale_price : selectedProduct.regular_price}} {{ lang == 'en' ? "EGP" : "جنيه مصري" }}</span>
                                            <del v-if="selectedProduct.on_sale">{{selectedProduct.sale_price}} {{ lang == 'en' ? "EGP" : "جنيه مصري" }}</del>
                                        </div>
                                        <div class="pr_desc">
                                            <p>{{selectedProduct.desc}}</p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="cart_extra">
                                        <div class="cart-product-quantity">
                                            <div class="quantity">
                                                <input type="button" value="-" class="minus" @click="selectedProductQty >1 ? selectedProductQty -= 1 : ''">
                                                <input type="text" name="quantity" title="Qty" class="qty"
                                                    size="4" v-model="selectedProductQty">
                                                <input type="button" @click="selectedProductQty += 1" value="+" class="plus">
                                            </div>
                                        </div>
                                        <div class="cart_btn">
                                            <button class="btn btn-fill-out btn-addtocart" type="button" @click="addProductToCart(selectedProduct.id, selectedProductQty)"><i
                                                    class="icon-basket-loaded"></i> {{ lang == 'en' ? "Add to Cart" : "اضافة الي العربة" }}</button>
                                            <a class="add_wishlist" href="#" @click.prevent="likeProduct(selectedProduct.id)"><i class="icon-heart"></i></a>
                                        </div>
                                    </div>
                                    <hr>
                                    <ul class="product-meta">
                                        <li>Category: <a href="#" v-if="selectedProduct.category">{{selectedProduct.category.name}}</a></li>
                                    </ul>

                                    <div class="product_share">
                                        <span>Share:</span>
                                        <ul class="social_icons">
                                            <li><a :href="`https://www.facebook.com/dialog/feed?app_id=1389892087910588%20&redirect_uri=http://becleopatra.com/product/${selectedProduct.id}%20&link=http://becleopatra.com/product/${selectedProduct.id}%20&picture=${selectedProduct.first_image}%20&caption=${selectedProduct.name}caption%20&description=${selectedProduct.name}`" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                                            <li><a :href="`https://twitter.com/intent/tweet?url=${this.url}/product/${selectedProduct.id}&text=${this.caption}`" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li>
                                            <li><a href="/" @click.prevent="shareOnInstagram()"><i class="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button title="Close (Esc)" @click="showProdDetails = false; selectedProductQty = 1" type="button" class="mfp-close">×</button>
                    </div>
                </div>
                <div class="mfp-preloader">Loading...</div>
            </div>
        </div>
        <div class="pagination" v-if="last_page > 1">
            <div v-for="page_num in last_page" :key="page_num" >
                <label :for="`page_num_${page_num}`" :class="page_num == page ? 'active' : ''">{{ page_num }}</label>
                <input type="radio" name="page_num" :id="`page_num_${page_num}`" v-model="page" :value="page_num" @change="fetchProducts(categoryId)">
            </div>
        </div>
    </div>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
// import { router } from 'vue';
import axios from 'axios';

export default {
    name: 'ProductsView',
    data() {
        return {
            catId: this.$route.params.id,
            results: null,
            showProdDetails: false,
            selectedProduct: {},
            selectedProductQty: 1,
            last_page: 1,
            page: 1,
            quantities: {},
            total: 0,
            products: null,
            cards: null,
            cart: null,
            products_cart: null,
            cards_cart: null,
            lang: 'en'
        }
    },
    methods: {
        async addProductToCart(product_id, qty,) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://admin.becleopatra.com/api/users/carts/addProductToCart?product_id=${product_id}`, {
                    qty: qty,
                    type: 'add',
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    this.updateQty(product_id, qty)
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                        if (!this.cart || !this.cart.length) {
                            window.location.reload()
                        }
                    }, 1000);
                } else {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = response.data.errors[0] == "quantity is not available" || response.data.errors[0] == "الكمية المطلوبة غير متوفرة" ? (this.lang == "ar" ? "نفذت الكمية" : "Quantity not avilable") : (this.lang == "ar" ? "يجب عليك تسجيل الدخول اولا" : "You have to login first!")
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')

                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                    }, 3500);
                }

            } catch (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = 'server error try again later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }

        },
        async updateQty(product_id, qty,) {
            try {
                const response = await axios.put(`https://admin.becleopatra.com/api/users/carts/updateProductQty?product_id=${product_id}&qty=${qty}`, {
                    qty: qty,
                    product_id: product_id,
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        }
                    },
                );
                if (response.data.status === true) {
                    console.log('');
                } else {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = response.data.errors[0] == "quantity is not available" || response.data.errors[0] == "الكمية المطلوبة غير متوفرة" ? (this.lang == "ar" ? "نفذت الكمية" : "Quantity not avilable") : (this.lang == "ar" ? "يجب عليك تسجيل الدخول اولا" : "You have to login first!")
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')

                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                    }, 3500);
                }

            } catch (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = 'server error try again later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }

        },
        async fetchProducts() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/products/getProductsByType?type=0&sub_category_id=${this.catId}&page=${this.page}`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        }
                    },
                );
                if (response.data.status === true) {
                    this.products = response.data.data.products
                    this.last_page = response.data.data.last_page
                    for (let i = 0; i < this.products.length; i++) {
                        this.quantities[`product_${this.products[i].id}`] = this.products[i].qty
                    }
                    this.results = this.products

                    $('.loader').fadeOut()
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                    }, 4000);
                } else {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    $.each(response.data.errors, function (key, value) {
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = value
                        document.getElementById('errors').append(error)
                    });
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                    }, 3500);
                }

            } catch (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = 'server error try again later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        shareOnInstagram() {
            var pageUrl = window.location.href + `/product/${this.selectedProduct.id}`;
            var instagramUrl = "https://www.instagram.com/share?url=" + encodeURIComponent(pageUrl);
            window.open(instagramUrl, "_blank");
        },
        addProductToCompare(product) {
            $('.loader').fadeIn()
            if (localStorage.getItem('compare_cart')) {
                if (JSON.parse(localStorage.getItem('compare_cart')).length < 3) {
                    let compare = JSON.parse(localStorage.getItem('compare_cart'));
                    let itemExists1 = compare[0] ? compare[0].id == product.id : false
                    let itemExists2 = compare[1] ? compare[1].id == product.id : false
                    let itemExists3 = compare[2] ? compare[2].id == product.id : false
                    if (!itemExists1 && !itemExists2 && !itemExists3) {
                        compare.push(product)
                        localStorage.setItem('compare_cart', JSON.stringify(compare))
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'success'
                        error.innerHTML = this.lang == 'ar' ? 'تمت إضافة المنتج للمقارنة بنجاح' : 'product added to compare successfully'
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        setTimeout(() => {
                            $('input').css('outline', 'none')
                            $('#errors').fadeOut('slow')
                            $('.loader').fadeOut()
                        }, 2000);
                    } else {
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = this.lang == 'ar' ? 'هذا المنتج موجود بالفعل في المقارنة' : 'This product is already in the compare'
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }
                } else {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = this.lang == 'ar' ? 'المقارنة لا يمكن أن تحتوي على أكثر من 3 عناصر' : 'Compare cannot have more than 3 items'
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }, 2000);
                }
            } else {
                let compare = []
                compare.push(product)
                localStorage.setItem('compare_cart', JSON.stringify(compare))
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'success'
                error.innerHTML = this.lang == 'ar' ? 'تمت إضافة المنتج للمقارنة بنجاح' : 'product added to compare successfully'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                    $('.loader').fadeOut()
                }, 2000);
            }
        },
        async likeProduct(product_id) {
            try {
                const response = await axios.post(`https://admin.becleopatra.com/api/users/favourites/addOrRemoveProduct`, {
                    product_id: product_id,
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    $('.loader').fadeOut()
                    this.fetchProducts()
                } else {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    $.each(response.data.errors, function (key, value) {
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = value
                        document.getElementById('errors').append(error)
                    });
                    $('#errors').fadeIn('slow')

                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                    }, 3500);
                }

            } catch (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = 'server error try again later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        async getCart() {
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/users/carts/getCartDetails`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.products_cart = response.data.data.products

                    for (let i = 0; i < this.products_cart.length; i++) {
                        this.products_cart[i].product_type = 1;
                    }
                    this.cards_cart = response.data.data.cards
                    for (let i = 0; i < this.cards_cart.length; i++) {
                        this.cards_cart[i].product_type = 2;
                    }
                    this.cart = this.products_cart.concat(this.cards_cart)
                }
            } catch (error) {
                console.error(error);
            }
        },
        setLangCookies() {
            let langCheck = document.cookie.indexOf('lang')

            this.is_cookies = langCheck >= 0 ? true : false

            function getCookie(cname) {
                let name = cname + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            } // to get an cookie by name ##############################

            if (langCheck !== -1) {
                this.lang = getCookie('lang') // check lang cookie exist ##############################
            }

            if (sessionStorage.getItem("lang"))
                this.lang = sessionStorage.getItem("lang") // check lang session exist ##############################

            sessionStorage.setItem("lang", this.lang); // set lang session ##############################

            let searchParams = new URLSearchParams(window.location.search)
            if (searchParams.has('lang')) {
                this.lang = searchParams.get('lang')
                document.body.classList.add(searchParams.get('lang')) // add lang class ##############################
            } else {
                document.body.classList.add(this.lang) // add lang class ##############################
            }

        },
        getHomeData() {
            this.setLangCookies()
            this.fetchProducts()
        },
    },
    created() {
        this.getHomeData()
    },
    mounted() {
        $(`.${this.$route.meta.category_path}`).addClass('active')
        $(`.${this.$route.meta.category_path}`).siblings().removeClass('active')
        $(document).mousemove(function (e) {
            $('.hint-pop-up').css({
                top: e.clientY,
                left: e.pageX + 10 // Adjust the position to 10px to the right of the mouse
            });
        });
    },
}
</script>

<style>
.hint-pop-up {
    position: fixed;
    display: none;
    padding: 10px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    z-index: 99999;
    font-size: 12px;
    border-radius: 10px;
}

.prod-name:hover .hint-pop-up {
    display: block;
}

.prod-name {
    position: relative;
    cursor: pointer;
}
</style>