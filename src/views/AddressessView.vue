<template>
    <main class="card_wrapper">
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>{{ lang == "en" ? "My Addressess" : "عناويني" }}</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end"  :style="lang === 'ar' ? { direction: 'ltr', justifyContent: 'start !important', display: 'flex'} : null">
                            <li class="breadcrumb-item"><a href="#">{{ lang == "en" ? "Home" : "الرئيسية" }}</a></li>
                            <li class="breadcrumb-item"><a href="#">{{ lang == "en" ? "Account" : "الحساب" }}</a></li>
                            <li class="breadcrumb-item active">{{ lang == "en" ? "My Addressess" : "عناويني" }}</li>
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
                                        <th class="product-name">{{ lang == 'en' ? "Full address" : "العنوان كامل"}}</th>
                                        <th class="product-price">{{ lang == 'en' ? "Status" : "الحالة"}}</th>
                                        <th class="product-price">{{ lang == 'en' ? "Controles" : "التحكم"}}</th>
                                    </tr>
                                </thead>
                                <tbody v-if="addresses && addresses.length > 0">
                                    <tr v-for="item in addresses" :key="item.id">
                                        <td class="product-price" data-title="Price">{{ item.full_address }}</td>
                                        <td class="product-price" data-title="Price">{{ item.is_default ? (lang == 'en' ? "Default Address" : "عنوان رئيسي") : (lang == 'en' ? "Normal Address" : "عنوان ثانوي") }}</td>
                                        <td class="product-price" data-title="Price">
                                            <button class="btn btn-sm btn-primary" @click="setDefault(item.id)" :style="lang == 'ar' ? {  marginLeft: '10px'} : null">{{ lang == 'en' ? "Set as default" : "تعين كرئيسي"}}</button>
                                            <a class="btn btn-sm btn-success" :href="'/update-address/' + item.id">{{ lang == 'en' ? "Edit" : "تعديل"}}</a>
                                            <button class="btn  btn-sm btn-danger" @click="deleteAddress(item.id)">{{ lang == 'en' ? "Delete" : "حذف"}}</button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-if="!addresses || addresses.length == 0">
                                    <td colspan="6" style="text-align: center;padding: 10px;">{{ lang == 'en' ? "There are no added arddresses then" : "لم يتم اضافة عناوين بعد"  }}</td>
                                </tbody>
                            </table>
                            <router-link to="/add-address" class="btn btn-fill-out" style="margin: auto;">{{ lang == 'en' ? "Add Address" : "اضافة عنوان"}}</router-link>
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
    name: 'AddressessView',
    data() {
        return {
            addresses: null,
            quantities: {},
            total: 0,
            products: null,
            cards: null,
            cities: [],
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
                const response = await axios.get(`https://admin.becleopatra.com/api/users/addresses/getAll`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": "en"
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.addresses = response.data.data
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
                const response = await axios.delete(`https://admin.becleopatra.com/api/users/carts/deleteProductFromCart?product_id=${product_id}`,
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
        async setDefault(address_id) {
            $('.loader').fadeIn()
            try {
                const response = await axios.put(`https://admin.becleopatra.com/api/users/addresses/changeDefault`,
                    {
                        address_id: address_id
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
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        window.location.reload()
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
        async deleteAddress(address_id) {
            $('.loader').fadeIn()
            try {
                const response = await axios.delete(`https://admin.becleopatra.com/api/users/addresses/delete?address_id=${address_id}`,
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
                        window.location.reload()
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