<template>
    <!-- <footer>
        <div class="container">
            <div class="main">
                <div class="bg">
                    <div class="container">
                        <span class="circle"></span>
                    </div>
                    <span class="square"></span>
                </div>
                <img src="./../assets/imgs/logo-dark.png">
                <div class="call">
                    <img src="./../assets/imgs/customer_icon.png">
                    <p>
                        {{ footer_data.Got_questions}} {{footer_data.Call}}!
                        <router-link to="tel:01145636999">01145636999</router-link>
                    </p>
                </div>
                <img src="./../assets/imgs/banks.png" alt="">
            </div>
        </div>
        <div class="copy">
            {{ footer_data.cpr }}
        </div>
    </footer> -->
    <footer class="footer_dark">
        <div class="footer_top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="widget">
                            <div class="footer_logo">
                                <a href="#"><img src="/assets/images/logo_dark.png" alt="logo"></a>
                            </div>
                        </div>
                        <div class="widget">
                            <ul class="social_icons social_white">
                                <li><a href="#"><i class="ion-social-facebook"></i></a></li>
                                <li><a href="#"><i class="ion-social-twitter"></i></a></li>
                                <li><a href="#"><i class="ion-social-googleplus"></i></a></li>
                                <li><a href="#"><i class="ion-social-youtube-outline"></i></a></li>
                                <li><a href="#"><i class="ion-social-instagram-outline"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                        <div class="widget">
                            <h6 class="widget_title">Useful Links</h6>
                            <ul class="widget_links">
                                <li><router-link to="/about-us">About Us</router-link></li>
                                <li><router-link to="/contact-us">Contact</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                        <div class="widget">
                            <h6 class="widget_title">Category</h6>
                            <ul class="widget_links" v-if="categories && categories.length > 0">
                                <li v-for="category in categories" :key="category.id"><a :href="`/category/${category.sub_categories[0].id}`">{{category.name}}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6">
                        <div class="widget">
                            <h6 class="widget_title">My Account</h6>
                            <ul class="widget_links">
                                <li><a href="/edit-profile">My Account</a></li>
                                <li><router-link to="/my-orders">Orders History</router-link></li>
                                <li><router-link to="/my-orders">Order Tracking</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="widget">
                            <h6 class="widget_title">Contact Info</h6>
                            <ul class="contact_info contact_info_light">
                                <li v-if="settings">
                                    <i class="ti-location-pin"></i>
                                    <p>{{settings.address}}</p>
                                </li>
                                <li v-if="settings">
                                    <i class="ti-email"></i>
                                    <a :href="`mailto:${settings.email}`">{{settings.email}}</a>
                                </li>
                                <li v-if="settings">
                                    <i class="ti-mobile"></i>
                                    <p>{{settings.phone}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom_footer border-top-tran">
            <div class="container">
                    <p class="mb-md-0 w-100 text-center text-md-start">All Rights reserved by El Karma Co. 2024</p>
            </div>
        </div>
    </footer>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import axios from 'axios';

export default {
    name: 'MainFooter',
    data() {
        return {
            footer_data: null,
            categories: null,
            settings: null,
            lang: "en"
        }
    },
    methods: {
        async getCategories() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/categories/getAll`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": "en"
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.categories = response.data.data
                    // let categories = this.categories
                    // let categoriesWithSub = []

                    //     categories.forEach(category => {
                    //         this.getSubCategories(category.id).then(()=> {
                    //             categoriesWithSub.push(category.sub_categories)
                    //         })
                    //     })
                    //     this.categories = categoriesWithSub

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
                $('.loader').fadeOut()
                console.error(error);
            }
        },
        async getSettings() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/settings`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": "en"
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.settings = response.data.data
                    // let categories = this.categories
                    // let categoriesWithSub = []

                    //     categories.forEach(category => {
                    //         this.getSubCategories(category.id).then(()=> {
                    //             categoriesWithSub.push(category.sub_categories)
                    //         })
                    //     })
                    //     this.categories = categoriesWithSub

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
                $('.loader').fadeOut()
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
            let data = require('../assets/api/footer.json');
            this.footer_data = this.lang == 'ar' ? data.ar : data.en
        },

    },
    created() {
        this.getHomeData()
        this.getCategories()
        this.getSettings()
    },
}
</script>