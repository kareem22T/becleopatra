<template>
    <main class="contact_wrapper">
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                        <h1>{{ lang == 'en' ? "Contact" : "تواصل معنا" }}</h1>
                    </div>
                </div>
                <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end"  :style="lang === 'ar' ? { direction: 'ltr', justifyContent: 'start !important', display: 'flex'} : null">
                            <li class="breadcrumb-item"><a href="#">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</a></li>
                            <li class="breadcrumb-item"><a href="#">{{ lang == 'en' ? 'Pages' : 'الصفحات' }}</a></li>
                        <li class="breadcrumb-item active">{{ lang == 'en' ? "Contact" : "تواصل معنا" }}</li>
                    </ol>
                    </div>
                </div>
            </div><!-- END CONTAINER-->
        </div>
        <div class="main_content">

<!-- START SECTION CONTACT -->
<div class="section pb_70">
    <div class="container">
        <div class="row" v-if="settings">
            <div class="col-xl-4 col-md-6">
                <div class="contact_wrap contact_style3">
                    <div class="contact_icon">
                        <i class="fa fa-map"></i>
                    </div>
                    <div class="contact_text">
                        <span>{{ lang == "en" ? "Address" : "العنوان" }}</span>
                        <p>{{ settings.address }}</p>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                <div class="contact_wrap contact_style3">
                    <div class="contact_icon">
                        <i class="fa fa-envelope"></i>
                    </div>
                    <div class="contact_text">
                        <span>{{ lang == "en" ? "Email Address" : "البريد الالكتروني" }}</span>
                        <a :href="`mailto:${settings.email}`">{{ settings.email }}</a>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                <div class="contact_wrap contact_style3">
                    <div class="contact_icon">
                        <i class="fa fa-phone"></i>
                    </div>
                    <div class="contact_text">
                        <span>{{ lang == "en" ? "phone" : "رقم الهاتف" }}</span>
                        <p>{{ settings.phone }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- END SECTION CONTACT -->

<!-- START SECTION CONTACT -->
<div class="section pt-0">
    <div class="container">
        <div class="row">
            <div class="w-100">
                <div class="heading_s1">
                    <h2>{{ lang == "en" ? "Get In touch" : "كن علي تواصل معنا" }}</h2>
                </div>
                <div class="field_form">
                    <form method="post" name="enq">
                        <div class="row">
                            <div class="form-group col-md-6 mb-3">
                                <input required="" :placeholder="lang == 'en' ? 'Enter Name *' : 'الاسم'" id="first-name" class="form-control" name="name" type="text" v-model="name">
                            </div>
                            <div class="form-group col-md-6 mb-3">
                                <input required="" :placeholder="lang == 'en' ? 'Enter Phone No. *' : 'رقم الهاتف'"  id="phone" class="form-control" name="phone" v-model="phone">
                            </div>
                            <div class="form-group col-md-12 mb-3">
                                <input required="" :placeholder="lang == 'en' ? 'Enter Email *' : 'البريد الالكتروني'" id="email" class="form-control" name="email" type="email" v-model="email">
                            </div>
                            <div class="form-group col-md-12 mb-3">
                                <textarea required="" :placeholder="lang == 'en' ? 'Message *' : 'الرسالة'" id="description" class="form-control" name="message" rows="4" v-model="msg"></textarea>
                            </div>
                            <div class="col-md-12 mb-3">
                                <button type="submit" title="Submit Your Message!" class="btn btn-fill-out" id="submitButton" name="submit" value="Submit" @click="send()">{{ lang == "en" ? "Send Message" : "ارسال" }}</button>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div id="alert-msg" class="alert-msg text-center"></div>
                            </div>
                        </div>
                    </form>		
                </div>
            </div>
        </div>
    </div>
</div>
<!-- END SECTION CONTACT -->

</div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'ContactView',
    data() {
        return {
            name: null,
            email: null,
            phone: null,
            msg: null,
            settings: null,
            lang: "en"
        }
    },
    methods: {
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
        async send() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/sendContactUs`, {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    message: this.message
                }, {
                    headers: {
                        "lang": this.lang
                    }
                }
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    $('.body input, .body textarea').val('')
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
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
        getHomeData() {
            this.setLangCookies()
        },
    },
    created() {
        this.getHomeData()
        this.getSettings()
    },
}
</script>

<style scoped>
@import './../assets/css/home.css';
</style>