<template>
    <div class="product_wrapper category_wrapper">
        <div class="page-head">
            <div class="container" v-if="product">
                    <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i><router-link :to="`/digital-store/${product.sub_category.name.toLowerCase().replace(/\s+/g, '-')}/${product.sub_category.id}`">{{ product.sub_category.name }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> <span class="prod-name">{{ product.name.split(' ').length > 4 ? product.name.split(' ').slice(0, 4).join(' ') + ' ...' : product.name }}
                        <div class="hint-pop-up" v-if="product && product.name.split(' ').length > 4">{{ product.name }}</div>
                    </span>
                </div>
        </div>
        <div class="container" v-if="product">
            <div class="head">
                <div class="cat">
                    <img src="./../assets/imgs/tag.svg" alt="">
                    <h4>{{product.sub_category.name}}</h4>
                </div>
                <div class="right">
                    <div>
                        <a href="" :class="product.isFav ? 'active' : ''" class="add-to-wish" @click.prevent="likeCard(product.id)"><i class="fa-regular fa-heart"></i> <p>{{ card_data.add_to_wishlist }}</p></a>
                    </div>
                    <div>
                        <p>{{card_data.share}}</p>
                        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${this.url}`" target="_blank">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="/" @click.prevent="shareInstagram(caption, url)">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a :href="`https://twitter.com/intent/tweet?url=${this.url}&text=${this.caption}`" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#8897b7" height=".85em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                        </a>

                    </div>
                </div>
            </div>

            <div class="body">
                <div>
                    <div class="imgs">
                        <div class="side">
                            <div class="img" v-for="item in product.images" :key="item.id">
                                <img :src="item.img" alt="">
                            </div>
                        </div>
                        <div class="main_img">
                            <img :src="product.img" alt="">
                        </div>
                    </div>
                    <div class="content">
                        <div class="top">
                            <h1>{{ product.name }}</h1>
                            <div class="rate">
                                <div class="stars">
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star"></i></div>
                                ( 3 {{ card_data.reviews }} ) 
                            </div>
                            <div class="price">
                                <h1 v-if="product.price_after_discount">{{ product.price_after_discount ? product.price_after_discount.toLocaleString() : '' }} <span>{{ card_data.egp }}</span></h1>
                                <h1><span>{{ product.price.toLocaleString() }}</span> <span>{{ card_data.egp }}</span></h1>
                            </div>

                        <div class="saved" v-if="product.price_after_discount"><i class="fa-regular fa-bookmark"></i> {{card_data.saved}}: {{ (product.price - product.price_after_discount).toLocaleString() }} {{ card_data.egp }}</div>
                        </div>

                        <div class="bottom">
                            <div class="quantity">
                                {{card_data.quantity}}
                                <span>
                                    <span @click="this.quantity > 1 ? this.quantity -= 1 : ''">-</span>
                                    <span>{{ quantity }}</span>
                                    <span @click="this.quantity += 1">+</span>
                                </span>
                            </div>
                            <button @click="addCardToCart(product.id, quantity)"><i class="fa-solid fa-cart-shopping"></i> {{ card_data.add_cart }}</button>
                        </div>
                    </div>
                </div>
                <div class="side">
                    <div class="ad">
                        <img src="./../assets/imgs/hero-card-1.jpg" alt="">
                        <a href="/build-pc">{{ card_data.shop_now }}</a>
                        <h1>{{ card_data.build_pc }}</h1>
                    </div>
                    <div class="features">
                        <div>
                            <i class="fa-solid fa-rotate-left"></i>
                            <div>
                                <h4>{{ card_data.free_returns }}</h4>
                                <p>{{ card_data.free_returns_text }}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-truck-fast"></i>
                            <div>
                                <h4>{{card_data.trusted_shipping}}</h4>
                                <p>{{ card_data.free_returns_text }}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-shield-halved"></i>
                            <div>
                                <h4>{{ card_data.secure_shoping }}</h4>
                                <p>{{ card_data.free_returns_text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="details">
                <div class="header">
                    <a href="" :class="show_desc ? 'active' : ''"  @click.prevent="this.show_speci = false; this.show_desc = true; this.show_rev = false">{{ card_data.descreption }}</a>
                    <a href="" :class="show_rev ? 'active' : ''"   @click.prevent="this.show_speci = false; this.show_desc = false; this.show_rev = true">{{ card_data.reviews }}</a>
                </div>
                <div class="body">
                    <div class="desc" v-if="show_desc" v-html="product.desc">
                    </div>
                </div>
            </div>
        </div>
        <div class="container products" v-if="related_cards && related_cards.length > 0">
            <h1>{{ card_data.related }}</h1>
            <div class="body">
                <div class="product" v-for="item in related_cards" :key="item.id">
                    <router-link :to="`/card/${item.id}`">
                        <div class="img">
                            <img :src="item.img" :alt="item.name">
                            <p>{{ item.sub_category.name }}</p>
                            <h4 class="prod-name">
                                {{ item.name.length > 39 ? item.name.slice(0, 39) + '...' : item.name }}
                                <div class="hint-pop-up" v-if="item && item.name.length > 39">{{ item.name }}</div>
                            </h4>
                        </div>
                        <div>
                            <div class="rate">
                                <div class="stars">
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star"></i></div>
                                ( 3 {{card_data.reviews}} ) 
                            </div>
                            <div class="price">
                                <h1 v-if="item.price_after_discount">{{ item.price_after_discount ? item.price_after_discount.toLocaleString() : '' }}</h1>
                                <h1>{{ item.price.toLocaleString() }}</h1>
                            </div>
                                <p class="stock" :class="product.type == 0 ? 'in' : (product.type == 1 ? 'managed' : 'out')">{{ product.type == 0 ? (lang == 'en' ? "In Stock" : "متاح")  : (product.type == 1 ? (lang == 'en' ? "Limited Stock" : "كمية محدودة") : (lang == 'en' ? "Out Of Stock" : "نفذت الكمية")) }}</p>
                            </div>
                    </router-link>
                    <button class="add-to-cart" @click="addCardToCart(item.id, 1)">
                        {{ card_data.add_cart }}
                    </button>
                    <button :class="item.isFav ? 'active' : ''"  class="add-to-wishlist" @click="likeCard(item.id)">
                        <i class="fa-regular fa-heart"></i> {{ card_data.add_to_wishlist }}
                    </button>
                </div>
            </div>
            <div class="pagination" v-if="last_page > 1">
                <div v-for="page_num in last_page" :key="page_num" >
                    <label :for="`page_num_${page_num}`" :class="page_num == page ? 'active' : ''">{{ page_num }}</label>
                    <input type="radio" name="page_num" :id="`page_num_${page_num}`" v-model="page" :value="page_num" @change="fetchProduct(productId)">
                </div>
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
    name: 'CardView',
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
            related_cards: [],
            per_page: 8,
            page: 1,
            total: 0,
            last_page: 0,
            cart: null,
            products: null,
            cards: null,
            card_data: null,
            lang: 'en'
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
        shareInstagram(caption, url_link) {
            let text = encodeURIComponent(caption);
            let url = encodeURIComponent(url_link);
            window.location.href = 'https://www.instagram.com/create/?caption=' + text + '&url=' + url;
        },
        async fetchProduct(productId, lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/cards/getCardDetails?card_id=${productId}&per_page=${this.per_page}&page=${this.page}`, {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                        "lang": lang
                    }
                });
                if (response.data.status === true) {
                    this.product= response.data.data.card
                    this.related_cards = response.data.data.related_cards.cards
                    this.total = response.data.data.related_cards.total
                    this.last_page = response.data.data.related_cards.last_page
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
        async getCart() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/users/carts/getCartDetails`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
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
        async likeCard(card_id) {
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/cards/${card_id}/liked`, {
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    this.fetchProduct(this.productId)
                    $('.loader').fadeOut()
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
        async addCardToCart(product_id, qty) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/cards/${product_id}/add-cart`, {
                    qty: qty,
                    type: 'add',
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
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
                    error.innerHTML = response.data.errors[0] == "quantity is not available" || response.data.errors[0] == "الكمية المطلوبة غير متوفرة" ? (this.lang == "ar" ? "نفذت الكمية" : "Quantity not avilable") : (this.lang == "ar" ? "يجب عليك تسجيل الدخول اولا" :  "You have to login first!" )
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
            this.productId= this.$route.params.id
            this.setLangCookies()
            this.fetchProduct(this.productId, this.lang)
            let data = require('../assets/api/product.json');
            this.card_data = this.lang == 'ar' ? data.ar : data.en
        },
    },
    watch: {
        '$route.params.id': {
            handler: 'getHomeData', // Call the getHomeData method when $route.params.id changes
            immediate: true,       // Call it immediately when the component is created
        },
    },
    mounted() {
        $(document).mousemove(function (e) {
            $('.hint-pop-up').css({
                top: e.clientY,
                left: e.pageX + 10 // Adjust the position to 10px to the right of the mouse
            });
        });
    },
    created() {
        this.getHomeData()
        $(function () {
            $(document).on('click', '.side .img', function () {
                let src = $(this).find('img').attr('src')
                $(this).find('img').attr('src', $('.main_img img').attr('src'))
                $('.main_img img').attr('src', src)
            })
            $(`.digital-store`).addClass('active')
            $(`.digital-store`).siblings().removeClass('active')
        })
        this.getCart()
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