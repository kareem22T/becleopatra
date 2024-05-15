<template>
    <main>
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>{{ lang == 'en' ? 'Update Address' : 'تعديل عنوان' }}</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end"  :style="lang === 'ar' ? { direction: 'ltr', justifyContent: 'start !important', display: 'flex'} : null">
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
                                        <h3 style="text-align: center;">
                                            {{ lang == 'en' ? 'Update Address' : 'تعديل العنوان' }}
                                        </h3>
                                    </div>
                                    <form method="post" @submit.prevent>
                                        <div class="form-group mb-3">
                                            <input type="text" name="street" id="street" class="form-control"
                                            :placeholder="lang == 'en' ? 'Street' : 'الشارع'" 
                                            v-model="street">
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="text" name="building_num" id="street" class="form-control"
                                            :placeholder="lang == 'en' ? 'Building Number' : 'رقم المبني'" 
                                            v-model="building">
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="text" name="floor" id="street" class="form-control"
                                            :placeholder="lang == 'en' ? 'Floor Number' : 'رقم الشقة'" 
                                            v-model="floor">
                                        </div>
                                        <div class="form-group mb-3">
                                            <textarea name="floor" id="street" class="form-control"
                                            :placeholder="lang == 'en' ? 'Notes' : ' ملاحطات'" 
                                            v-model="notes">
                                            </textarea>
                                        </div>
                                        <div class="form-group mb-3">
                                            <button type="submit" class="btn btn-fill-out btn-block" name="login"  @click="update()">{{ lang == 'en' ? 'Update' : 'تعديل' }}</button>
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
    name: 'UpdateAddressView',
    data() {
        return {
            building: null,
            street: null,
            floor: null,
            area_id: 1,
            city_id: 1,
            notes: null,
            address_id: this.$route.params.id,
            lang: "en"
        }
    },
    methods: {
        async update() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.put(`https://admin.becleopatra.com/api/users/addresses/update`, {
                    building: this.building,
                    street: this.street,
                    floor: this.floor,
                    notes: this.notes,
                    area_id: this.area_id,
                    city_id: this.city_id,
                    address_id: this.address_id
                },
                {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                        'lang': this.lang
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
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                        this.$router.push('/my-addresses');
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
        async get() {
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/users/addresses/getDetails?address_id=${this.address_id}`,
                {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                        'lang': this.lang
                    }
                }
                );
                if (response.data.status === true) {
                    this.building = response.data.data.building
                    this.street = response.data.data.street
                    this.floor = response.data.data.floor
                    this.notes = response.data.data.notes
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
    created() {
        this.getHomeData()
        this.get()
    },
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>