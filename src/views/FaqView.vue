<template>
    <main class="faq_wrapper">
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>{{ lang == 'en' ? 'Frequently asked question' : 'الاسئلة الشائعة' }}</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Pages</a></li>
                            <li class="breadcrumb-item active">Faq</li>
                        </ol>
                    </div>
                </div>
            </div><!-- END CONTAINER-->
        </div>
        <div class="container">
            <div class="questions">
                <div v-for="item in questions" :key="item.id" class="question" style="border-radius: 0;">
                    <div class="question-value"><span>{{ item.question }}</span><span><i class="fa-solid fa-chevron-down"></i></span></div>
                    <div class="answer">{{ item.answer }}</div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'FaqView',
    data() {
        return {
            questions: null,
            lang: 'en'
        }
    },
    methods: {
        async getFaq() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/settings/faqs`, 
                {
                    headers: {
                        'Referrer-Policy': 'strict-origin-when-cross-origin',
                        "lang": this.lang
                    },
                }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.questions = response.data.data
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
            this.getFaq()
        },
    },
    created() {
        this.getHomeData()
    },
    mounted() {
        $(document).on('click', '.question', function () {
            $(this).find('.answer').slideToggle('fast')
            $(this).find('.question-value i').toggleClass('fa-chevron-down fa-chevron-up')
        })
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>