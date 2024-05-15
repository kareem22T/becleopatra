<template>
    <main class="card_wrapper checkout_wrapper">
    <div class="breadcrumb_section bg_gray page-title-mini">
        <div class="container"><!-- STRART CONTAINER -->
            <div class="row align-items-center">
                <div class="col-md-6">
                    <div class="page-title">
                        <h1>{{ lang == 'en' ? "Checkout" : "اتمام الشراء" }}</h1>
                    </div>
                </div>
                <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end"  :style="lang === 'ar' ? { direction: 'ltr', justifyContent: 'start !important', display: 'flex'} : null">
                            <li class="breadcrumb-item"><a href="#">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</a></li>
                            <li class="breadcrumb-item"><a href="#">{{ lang == 'en' ? 'Pages' : 'الصفحات' }}</a></li>
                        <li class="breadcrumb-item active">{{ lang == 'en' ? 'Checkout' : 'اتمام الشراء' }}</li>
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
                <div class="col-lg-12">
                    <div class="toggle_info">
                        <span><i class="fas fa-tag"></i>{{ lang == 'en' ? 'Have a coupon?' : 'هل لديك قسيمة شراء؟' }} <a href="#coupon" data-bs-toggle="collapse" class="collapsed" aria-expanded="false">{{ lang == 'en' ? 'Click here to enter your code' : 'اضغط هنا لكي تدخل رمز القسيمة' }}</a></span>
                    </div>
                    <div class="panel-collapse collapse coupon_form" id="coupon">
                        <div class="panel-body">
                            <p>{{ lang == 'en' ? 'If you have a coupon code, please apply it below.' : 'إذا كان لديك رمز قسيمة، يرجى تطبيقه أدناه.' }}</p>
                            <div class="coupon field_form input-group">
                                <input type="text" class="form-control" :placeholder="lang == 'en' ? 'Enter Coupon Code..' : 'ادخل رمز القسيمة'" v-model="coupon">
                                <div class="input-group-append">
                                    <button class="btn btn-fill-out btn-sm" type="submit" @click.prevent="this.getCartPrice()">{{ lang == 'en' ? 'Apply Coupon' : 'تفعيل الرمز' }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="medium_divider"></div>
                    <div class="divider center_icon"><i class="fa-regular fa-credit-card"></i></div>
                    <div class="medium_divider"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="heading_s1">
                        <h4>{{ lang == 'en' ? 'Billing Details' : 'تفاصيل الدفع' }}</h4>
                    </div>
                    <form method="post">
                        <div class="form-group mb-3">
                            <div class="input_wrapper" style="display: flex;justify-content: center;align-items: center;gap: 20px;">
                                <input type="text" required="" class="form-control" name="name" placeholder="Name" v-model="name" disabled>
                                <a href=""><i class="fa-solid fa-pen-to-square" style="font-size: 29px;"></i></a>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <div class="input_wrapper" style="display: flex;justify-content: center;align-items: center;gap: 20px;">
                                <input type="text" required="" class="form-control" name="name" placeholder="phone" v-model="phone" disabled>
                                <a href=""><i class="fa-solid fa-pen-to-square" style="font-size: 29px;"></i></a>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <div class="input_wrapper" style="display: flex;justify-content: center;align-items: center;gap: 20px;">
                                <input type="text" required="" class="form-control" name="name" :v-model="user_default_address" disabled :placeholder="user_default_address ? user_default_address : 'Add and select your address'">
                                <a href="/my-addresses"><i class="fa-solid fa-pen-to-square" style="font-size: 29px;"></i></a>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <div class="order_review">
                        <div class="heading_s1">
                            <h4>{{ lang == 'en' ? "Your Orders" : "منتجاتك" }}</h4>
                        </div>
                        <div class="table-responsive order_table">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>{{ lang == 'en' ? 'Product' : 'المنتج' }}</th>
                                        <th>{{ lang == "en" ? "Total" : "المجموع" }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in products" :key="item.id">
                                        <td>{{item.name}}<span class="product-qty">x {{item.qty}}</span></td>
                                        <td>{{item.quantity_price}} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr v-if="sub_total">
                                        <th>{{ lang == 'en' ? 'EGP' : 'المجموع الفرعي' }}</th>
                                        <td class="product-subtotal">{{sub_total}} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</td>
                                    </tr>
                                    <tr v-if="value_added_tax">
                                        <th>{{ lang == 'en' ? 'Tax' : 'الضريبة' }}</th>
                                        <td class="product-subtotal">{{value_added_tax}} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</td>
                                    </tr>
                                    <tr v-if="delivery_price">
                                        <th>{{ lang == 'en' ? 'Delivery Price' : 'مصاريف الدفع' }}</th>
                                        <td class="product-subtotal">{{delivery_price}} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</td>
                                    </tr>
                                    <tr v-if="coupon_discount">
                                        <th>{{ lang == 'en' ? 'Discount' : 'الخصم' }}</th>
                                        <td class="product-subtotal">{{coupon_discount}} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</td>
                                    </tr>
                                    <tr v-if="total_price">
                                        <th>{{ lang == 'en' ? 'Total' : 'المجموع' }}</th>
                                        <td class="product-subtotal">{{total_price}} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <a href="#" class="btn btn-fill-out btn-block" @click.prevent="addOrder()">{{ lang == 'en' ? 'Place Order' : 'اتمام الطلب' }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END SECTION SHOP -->
    </div>
    <div class="hide-content" v-if="payment_msg_popup"></div>
        <div class="pop-up" v-if="payment_msg_popup">
            <p v-html="payment_msg"></p>
            <button @click="this.$router.push('/my-orders')">{{ lang == "en" ? "Ok" : "حسنا" }}</button>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'CheckoutView',
    data() {
        return {
            cart: null,
            quantities: {},
            total: 0,
            subtotal: 0,
            products: null,
            cards: null,
            coupon: null,
            ipAddress: null,
            user_default_address: null,
            sub_total: null,
            value_added_tax: null,
            delivery_price: null,
            coupon_discount: null,
            total_price: null,
            payment_msg: null,
            payment_msg_popup: false,
            order_id: null,
            installment_option: false,
            lang: 'en',
            country: 'Egypt',
            page_data: null,
            payment_fees: 0,
            name: null,
            phone: null,
            address: null
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
        async getCart(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/users/carts/getCartDetails`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.total = response.data.data.total
                    this.products = response.data.data.products

                    for (let i = 0; i < this.products.length; i++) {
                        this.products[i].product_type = 1;
                        this.quantities[`product_${this.products[i].id}`] = this.products[i].qty
                    }
                    this.cart = this.products
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
                err.innerHTML = ''
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        async getCartPrice() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/users/carts/getCheckoutDetails` + (this.coupon ? '?coupon_code=' + this.coupon : ''),
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.user_default_address = response.data.data.user_default_address
                    this.sub_total = response.data.data.sub_total
                    this.value_added_tax = response.data.data.value_added_tax
                    this.delivery_price = response.data.data.delivery_price
                    this.coupon_discount = response.data.data.coupon_discount
                    this.total_price = response.data.data.total_price

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
                err.innerHTML = ''
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        async addOrder() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://admin.becleopatra.com/api/users/carts/checkout`,
                    {
                        coupon_code: this.coupon
                    },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        if (response.data.data.payment_link) {
                            window.location.href = response.data.data.payment_link
                            $('.loader').fadeOut()
                        }
                        if (response.data.data.message) {
                            $('.loader').fadeOut()
                            this.payment_msg = response.data.data.message
                            this.payment_msg_popup = true
                        }
                        if (!response.data.data.message && !response.data.data.payment_link) {
                            $('#errors').fadeIn('slow')
                            setTimeout(() => {
                                $('#errors').fadeOut('slow')
                                window.location.href = `/order/${response.data.data.order_id}`
                            }, 3000);
                        }
                    }, 3000);
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
                err.innerHTML = ''
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        async checkCoupon(code, shipping_method) {
            try {
                const response = await axios.post(`https://admin.becleopatra.com/api/users/carts/getCartDetails/coupons/check`,
                    {
                        code: code,
                        shipping_method: shipping_method
                    },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    this.coupon_discount = response.data.data.discount_money
                } else {
                    $('.loader').fadeOut()
                    this.coupon_discount = 0
                }

            } catch (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = ''
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        getIPAddress() {
            axios.get('https://api.ipify.org?format=json')
                .then(response => {
                    this.ipAddress = response.data.ip;
                })
                .catch(error => {
                    console.log(error);
                });
        } ,
        getHomeData() {
            this.setLangCookies()
            let data = require('../assets/api/checkout.json');
            this.page_data = this.lang == 'ar' ? data.ar : data.en
            this.getCart(this.lang)
            this.getIPAddress();
            this.getCartPrice(this.lang)
            this.country = this.lang == 'ar' ? "مصر" : "Egypt"
        },
    },
    created() {
        this.getHomeData()
        let user = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : null 
        this.name = JSON.parse(user).name
        this.phone = JSON.parse(user).phone
    },
    mounted() {
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>