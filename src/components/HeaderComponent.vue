<template>
    <!-- <header class="main">
        <div class="head">
            <div class="container">
                <div class="left">
                    <p>{{ page_data.welcome_header  }} <span dir="ltr">{{ page_data.egs }}</span></p>
                    <ul>
                        <router-link to="/about-us">
                            <li>{{ page_data.about_us }}</li>
                        </router-link>
                        <router-link to="/careers">
                            <li>{{page_data.careers}}</li>
                        </router-link>
                        <router-link to="/contact-us">
                            <li>{{page_data.contact}}</li>
                        </router-link>
                        <a href="/faq">
                            <li>{{ page_data.faq }}</li>
                        </a>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <router-link to="tel:01145636999">
                            <img src="./../assets/imgs/phone-solid-white.svg" alt="phone icon">
                            <li>{{ page_data.need_help }}: 01145636999</li>
                        </router-link>
                        <router-link to="mailto:support@egyptgamestore.com">
                            <img src="./../assets/imgs/envelope-regular-white.svg" alt="email icon">
                            <li>support@egyptgamestore.com</li>
                        </router-link>
                        <router-link to="">
                            <img src="./../assets/imgs/globe-solid-white.svg" alt="email icon">
                            <li>
                                <select v-model="lang" @change="changeLang()">
                                    <option style="color: #000;" value="en">English</option>
                                    <option style="color: #000;" value="ar">العربية</option>
                                </select>
                            </li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="container">
                <div class="left">
                    <router-link to="/">
                        <img src="./../assets/imgs/logo.png" alt="logo">
                    </router-link>
                    <nav>
                        <a href="" class="close"><i class="fa fa-close"></i></a>
                        <router-link to="/" class="active home_link">{{ page_data.home }}<span></span></router-link>
                        <a href="https://w2eg.com/">World2Egypt<span></span></a>
                        <router-link to="/category/physical-store" class="physical-store">{{ page_data.phy_store }}<span></span></router-link>
                        <router-link to="/category/digital-store" class="digital-store">{{ page_data.card_store }}<span></span></router-link>
                        <router-link class="deals_link" to="/deals">{{ page_data.deals }}<span></span></router-link>
                        <a href="" class="lang_mobile" @click.prevent="this.showLangMore = !this.showLangMore">
                            <i class="fa fa-globe"></i>
                            <span>
                                {{ lang == 'en' ? "English" : "العربية" }}
                            </span>
                            <i class="fa-solid fa-chevron-down"></i>
                            <span style="color: #0b5177;" v-if="showLangMore" class="more_lang">
                                <span @click="lang = 'en', changeLang()">English</span>
                                <span @click="lang = 'ar', changeLang()">العربية</span>
                            </span>
                        </a>

                        <div class="mobile-more">
                            <ul>
                                <a href="tel:01145636999">
                                    <i class="fa fa-phone"></i>
                                    {{ lang == 'en' ? "Call Us" : "اتصل بنا" }}
                                </a>
                                <a href="mailto:support@egyptgamestore.com">
                                    <i class="fa fa-envelope"></i>
                                    {{ lang == 'en' ? "Email Us" : "راسلنا" }}
                                </a>
                            </ul>
                            <ul>
                                    <router-link to="/about-us">
                                        <li>{{ page_data.about_us }}</li>
                                    </router-link>
                                    <router-link to="/careers">
                                        <li>{{ page_data.careers }}</li>
                                    </router-link>
                                    <router-link to="/contact-us">
                                        <li>{{ page_data.contact }}</li>
                                    </router-link>
                                    <a href="/faq">
                                        <li>{{ page_data.faq }}</li>
                                    </a>
                                </ul>
                        </div>
                    </nav>
                    <div class="hide"></div>
                </div>
                <div class="right">
                    <div class="controls">
                        <router-link to="" class="account_btn">
                            <i class="fa-regular fa-user"></i><span>{{ page_data.account}}</span>
                        </router-link>
                        <ul v-if="user == null">
                            <router-link to="/login"><i class="fa-solid fa-chevron-right"></i> {{ page_data.login}}</router-link>
                            <router-link to="/register"><i class="fa-solid fa-chevron-right"></i> {{page_data.register}}</router-link>
                        </ul>
                        <ul v-if="user != null">
                            <router-link to="/edit-profile"><i class="fa-solid fa-chevron-right"></i> {{ page_data.my_profile }}</router-link>
                            <router-link to="/my-orders"><i class="fa-solid fa-chevron-right"></i> {{ page_data.my_orders }}</router-link>
                            <router-link to="/change-password"><i class="fa-solid fa-chevron-right"></i> {{ page_data.change_pass }}</router-link>
                            <router-link to="/log-out" @click.prevent="logout()"><i class="fa-solid fa-chevron-right"></i> {{ page_data.logout }}</router-link>
                        </ul>
                        <router-link to="/my-wishlist" v-if="user != null"><i class="fa-regular fa-heart"></i><span>{{page_data.wishlist}}</span></router-link>
                        <router-link to="/my-cart">
                            <div class="cart_icon_wrapper"><i class="fa-solid fa-cart-shopping"></i><span class="point" v-if="cart && cart.length"></span></div><span>{{page_data.cart}}</span>
                        </router-link>
                        <router-link to="/compare"><i class="fa-solid fa-arrow-right-arrow-left"></i><span>{{page_data.compare}}</span></router-link>
                        <router-link to="" class="search-icon" @click.prevent="showSearchPopUp = true"><i class="fa-solid fa-search"></i><span>{{page_data.search}}</span></router-link>
                        <router-link to="" class="more"><i class="fa-solid fa-bars"></i></router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="hide-content" v-if="showSearchPopUp"></div>
        <div class="pop-up search-pop-up" v-if="showSearchPopUp">
            <div class="input-search">
                <input type="text" name="search" id="search" :placeholder="page_data.search_text" v-model="search" @keyup="getSugesstions()" @keyup.enter="goToSearch" @focus="showSuggesstion = true" @blur="showSuggesstion = false">
                <i class="fa fa-search" style="cursor: pointer" @click="goToSearch"></i>
                <div class="suggestions suggestions2" v-if="results && results.length">
                    <router-link :to="item.product_type == 1 ? `/product/${item.id}` : `/card/${item.id}`" v-for="item in results.slice(0, 5)" :key="item.id" @click="showSearchPopUp = false">{{ item.name }}</router-link>
                    <a href="" style="text-align: center !important; font-weight: 600 !important" @click.prevent="goToSearch" v-if="results && results.length > 5">{{ page_data.view_all }}</a>
                </div>
            </div>
            <button @click="showSearchPopUp = false; this.search = ''">{{page_data.cancel}}</button>
        </div>
    </header> -->
        <!-- START HEADER -->
    <!-- <div class="header_sticky_bar d-none" style="height: 120.167px;"></div> -->
    <header class="header_wrap fixed-top header_with_topbar">
        <div class="top-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="d-flex align-items-center justify-content-center justify-content-md-start">
                            <div class="lng_dropdown me-2">
                                <div style="height: 0px; overflow: hidden; position: absolute;" class="ddOutOfVision"
                                    id="msdrpdd20_msddHolder"><select name="countries" class="custome_select" id="msdrpdd20"
                                        tabindex="-1">
                                        <option value="en" data-image="/assets/images/eng.png" data-title="English">
                                            English</option>
                                        <option value="fn" data-image="/assets/images/fn.png" data-title="France">France
                                        </option>
                                        <option value="us" data-image="/assets/images/us.png" data-title="United States">
                                            United States</option>
                                    </select></div>
                                <div class="dd ddcommon borderRadius" style="width: 132.917px;" id="msdrpdd20_msdd"
                                    tabindex="0">
                                    <div class="ddTitle borderRadiusTp"><span class="divider"></span><span
                                            class="ddArrow arrowoff"></span><span class="ddTitleText "
                                            id="msdrpdd20_title"><img src="/assets/images/eng.png" class="fnone"><span
                                                class="ddlabel">English</span><span class="description"
                                                style="display: none;"></span></span></div><input id="msdrpdd20_titleText"
                                        type="text" autocomplete="off" class="text shadow borderRadius"
                                        style="display: none;">
                                    <div class="ddChild ddchild_ border shadow" id="msdrpdd20_child"
                                        style="z-index: 9999; display: none; position: absolute; visibility: visible; height: 108px;">
                                        <ul>
                                            <li class="enabled _msddli_ selected" title="English"><img
                                                    src="/assets/images/eng.png" class="fnone"><span
                                                    class="ddlabel">English</span>
                                                <div class="clear"></div>
                                            </li>
                                            <li class="enabled _msddli_" title="France"><img src="/assets/images/fn.png"
                                                    class="fnone"><span class="ddlabel">France</span>
                                                <div class="clear"></div>
                                            </li>
                                            <li class="enabled _msddli_" title="United States"><img
                                                    src="/assets/images/us.png" class="fnone"><span class="ddlabel">United
                                                    States</span>
                                                <div class="clear"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="me-3">
                                <div style="height: 0px; overflow: hidden; position: absolute;" class="ddOutOfVision"
                                    id="msdrpdd21_msddHolder"><select name="countries" class="custome_select" id="msdrpdd21"
                                        tabindex="-1">
                                        <option value="USD" data-title="USD">USD</option>
                                        <option value="EUR" data-title="EUR">EUR</option>
                                        <option value="GBR" data-title="GBR">GBR</option>
                                    </select></div>
                                <div class="dd ddcommon borderRadius" style="width: 59px;" id="msdrpdd21_msdd" tabindex="0">
                                    <div class="ddTitle borderRadiusTp"><span class="divider"></span><span
                                            class="ddArrow arrowoff"></span><span class="ddTitleText "
                                            id="msdrpdd21_title"><span class="ddlabel">USD</span><span class="description"
                                                style="display: none;"></span></span></div><input id="msdrpdd21_titleText"
                                        type="text" autocomplete="off" class="text shadow borderRadius"
                                        style="display: none;">
                                    <div class="ddChild ddchild_ border shadow" id="msdrpdd21_child"
                                        style="z-index: 9999; display: none; position: absolute; visibility: visible; height: 108px;">
                                        <ul>
                                            <li class="enabled _msddli_ selected" title="USD"><span
                                                    class="ddlabel">USD</span>
                                                <div class="clear"></div>
                                            </li>
                                            <li class="enabled _msddli_" title="EUR"><span class="ddlabel">EUR</span>
                                                <div class="clear"></div>
                                            </li>
                                            <li class="enabled _msddli_" title="GBR"><span class="ddlabel">GBR</span>
                                                <div class="clear"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <ul class="contact_detail text-center text-lg-start">
                                <li><i class="ti-mobile"></i><span>123-456-7890</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="text-center text-md-end">
                            <ul class="header_list">
                                <li><router-link to="/compare"><i class="ti-control-shuffle"></i><span>Compare</span></router-link>
                                </li>
                                <li><router-link to="/my-wishlist"><i class="ti-heart"></i><span>Wishlist</span></router-link></li>

                                <li  v-if="user == null">
                                    <router-link to="/login"><i class="ti-user"></i><span>Login</span></router-link>
                                </li>

                                <li v-if="user != null" style="position: relative;">
                                    <a href="" @click.prevent class="account_btn"><i class="ti-user"></i><span>{{JSON.parse(user).name}}</span></a>
                                    <ul class="more" style="
                                    position: absolute;
                                    top: calc(100% + 1.2rem);
                                    right: 0;
                                    background: #fff;
                                    z-index: 9999999;
                                    padding: .5rem;
                                    border-radius: 1rem;
                                    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
                                    line-height: 2rem;
                                    text-align: left;
                                    width: clamp(12rem,calc(10.9091rem + 4.3636vw),15rem);
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    white-space: nowrap;
                                    display: none;
                                    ">
                                        <router-link to="/edit-profile" style="line-height: 17px;padding: .5rem 1rem;"><i class="fa-solid fa-chevron-right"></i> {{ page_data.my_profile }}</router-link>
                                        <router-link to="/my-orders" style="line-height: 17px;padding: .5rem 1rem;"><i class="fa-solid fa-chevron-right"></i> {{ page_data.my_orders }}</router-link>
                                        <router-link to="/change-password" style="line-height: 17px;padding: .5rem 1rem;"><i class="fa-solid fa-chevron-right"></i> {{ page_data.change_pass }}</router-link>
                                        <router-link to="/log-out" style="line-height: 17px;padding: .5rem 1rem;" @click.prevent="logout()"><i class="fa-solid fa-chevron-right"></i> {{ page_data.logout }}</router-link>
                                    </ul>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom_header dark_skin main_menu_uppercase">
            <div class="container">
                <nav class="navbar navbar-expand-lg">
                    <router-link class="navbar-brand" to="/">
                        <img class="logo_light" src="/assets/images/logo_light.png" alt="logo">
                        <img class="logo_dark" src="/assets/images/logo_dark.png" alt="logo">
                    </router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-expanded="false">
                        <span class="ion-android-menu"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li class="dropdown">
                                <router-link class="nav-link" to="/">Home</router-link>
                            </li>
                            <li class="dropdown">
                                <a class="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown">Pages</a>
                                <div class="dropdown-menu">
                                    <ul>
                                        <li><router-link class="dropdown-item nav-link nav_item" to="/about-us">About Us</router-link>
                                        </li>
                                        <li><router-link class="dropdown-item nav-link nav_item" to="/contact-us">Contact
                                                Us</router-link></li>
                                        <!-- <li><router-link class="dropdown-item nav-link nav_item" to="/faq">Faq</router-link></li> -->
                                        <li><router-link class="dropdown-item nav-link nav_item" to="/terms">Terms
                                                and Conditions</router-link></li>
                                    </ul>
                                </div>
                            </li>
                            <li class="dropdown dropdown-mega-menu">
                                <a class="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown">Products</a>
                                <div class="dropdown-menu">
                                    <ul class="mega-menu d-lg-flex">
                                        <li class="mega-menu-col col-lg-3">
                                            <ul>
                                                <li class="dropdown-header">Woman's</li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-list-left-sidebar.html">Vestibulum sed</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-left-sidebar.html">Donec porttitor</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-right-sidebar.html">Donec vitae facilisis</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-list.html">Curabitur tempus</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-load-more.html">Vivamus in tortor</a></li>
                                            </ul>
                                        </li>
                                        <li class="mega-menu-col col-lg-3">
                                            <ul>
                                                <li class="dropdown-header">Men's</li>
                                                <li><a class="dropdown-item nav-link nav_item" href="shop-cart.html">Donec
                                                        vitae ante ante</a></li>
                                                <li><a class="dropdown-item nav-link nav_item" href="checkout.html">Etiam ac
                                                        rutrum</a></li>
                                                <li><a class="dropdown-item nav-link nav_item" href="wishlist.html">Quisque
                                                        condimentum</a></li>
                                                <li><a class="dropdown-item nav-link nav_item" href="compare.html">Curabitur
                                                        laoreet</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="order-completed.html">Vivamus in tortor</a></li>
                                            </ul>
                                        </li>
                                        <li class="mega-menu-col col-lg-3">
                                            <ul>
                                                <li class="dropdown-header">Kid's</li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail.html">Donec vitae facilisis</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail-left-sidebar.html">Quisque
                                                        condimentum</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail-right-sidebar.html">Etiam ac
                                                        rutrum</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail-thumbnails-left.html">Donec vitae ante
                                                        ante</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail-thumbnails-left.html">Donec
                                                        porttitor</a></li>
                                            </ul>
                                        </li>
                                        <li class="mega-menu-col col-lg-3">
                                            <ul>
                                                <li class="dropdown-header">Accessories</li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail.html">Donec vitae facilisis</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail-left-sidebar.html">Quisque
                                                        condimentum</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail-right-sidebar.html">Etiam ac
                                                        rutrum</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail-thumbnails-left.html">Donec vitae ante
                                                        ante</a></li>
                                                <li><a class="dropdown-item nav-link nav_item"
                                                        href="shop-product-detail-thumbnails-left.html">Donec
                                                        porttitor</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div class="d-lg-flex menu_banners row g-3 px-3">
                                        <div class="col-sm-4">
                                            <div class="header-banner">
                                                <img src="/assets/images/menu_banner1.jpg" alt="menu_banner1">
                                                <div class="banne_info">
                                                    <h6>10% Off</h6>
                                                    <h4>New Arrival</h4>
                                                    <a href="#">Shop now</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="header-banner">
                                                <img src="/assets/images/menu_banner2.jpg" alt="menu_banner2">
                                                <div class="banne_info">
                                                    <h6>15% Off</h6>
                                                    <h4>Men's Fashion</h4>
                                                    <a href="#">Shop now</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="header-banner">
                                                <img src="/assets/images/menu_banner3.jpg" alt="menu_banner3">
                                                <div class="banne_info">
                                                    <h6>23% Off</h6>
                                                    <h4>Kids Fashion</h4>
                                                    <a href="#">Shop now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><router-link class="nav-link nav_item" to="/contact-us">Contact Us</router-link></li>
                        </ul>
                    </div>
                    <ul class="navbar-nav attr-nav align-items-center">
                        <li><a href="javascript:;" class="nav-link search_trigger"><i
                                    class="fa-solid fa-magnifying-glass"></i></a>
                            <div class="search_wrap">
                                <span class="close-search"><i class="ion-ios-close-empty"></i></span>
                                <form>
                                    <input type="text" placeholder="Search" class="form-control" id="search_input">
                                    <button type="submit" class="search_icon"><i class="ion-ios-search-strong"></i></button>
                                </form>
                            </div>
                            <div class="search_overlay"></div>
                            <div class="search_overlay"></div>
                        </li>
                        <li class="cart_dropdown"><router-link class="nav-link" to="/my-cart"
                                ><i class="fa-solid fa-cart-shopping"></i><span
                                    class="cart_count" v-if="products_cart">{{ products_cart.length }}</span></router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    <!-- END HEADER -->
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import axios from 'axios';
import { destroyAllCookies } from './../assets/js/destroy-cookies';

