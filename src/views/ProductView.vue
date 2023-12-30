<template>
    <main>
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>Product Detail</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Pages</a></li>
                            <li class="breadcrumb-item active">Product Detail</li>
                        </ol>
                    </div>
                </div>
            </div><!-- END CONTAINER-->
        </div>
        <div class="main_content" v-if="product">

<!-- START SECTION SHOP -->
            <div class="section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 mb-4 mb-md-0">
                            <div class="product-image">
                                <div class="product_img_box">
                                    <img id="product_img" :src="main_image" data-zoom-image="/assets/images/product_img1.jpeg" alt="product_img1">
                                </div>
                                <div id="pr_item_gallery" class="product_gallery_item slick_slider slick-initialized slick-slider" data-slides-to-show="4" data-slides-to-scroll="1" data-infinite="false">
                                    <div class="slick-list draggable" v-if="product && product.images">
                                        <div class="slick-track" v-for="img in product.images" :key="img.id" style="opacity: 1; width: 468px; transform: translate3d(0px, 0px, 0px);">
                                            <div class="item slick-slide slick-active" data-slick-index="2" aria-hidden="false" style="width: 107px;" tabindex="0">
                                                <a href="#" class="product_gallery_item" data-image="/assets/images/product_img1.jpeg" data-zoom-image="/assets/images/product_zoom_img3.jpg" tabindex="0">
                                                    <img :src="img.image" alt="product_small_img3">
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
                                    <h4 class="product_title"><a href="#">{{product.name}}</a></h4>
                                    <div class="product_price" style="display: block;float: none;">
                                        <span class="price">{{product.sale_price ? product.sale_price : product.regular_price}} EGP</span>
                                        <del v-if="product.sale_price">{{product.regular_price}}</del>
                                    </div>
                                    <div class="pr_desc">
                                        <p>{{product.desc}}</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="cart_extra">
                                    <div class="cart-product-quantity">
                                        <div class="quantity">
                                            <input type="button" value="-" class="minus" @click="quantity > 1 ? quantity -= 1 : ''">
                                            <input type="text" name="quantity" title="Qty" class="qty" size="4" v-model="quantity">
                                            <input type="button" value="+" class="plus" @click="quantity += 1">
                                        </div>
                                    </div>
                                    <div class="cart_btn">
                                        <button @click="addProductToCart(productId, quantity)" class="btn btn-fill-out btn-addtocart" type="button"><i class="icon-basket-loaded"></i> Add to cart</button>
                                        <a class="add_compare" @click.prevent="addProductToCompare(product)" href="#"><i class="icon-shuffle"></i></a>
                                        <a class="add_wishlist" :class="product.user_favourite ? 'active' : ''" @click="likeProduct(productId)" href="#"><i class="icon-heart"></i></a>
                                    </div>
                                </div>
                                <hr>
                                <ul class="product-meta">
                                    <li>Category: <a href="#" v-if="product.category">{{product.category.name}}</a></li>
                                </ul>

                                <div class="product_share">
                                    <span>Share:</span>
                                    <ul class="social_icons">
                                        <li><a :href="`https://www.facebook.com/sharer/sharer.php?u=${this.url}/product/${product.id}`" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                                        <li><a :href="`https://twitter.com/intent/tweet?url=${this.url}/product/${product.id}&text=${this.caption}`" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li>
                                        <li><a href="/" @click.prevent="shareOnInstagram()"><i class="fa-brands fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<!-- END SECTION SHOP -->

        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
// import { router } from 'vue';
import axios from 'axios';

export default {
    name: 'ProductView',
    data() {
        return {
            url: window.location.href,
            caption: this.product ? this.product.name : '',
            show_speci: false,
            show_desc: true,
            show_rev: false,
            productId: this.$route.params.id,
            product: null,
            quantity: 1,
            related_products: [],
            per_page: 8,
            page: 1,
            total: 0,
            last_page: 0,
            cart: null,
            products: null,
            cards: null,
            lang: 'en',
            product_data: null,
            main_image: null
        }
    },
    methods: {
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
        shareOnInstagram() {
            var pageUrl = window.location.href;
            var instagramUrl = "https://www.instagram.com/share?url=" + encodeURIComponent(pageUrl);
            window.open(instagramUrl, "_blank");
        },
        async getCart() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://becleopatra.com/api/users/carts/getCartDetails`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.products = response.data.data.products

                    for (let i = 0; i < this.products.length; i++) {
                        this.products[i].product_type = 1;
                    }
                }

            } catch (error) {
                console.error(error);
            }
        },
        async fetchProduct(productId) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://becleopatra.com/api/products/getProductDetails?product_id=${productId}`, {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                        "lang": this.lang
                    }
                });
                if (response.data.status === true) {
                    this.product = response.data.data
                    this.main_image = response.data.data.first_image
                    if (!this.products || !this.products[0])
                        this.showNotProducts = true
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
        async likeProduct(product_id) {
            try {
                const response = await axios.post(`https://becleopatra.com/api/users/favourites/addOrRemoveProduct`, {
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
                    this.getHomeContent()
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
        async updateQty(product_id, qty,) {
            try {
                const response = await axios.put(`https://becleopatra.com/api/users/carts/updateProductQty?product_id=${product_id}&qty=${qty}`, {
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
        async addProductToCart(product_id, qty,) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://becleopatra.com/api/users/carts/addProductToCart?product_id=${product_id}`, {
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
        getHomeData() {
            this.show_speci = false;
            this.show_desc = true;
            this.show_rev = false;
            window.scrollTo(0, 0);
            this.productId = this.$route.params.id
            this.setLangCookies()
            let data = require('../assets/api/product.json');
            this.product_data = this.lang == 'ar' ? data.ar : data.en
            this.fetchProduct(this.productId)
            this.getCart()
        },
    },
    mounted() {
        $('.add-to-wish').on('click', function () {
            $(this).addClass('active')
        })
        $(document).mousemove(function (e) {
            $('.hint-pop-up').css({
                top: e.clientY,
                left: e.pageX + 10 // Adjust the position to 10px to the right of the mouse
            });
        });
    },
    watch: {
        '$route.params.id': {
            handler: 'getHomeData', // Call the getHomeData method when $route.params.id changes
            immediate: true,       // Call it immediately when the component is created
        },
    },
    created() {
        $(function () {
            $(document).on('click', '.side .img', function () {
                let src = $(this).find('img').attr('src')
                $(this).find('img').attr('src', $('.main_img img').attr('src'))
                $('.main_img img').attr('src', src)
            })
    
            $(`.physical-store`).addClass('active')
            $(`.physical-store`).siblings().removeClass('active')
        })
        this.getHomeData()
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