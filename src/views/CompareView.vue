<template>
    <main class="wishlist_wrapper">
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>Compare</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end"  :style="lang === 'ar' ? { direction: 'ltr', justifyContent: 'start !important', display: 'flex'} : null">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Pages</a></li>
                            <li class="breadcrumb-item active">Compare</li>
                        </ol>
                    </div>
                </div>
            </div><!-- END CONTAINER-->
        </div>
        <div class="main_content">

        <!-- START SECTION SHOP -->
        <div class="section">
            <div class="container">
                <div class="row" v-if="compare && compare.length">
                    <div class="col-md-12">
                        <div class="compare_box">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center">
                                <tbody>
                                    <tr class="pr_image" >
                                        <td class="row_title">{{ lang == 'en' ? 'Product' : 'المنتج' }}</td>
                                        <td class="row_img" v-for="product in compare" :key="product.id"><img :src="product.first_image" alt="compare-img"></td>
                                    </tr>
                                    <tr class="pr_title">
                                        <td class="row_title">Product Name</td>
                                        <td class="product_name" v-for="product in compare" :key="product.id"><a href="shop-product-detail.html">{{ product.name }}</a></td>
                                    </tr>
                                    <tr class="pr_price">
                                        <td class="row_title">{{ lang == 'en' ? 'Price' : 'السعر' }}</td>
                                        <td v-for="product in compare" :key="product.id" class="product_price"><span class="price">{{ product.sale_price ? product.sale_price : product.regular_price }} EGP</span></td>
                                    </tr>
                                    <tr class="pr_add_to_cart">
                                        <td class="row_title">{{ lang == 'en' ? 'Add To Cart' : 'اضافة الي العربة' }}</td>
                                        <td class="row_btn" v-for="product in compare" :key="product.id"><a href="#" class="btn btn-fill-out" @click="
                                        addProductToCart(product.id, 1)"><i class="icon-basket-loaded"></i> Add To Cart</a></td>
                                    </tr>
                                    <tr class="description">
                                        <td class="row_title">{{ lang == 'en' ? 'Description' : 'الوصف' }}</td>
                                        <td class="row_text" v-for="product in compare" :key="product.id"><p>{{product.desc}} </p></td>
                                    </tr>
                                    <tr class="pr_remove">
                                        <td class="row_title"></td>
                                        <td class="row_remove"  v-for="product in compare" :key="product.id">
                                            <a href="#" @click.prevent="removeProductFromCompare(product.id)"><span>Remove</span> <i class="fa fa-times"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 v-if="!compare || compare.length == 0"  style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">{{ lang == 'en' ? 'There are no products added to compare' : 'لا توجد منتجات مضافة للمقارنة' }}</h1>
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

import axios from 'axios';

export default {
    name: 'CompareView',
    data() {
        return {
            about_company: null,
            compare: localStorage.getItem('compare_cart') ? JSON.parse(localStorage.getItem('compare_cart')) : "",
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
        async getAbout(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/aboutCompany`,
                    {
                        headers: {
                            "lang": lang
                        }
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.about_company = response.data.data
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
        async addProductToCart(product_id, qty, product_valid_qty, product_stock) {
            if (product_stock == 2) {
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = 'This product is not available now'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')

                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                }, 3500);

            } else if (product_valid_qty < qty && product_stock == 1) {
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = 'This quantity is not available'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')

                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                }, 3500);
            } else {
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
            }
        },
        removeProductFromCompare(id) {
            const array = this.compare;
            
            // Find the index of the object with the specified id
            const indexToRemove = array.findIndex(item => item.id === id);
            console.log(indexToRemove);
            // Remove the object from the array if it exists
            if (indexToRemove !== -1) {
                array.splice(indexToRemove, 1);
                localStorage.setItem('compare_cart', JSON.stringify(array))
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'success'
                error.innerHTML = this.lang == 'ar' ? 'تم حذف العنصر بنجاح' : 'item has been deleted successfully'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                    $('.loader').fadeOut()
                    this.compare  = localStorage.getItem('compare_cart') ? JSON.parse(localStorage.getItem('compare_cart')) : ""
                }, 2000);
            }
        },
        getHomeData() {
            this.setLangCookies()
            this.getAbout(this.lang)
        },

    },
    created() {
        this.getHomeData()
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>