import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'MainHeader',
    setup() {
        const store = useStore();
        const cartLength = computed(() => store.state.cartLength);
        return { cartLength };
    },
    data() {
        return {
            showSuggesstion: false,
            user: null,
            search: '',
            showSearchPopUp: false,
            cart: null,
            quantities: {},
            total: 0,
            products_cart: null,
            cards_cart: null,
            results: null,
            products: null,
            cards: null,
            lang: "en",
            page_data: null,
            showLangMore: false
        }
    },
    methods: {
        changeLang() {
            document.body.classList.add(this.lang)
            document.body.classList.remove(this.lang == 'ar' ? 'en' : 'ar')

            document.cookie = "lang=" + this.lang + "; max-age=" + 60 * 60 * 24 * 30 + "; path=/";

            sessionStorage.setItem("lang", this.lang);
            var searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has('lang')) {
                window.location.href = "/";
            }

            window.location.reload()
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
        async logout() {

            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://becleopatra.com/api/users/logout`, {
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    destroyAllCookies()
                    sessionStorage.removeItem('user')
                    sessionStorage.removeItem('user_token')
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                        window.location.href = "/";
                    }, 1000);
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
        goToSearch () {
            window.location.href = '/search/' + this.search.replace(/\s+/g, '-')
        },
        async getSugesstions() {
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/products-cards/search?search=${this.search}`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    this.products = response.data.data.products
                    for (let i = 0; i < this.products.length; i++) {
                        this.products[i].product_type = 1;
                        this.quantities[`product_${this.products[i].id}`] = this.products[i].qty
                    }
                    this.cards = response.data.data.cards
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].product_type = 2;
                        this.quantities[`card_${this.cards[i].id}`] = this.cards[i].qty
                    }
                    this.results = this.products.concat(this.cards)

                } else {
                    this.results = null
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
        async getCart() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://becleopatra.com/api/users/carts/getCartDetails`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.showMsgPopUp = response.data.data.is_cart_updated
                    this.total = response.data.data.total
                    this.products_cart = response.data.data.products

                    for (let i = 0; i < this.products_cart.length; i++) {
                        this.products_cart[i].product_type = 1;
                        this.quantities[`product_${this.products_cart[i].id}`] = this.products_cart[i].qty
                    }
                    this.cart = this.products_cart
                } else {
                    $('.loader').fadeOut()
                }

            } catch (error) {
                $('.loader').fadeOut()
                console.error(error);
            }
        },
        getHomeData() {
            this.setLangCookies()
            let data = require('../assets/api/header.json');
            this.page_data = this.lang == 'ar' ? data.ar : data.en
        },
    },
    mounted() {
        this.user = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : null 
        $(window).on('resize', function () {
            if ($(this).width() > 855) {
                $('nav').css('display', 'flex');
            }
            $('.left nav a span').each(function () {
                $(this).width($(this).parent().width() + 10)
            })
        });

        $('.left nav a span').each(function () {
            $(this).width($(this).parent().width() + 10)
        })
        $(document).on('click', '.account_btn', function (e) {
            e.preventDefault();
            if ($('.more').hasClass('animate__bounceIn')) {
                $('.more').fadeOut().removeClass('animate__animated animate__bounceIn')
            } else {
                $('.more').css('display', "flex").addClass('animate__animated animate__bounceIn')
            }
        })
        $(document).on('click', '.more .fa-bars', function (e) {
            e.preventDefault();
            $('nav').attr("style", "display: flex !important;").addClass('animate__animated animate__fadeInRight')
            $('.hide').fadeIn()
        })
        $(document).on('click', '.close, .hide', function (e) {
            e.preventDefault()
            $('nav, .hide').fadeOut()
        })
        $(document).on('click', 'nav a:not(.lang_mobile)', function (e) {
            e.preventDefault()
            if ($(window).width() < 855) {
                $('nav, .hide').fadeOut()
            }
        })
        $(window).resize(function () {
            // Check if the window width is greater than 600 pixels
            $('.left nav a span').each(function () {
                $(this).width($(this).parent().width() + 10)
            })
        })
    },
    created() {
        this.getCart()
        this.getHomeData()
    },
}
</script>