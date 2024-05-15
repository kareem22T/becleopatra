<template>
        <main>
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>{{ lang == 'en' ? 'My Account' : 'حسابي' }}</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end"  :style="lang === 'ar' ? { direction: 'ltr', justifyContent: 'start !important', display: 'flex'} : null">
                            <li class="breadcrumb-item"><a href="#">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</a></li>
                            <li class="breadcrumb-item active">{{ lang == 'en' ? 'Account' : 'الحساب' }}</li>
                        </ol>
                    </div>
                </div>
            </div><!-- END CONTAINER-->
        </div>
        <div class="main_content">
            <!-- START LOGIN SECTION -->
            <div class="login_register_wrap section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-xl-6 col-md-10">
                            <div class="login_wrap">
                                <div class="padding_eight_all bg-white">
                                    <div class="heading_s1">
                                        <h3 style="text-align: center;">
                                            {{ lang == 'en' ? 'Update Profile' : 'تعديل الملف الشخصي' }}
                                        </h3>
                                    </div>
                                    <form method="post" @submit.prevent>
                                        <div class="form-group mb-3">
                                            <input type="text" name="email" id="email" class="form-control"
                                            :placeholder="lang == 'en' ? 'Email' : 'الاسم كامل'" 
                                            v-model="email" disabled />
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="text" name="phone" id="phone" class="form-control"
                                            :placeholder="lang == 'en' ? 'Phone' : 'الاسم كامل'" 
                                            v-model="phone" disabled >
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="text" name="name" id="name" class="form-control"
                                            :placeholder="lang == 'en' ? 'Full Name' : 'الاسم كامل'" 
                                            v-model="name">
                                        </div>
                                        <div class="form-group mb-3">
                                            <button type="submit" class="btn btn-fill-out btn-block" name="login"  @click="update(this.name)">{{ lang == 'en' ? 'Save & Update' : 'حفظ وتحديث' }}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END LOGIN SECTION -->
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

// import { getUser } from './../assets/js/get-user';
import axios from 'axios';
// import { setCookie } from './../assets/js/set-cookie'

export default {
    name: 'EditProfileView',
    data() {
        return {
            user: null,
            lang: 'en',
            name: null,
            phone: null,
            email: null,
        }
    },
    methods: {
        async update(name) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://klm.cdy.mybluehost.me/stores/api/users/updateProfile`, {
                    name: name,
                },
                {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
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
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        $('#errors').fadeOut('slow')
                        console.log(response.data)
                        if (response.data.data.verified == 1) {
                            window.location.href = '/'
                        } else{
                            window.location.href = '/verify'
                        }
                    }, 1300);
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
        },
    },
    mounted() {
        this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
        this.name = this.user.name
        this.email = this.user.email
        this.phone = this.user.phone
        // $('#name').val(this.user.name ? this.user.name : null)
    },
    created() {
        this.getHomeData()
    },
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>