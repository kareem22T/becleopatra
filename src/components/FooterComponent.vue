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
                                <li v-if="settings && settings.facebook"><a :href="settings.facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="25" height="25" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                    </svg>
                                </a></li>
                                <li v-if="settings && settings.instagram"><a :href="settings.instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="25" height="25" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                    <path d="M16.5 7.5l0 .01" />
                                    </svg>
                                </a></li>
                                <li v-if="settings && settings.tiktok"><a :href="settings.tiktok">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-tiktok" width="25" height="25" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
                                    </svg>
                                </a></li>
                                <li v-if="settings && settings.twitter"><a :href="settings.twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-x" width="25" height="25" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                    </svg>
                                </a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                        <div class="widget">
                            <h6 class="widget_title">{{ lang == 'en' ? "Useful Links" : "روابط مهمة" }}</h6>
                            <ul class="widget_links">
                                <li><router-link to="/about-us">{{ lang == 'en' ? "About Us" : "من نحن" }}</router-link></li>
                                <li><router-link to="/contact-us">{{ lang == 'en' ? "Contact Us" : "تواصل معنا" }}</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                        <div class="widget">
                            <h6 class="widget_title">{{ lang == 'en' ? "Category" : "الاقسام" }}</h6>
                            <ul class="widget_links" v-if="categories && categories.length > 0">
                                <li v-for="category in categories" :key="category.id"><a :href="`/category/${category.sub_categories[0].id}`">{{category.name}}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6">
                        <div class="widget">
                            <h6 class="widget_title">{{ lang == 'en' ? "My Account" : "حسابي" }}</h6>
                            <ul class="widget_links">
                                <li><a href="/edit-profile">{{ lang == 'en' ? "My Account" : "حسابي" }}</a></li>
                                <li><router-link to="/my-orders">{{ lang == 'en' ? "Orders History" : "سجل الطلبات" }}</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="widget">
                            <h6 class="widget_title">{{ lang == 'en' ? "Contact Info" : "بيانات الاتصال" }}</h6>
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
                            "lang": this.lang
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
                            "lang": this.lang
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