<template>
    <main class="">
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>{{ lang == 'en' ? 'Account' : 'الحساب' }}</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end">
                            <li class="breadcrumb-item"><a href="#">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</a></li>
                            <li class="breadcrumb-item"><a href="#">{{ lang == 'en' ? 'Pages' : 'الصفحات' }}</a></li>
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
                                        <h3 style="text-align: center;">{{ lang == 'en' ? 'Forgot password' : 'نسيت كلمة السر' }}</h3>
                                        <p style="text-align: center;">{{ lang == 'en' ? 'Please write down your Email' : 'من فضلك ادخل بريدك الالكتروني' }}</p>
                                    </div>
                                    <form method="post" @submit.prevent>
                                        <div class="form-group mb-3">
                                            <input type="email" class="form-control" name="verification_code" id="verification_code" :placeholder="lang == 'en' ? 'Email' : 'البريد الالكتروني'" v-model="email">
                                        </div>
                                        <div class="form-group mb-3">
                                            <button type="submit" class="btn btn-fill-out btn-block" name="login"  @click="reset(this.email)">{{ lang == 'en' ? 'Reset Now !' : 'إعادة الضبط!' }}</button>
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


import axios from 'axios';

export default {
    name: 'ForgotPassView',
    data() {
        return {
            email: null,
            lang: 'en'
        }
    },
    methods: {
        async reset(email) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/requestPasswordReset`, {
                    email: email,
                },
                {
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
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        $('#errors').fadeOut('slow')
                        this.$router.push('/reset-password')
                    }, 3000);
                } else {
                    document.getElementById('errors').innerHTML = ''
                    $.each(response.data.errors, function (key, value) {
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = value
                        document.getElementById('errors').append(error)
                    });
                    $('#errors').fadeIn('slow')
                    
                    $('.loader').fadeOut()
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
    created() {
        this.getHomeData()
    },
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>