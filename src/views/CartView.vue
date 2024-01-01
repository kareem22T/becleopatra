<template>
    <main class="card_wrapper">
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>My Cart</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Pages</a></li>
                            <li class="breadcrumb-item active">My Cart</li>
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
                        <div class="table-responsive My Cart_table">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="product-thumbnail">&nbsp;</th>
                                        <th class="product-name">Product</th>
                                        <th class="product-price">Price</th>
                                        <th class="product-price">Quantity</th>
                                        <th class="product-stock-status">Total Prices</th>
                                        <th class="product-remove">Remove</th>
                                    </tr>
                                </thead>
                                <tbody v-if="cart && cart.length > 0">
                                    <tr v-for="item in cart" :key="item.id">
                                        <td class="product-thumbnail"><a :href="'/product/' + item.id" target="_blank"><img :src="item.first_image" alt="product1"></a></td>
                                        <td class="product-name" data-title="Product"><a :href="'/product/' + item.id" target="_blank">{{item.name}}</a></td>
                                        <td class="product-price" data-title="Price">{{ item.piece_price }} EGP</td>
                                        <td>
                                            <div class="cart-product-quantity">
                                                <div class="quantity">
                                                    <input type="button" value="-" class="minus" @click="quantities[`product_${item.id}`]  > 1 ? quantities[`product_${item.id}`]  -= 1 : '';updateQty(item.id, quantities[`product_${item.id}`] )">
                                                    <input type="text" name="quantity" title="Qty" class="qty" size="4" v-model="quantities[`product_${item.id}`] ">
                                                    <input type="button" value="+" class="plus" @click="quantities[`product_${item.id}`]  += 1;updateQty(item.id, quantities[`product_${item.id}`] )">
                                                </div>
                                            </div>
                                        </td>
                                        <td class="product-price" data-title="Price">{{item.quantity_price}} EGP</td>
                                        <td class="product-remove" data-title="Remove"><a href="#" @click.prevent="deleteProductToCart(item.id)"><i class="ti-close"></i></a></td>
                                    </tr>
                                </tbody>
                                <tbody v-if="!cart || cart.length == 0">
                                    <td colspan="6" style="text-align: center;padding: 10px;">Your Cart is Empty</td>
                                </tbody>
                            </table>
                            <div  v-if="cart && cart.length > 0" style="display: flex; justify-content: space-between;">
                                <div><h4>Total: {{ total }}</h4></div>
                                <div><router-link to="/checkout" class="btn btn-fill-out" style="float: right;">Checkout</router-link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END SECTION SHOP -->

        </div>
       <div class="hide-content" v-if="showMsgPopUp"></div>
        <div class="pop-up" v-if="showMsgPopUp">
            {{ cart_data.changes_msg }}
            <span>{{ cart_data.changes_span }}</span>
            <button @click="showMsgPopUp = false">{{ cart_data.ok }}</button>
        </div>
        <div class="hide-content" v-if="isOrderFaild"></div>
        <div class="pop-up" v-if="isOrderFaild">
            <p>{{ cart_data.payment_field }}</p>
            <button @click="isOrderFaild = false">{{ cart_data.ok }}</button>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'CartView',
    data() {
        return {
            cart: null,
            quantities: {},
            total: 0,
            products: null,
            cards: null,
            showMsgPopUp: false,
            isOrderFaild: false,
            cart_data: null,
            lang: "en"
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
        async getCart() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://becleopatra.com/api/users/carts/getCartDetails`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": "en"
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.total = response.data.data.sub_total
                    this.cart = response.data.data.products
                    for (let i = 0; i < this.cart.length; i++) {
                        this.quantities[`product_${this.cart[i].id}`] = this.cart[i].qty
                    }
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
        async deleteProductToCart(product_id) {
            $('.loader').fadeIn()
            try {
                const response = await axios.delete(`https://becleopatra.com/api/users/carts/deleteProductFromCart?product_id=${product_id}`,
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
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        if (this.cart.length == 1)
                            window.location.reload()
                        else
                            this.getCart()
                    }, 2000);
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
        async updateQty(product_id, qty) {
            try {
                const response = await axios.put(`https://becleopatra.com/api/users/carts/updateProductQty?product_id=${product_id}&qty=${qty}`,
                {},
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    this.getCart()
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
        getHomeData() {
            this.setLangCookies()
            let data = require('../assets/api/cart.json');
            this.cart_data = this.lang == 'ar' ? data.ar : data.en
            this.getCart(this.lang)
        },
    },
    created() {
        this.getHomeData()
        if (this.$route.query.success && this.$route.query.success === 'false')
            this.isOrderFaild = true;
    },
    mounted() {
        $(document).mousemove(function (e) {
            $('.hint-pop-up').css({
                top: e.clientY,
                left: e.pageX + 10 // Adjust the position to 10px to the right of the mouse
            });
        });
    },
}
</script>

<style scoped>@import './../assets/css/home.css';
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