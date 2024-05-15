<template>
    <main>
        <!-- START SECTION BANNER -->
        <div class="banner_section slide_medium shop_banner_slider staggered-animation-wrap">
            <div id="carouselExampleControls" class="carousel slide carousel-fade light_arrow" data-bs-ride="carousel">
                <div class="carousel-inner" v-if="home_content && home_content.products_ads && home_content.products_ads.length > 0">
                    <div  v-for="item in home_content.products_ads" :key="item.id" class="carousel-item background_bg active" :data-img-src="item.image"
                    :style="{ backgroundImage: 'url(\'' + item.image + '\')' }">
                        <div class="banner_slide_content">
                            <div class="container"><!-- STRART CONTAINER -->
                                <div class="row">
                                    <div class="col-lg-7 col-9">
                                        <div class="banner_content overflow-hidden">
                                            <a class="btn btn-fill-out rounded-0 staggered-animation text-uppercase animated slideInLeft"
                                                :href="`product/${item.id}`" data-animation="slideInLeft"
                                                data-animation-delay="1.5s" style="animation-delay: 1.5s; opacity: 1;">{{ lang == "en" ? "Shop Now" : "تسوق الان"}}</a>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- END CONTAINER-->
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev"><i
                        class="fa fa-chevron-left"></i></a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next"><i
                        class="fa fa-chevron-right"></i></a>
            </div>
        </div>
        <!-- END SECTION BANNER -->

        <div class="section small_pt" style="padding-bottom: 0;">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="heading_s1 text-center">
                            <h2>{{ lang == "en" ? "Exclusive Products" : "منتجات حصرية"}}</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="tab-style1">
                            <ul class="nav nav-tabs justify-content-center" role="tablist">
                                <li class="nav-item" role="presentation"
                                    v-if="home_content && home_content.new_products && home_content.new_products.length > 0">
                                    <a class="nav-link active" id="arrival-tab" data-bs-toggle="tab" href="#arrival"
                                        role="tab" aria-controls="arrival" aria-selected="true">{{ lang == "en" ? "Latest Products" : "اخر المنتجات"}}</a>
                                </li>
                                <li class="nav-item" role="presentation"
                                    v-if="home_content && home_content.best_selling_products && home_content.best_selling_products.length > 0">
                                    <a class="nav-link" id="sellers-tab" data-bs-toggle="tab" href="#sellers" role="tab"
                                        aria-controls="sellers" aria-selected="false" tabindex="-1">{{ lang == "en" ? "Best Sellers" : "الافضل"}}</a>
                                </li>
                                <li class="nav-item" role="presentation"
                                    v-if="home_content && home_content.recommended_products && home_content.recommended_products.length > 0">
                                    <a class="nav-link" id="featured-tab" data-bs-toggle="tab" href="#featured" role="tab"
                                        aria-controls="featured" aria-selected="false" tabindex="-1">{{ lang == "en" ? "Recommended" : "المقترحة"}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="arrival" role="tabpanel"
                                aria-labelledby="arrival-tab"
                                v-if="home_content && home_content.new_products && home_content.new_products.length > 0">
                                <div class="row shop_container">
                                    <div class="col-lg-3 col-md-4 col-6" v-for="product in home_content.new_products"
                                        :key="product.id">
                                        <div class="product">
                                            <span class="pr_flash bg-success" v-if="product.on_sale">{{ lang == "en" ? "Sale" : "خصم"}}</span>
                                            <div class="product_img">
                                                <a :href="`/product/${product.id}`">
                                                    <img :src="product.first_image" alt="product_img6">
                                                </a>
                                                <div class="product_action_box">
                                                    <ul class="list_none pr_action_btn">
                                                        <li class="add-to-cart"
                                                            @click.prevent="addProductToCart(product.id, 1)"><a href="#"><i
                                                                    class="icon-basket-loaded"></i>{{ lang == "en" ? "Add To Cart" : "اضافة الي العربة"}}</a></li>
                                                        <li><a href="/" @click.prevent="showProdDetails = true;selectedProduct = product;" class="popup-ajax"><i
                                                                    class="icon-magnifier-add"></i></a></li>
                                                        <li><a href="" class="wish_btn"
                                                                :class="product.user_favourite ? 'active' : ''"
                                                                @click.prevent="likeProduct(product.id)"><i
                                                                    class="icon-heart"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="product_info">
                                                <h6 class="product_title"><a :href="`/product/${product.id}`">{{ product.name
                                                }}</a></h6>
                                                <div class="product_price">
                                                    <span class="price">{{ product.regular_price + " " +(lang == "en" ? "EGP" : "جنيه مصري ") }}</span>
                                                    <del v-if="product.on_sale">{{ product.sale_price + " " + (lang == "en" ? "EGP" : "جنيه مصري ") }}</del>
                                                </div>
                                                <!-- <div class="rating_wrap">
                                                        <div class="rating">
                                                            <div class="product_rate" style="width:68%"></div>
                                                        </div>
                                                        <span class="rating_num">(15)</span>
                                                    </div> -->
                                                <div class="pr_desc">
                                                    <p>{{ product.desc }}</p>
                                                </div>
                                                <!-- <div class="pr_switch_wrap">
                                                        <div class="product_color_switch">
                                                            <span class="active" data-color="#87554B" style="background-color: rgb(135, 85, 75);"></span>
                                                            <span data-color="#333333" style="background-color: rgb(51, 51, 51);"></span>
                                                        </div>
                                                    </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="sellers" role="tabpanel" aria-labelledby="sellers-tab"
                                v-if="home_content && home_content.best_selling_products && home_content.best_selling_products.length > 0">
                                <div class="row shop_container">
                                    <div class="col-lg-3 col-md-4 col-6"
                                        v-for="product in home_content.best_selling_products" :key="product.id">
                                        <div class="product">
                                            <span class="pr_flash bg-success" v-if="product.on_sale">{{ lang == "en" ? "Sale" : "خصم"}}</span>
                                            <div class="product_img">
                                                <a :href="`/product/${product.id}`">
                                                    <img :src="product.first_image" alt="product_img6">
                                                </a>
                                                <div class="product_action_box">
                                                    <ul class="list_none pr_action_btn">
                                                        <li class="add-to-cart"
                                                            @click.prevent="addProductToCart(product.id, 1)"><a href="#"><i
                                                                    class="icon-basket-loaded"></i> {{ lang == "en" ? "Add To Cart" : "اضافة الي العربة"}}</a></li>
                                                        <li><a href="/" @click.prevent="showProdDetails = true;selectedProduct = product;" class="popup-ajax"><i
                                                                    class="icon-magnifier-add"></i></a></li>
                                                        <li><a href="" class="wish_btn"
                                                                :class="product.user_favourite ? 'active' : ''"
                                                                @click.prevent="likeProduct(product.id)"><i
                                                                    class="icon-heart"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="product_info">
                                                <h6 class="product_title"><a :href="`/product/${product.id}`">{{ product.name
                                                }}</a></h6>
                                                <div class="product_price">
                                                    <span class="price">{{ product.regular_price + " " +(lang == "en" ? "EGP" : "جنيه مصري ") }}</span>
                                                    <del v-if="product.on_sale">{{ product.sale_price + " " + (lang == "en" ? "EGP" : "جنيه مصري ") }}</del>
                                                </div>
                                                <!-- <div class="rating_wrap">
                                                    <div class="rating">
                                                        <div class="product_rate" style="width:68%"></div>
                                                    </div>
                                                    <span class="rating_num">(15)</span>
                                                </div> -->
                                                <div class="pr_desc">
                                                    <p>{{ product.desc }}</p>
                                                </div>
                                                <!-- <div class="pr_switch_wrap">
                                                    <div class="product_color_switch">
                                                        <span class="active" data-color="#87554B" style="background-color: rgb(135, 85, 75);"></span>
                                                        <span data-color="#333333" style="background-color: rgb(51, 51, 51);"></span>
                                                    </div>
                                                </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="featured" role="tabpanel" aria-labelledby="featured-tab"
                                v-if="home_content && home_content.recommended_products && home_content.recommended_products.length > 0">
                                <div class="row shop_container">
                                    <div class="col-lg-3 col-md-4 col-6"
                                        v-for="product in home_content.recommended_products" :key="product.id">
                                        <div class="product">
                                            <span class="pr_flash bg-success" v-if="product.on_sale">{{ lang == "en" ? "Sale" : "خصم"}}</span>
                                            <div class="product_img">
                                                <a :href="`/product/${product.id}`">
                                                    <img :src="product.first_image" alt="product_img6">
                                                </a>
                                                <div class="product_action_box">
                                                    <ul class="list_none pr_action_btn">
                                                        <li class="add-to-cart"
                                                            @click.prevent="addProductToCart(product.id, 1)"><a href="#"><i
                                                                    class="icon-basket-loaded"></i> {{ lang == "en" ? "Add To Cart" : "اضافة الي العربة"}}</a></li>
                                                        <li><a href="/" @click.prevent="showProdDetails = true;selectedProduct = product;" class="popup-ajax"><i
                                                                    class="icon-magnifier-add"></i></a></li>
                                                        <li><a href="" class="wish_btn"
                                                                :class="product.user_favourite ? 'active' : ''"
                                                                @click.prevent="likeProduct(product.id)"><i
                                                                    class="icon-heart"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="product_info">
                                                <h6 class="product_title"><a :href="`/product/${product.id}`">{{ product.name
                                                }}</a></h6>
                                                <div class="product_price">
                                                    <span class="price">{{ product.regular_price + " " +(lang == "en" ? "EGP" : "جنيه مصري ") }}</span>
                                                    <del v-if="product.on_sale">{{ product.sale_price + " " + (lang == "en" ? "EGP" : "جنيه مصري ") }}</del>
                                                </div>
                                                <!-- <div class="rating_wrap">
                                                    <div class="rating">
                                                        <div class="product_rate" style="width:68%"></div>
                                                    </div>
                                                    <span class="rating_num">(15)</span>
                                                </div> -->
                                                <div class="pr_desc">
                                                    <p>{{ product.desc }}</p>
                                                </div>
                                                <!-- <div class="pr_switch_wrap">
                                                    <div class="product_color_switch">
                                                        <span class="active" data-color="#87554B" style="background-color: rgb(135, 85, 75);"></span>
                                                        <span data-color="#333333" style="background-color: rgb(51, 51, 51);"></span>
                                                    </div>
                                                </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="section"
            v-if="home_content && home_content.recommended_products && home_content.recommended_products.length > 0"
            style="padding-bottom: 2rem;">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="heading_s1 text-center">
                            <h2>{{ lang == "en" ? "Featured Products" : "منتجات مميزة"}}</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <swiper :spaceBetween="20" :slidesPerView="1" :slidesPerGroup="1" :pagination="{
                            clickable: true,
                        }" :breakpoints="{
    600: {
        slidesPerView: 2,
        slidesPerGroup: 2
    },
    850: {
        slidesPerView: 3,
        slidesPerGroup: 3
    },
    1190: {
        slidesPerView: 4,
        slidesPerGroup: 4,
    },
}" :modules="modules" class="deals-slider" dir="ltr">
                            <swiper-slide class="product" v-for="product in home_content.recommended_products"
                                :key="product.id" style="width: 264px; margin-right: 20px;">
                                <span class="pr_flash bg-success" v-if="product.on_sale">{{ lang == "en" ? "Sale" : "خصم"}}</span>
                                <div class="product_img">
                                    <a :href="`/product/${product.id}`">
                                        <img :src="product.first_image" alt="product_img6">
                                    </a>
                                    <div class="product_action_box">
                                        <ul class="list_none pr_action_btn">
                                            <li class="add-to-cart" @click.prevent="addProductToCart(product.id, 1)"><a
                                                    href="#"><i class="icon-basket-loaded"></i> {{ lang == "en" ? "Add To Cart" : "اضافة الي العربة"}}</a></li>
                                            <li><a href="/" @click.prevent="showProdDetails = true;selectedProduct = product;" class="popup-ajax"><i
                                                        class="icon-magnifier-add"></i></a></li>
                                            <li><a href="" class="wish_btn" :class="product.user_favourite ? 'active' : ''"
                                                    @click.prevent="likeProduct(product.id)"><i class="icon-heart"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="product_info" dir="rtl">
                                    <h6 class="product_title"><a :href="`/product/${product.id}`">{{ product.name }}</a></h6>
                                    <div class="product_price">
                                        <span class="price">{{ product.regular_price + " " +"EGP" }}</span>
                                        <del v-if="product.on_sale">{{ product.sale_price + " " + "EGP" }}</del>
                                    </div>
                                    <!-- <div class="rating_wrap">
                                <div class="rating">
                                    <div class="product_rate" style="width:68%"></div>
                                </div>
                                <span class="rating_num">(15)</span>
                            </div> -->
                                    <div class="pr_desc">
                                        <p>{{ product.desc }}</p>
                                    </div>
                                    <!-- <div class="pr_switch_wrap">
                                <div class="product_color_switch">
                                    <span class="active" data-color="#87554B" style="background-color: rgb(135, 85, 75);"></span>
                                    <span data-color="#333333" style="background-color: rgb(51, 51, 51);"></span>
                                </div>
                            </div> -->
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
        <div dir="ltr" class="mfp-bg mfp-ready" @click="showProdDetails = false" v-if="showProdDetails && selectedProduct"></div>
        <div  dir="ltr" class="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" tabindex="-1" style="overflow: hidden auto;"  v-if="showProdDetails && selectedProduct">
            <div class="mfp-container mfp-ajax-holder mfp-s-ready">
                <div class="mfp-content">
                    <div class="ajax_quick_view">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 mb-4 mb-md-0">
                                <div class="product-image">
                                    <div class="product_img_box">
                                        <img id="product_img" :src="selectedProduct.first_image"
                                            data-zoom-image="assets/images/product_zoom_img1.jpg" alt="product_img1">
                                    </div>
                                    <div id="pr_item_gallery"
                                        class="product_gallery_item slick_slider slick-initialized slick-slider"
                                        data-slides-to-show="4" data-slides-to-scroll="1" data-infinite="false">
                                        <div class="slick-list draggable" v-if="selectedProduct.images">
                                            <div class="slick-track"
                                                style="opacity: 1; width: 575px; transform: translate3d(0px, 0px, 0px);">
                                                <div class="item slick-slide slick-current slick-active" v-for="img in selectedProduct.images"
                                                    data-slick-index="0"  :key="img.id" aria-hidden="false" style="width: 105px;"
                                                    tabindex="0">
                                                    <a href="#" class="product_gallery_item active"
                                                        data-image="assets/images/product_img1.jpg"
                                                        data-zoom-image="assets/images/product_zoom_img1.jpg" tabindex="0">
                                                        <img :src="img.image"
                                                            alt="product_small_img1">
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="pr_detail">
                                    <div class="product_description">
                                        <h4 class="product_title"><a :href="`/product/${selectedProduct.id}`">{{selectedProduct.name}}</a></h4>
                                        <div class="product_price" style="float: none">
                                            <span class="price">{{selectedProduct.sale_price ? selectedProduct.sale_price : selectedProduct.regular_price}} EGP</span>
                                            <del v-if="selectedProduct.on_sale">{{selectedProduct.sale_price}} EGP</del>
                                        </div>
                                        <div class="pr_desc">
                                            <p>{{selectedProduct.desc}}</p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="cart_extra">
                                        <div class="cart-product-quantity">
                                            <div class="quantity">
                                                <input type="button" value="-" class="minus" @click="selectedProductQty >1 ? selectedProductQty -= 1 : ''">
                                                <input type="text" name="quantity" title="Qty" class="qty"
                                                    size="4" v-model="selectedProductQty">
                                                <input type="button" @click="selectedProductQty += 1" value="+" class="plus">
                                            </div>
                                        </div>
                                        <div class="cart_btn">
                                            <button class="btn btn-fill-out btn-addtocart" type="button" @click="addProductToCart(selectedProduct.id, selectedProductQty)"><i
                                                    class="icon-basket-loaded"></i> {{ lang == "en" ? "Add To Cart" : "اضافة الي العربة"}}</button>
                                            <a class="add_wishlist" href="#" @click.prevent="likeProduct(selectedProduct.id)"><i class="icon-heart"></i></a>
                                        </div>
                                    </div>
                                    <hr>
                                    <ul class="product-meta">
                                        <li>Category: <a href="#" v-if="selectedProduct.category">{{selectedProduct.category.name}}</a></li>
                                    </ul>

                                    <div class="product_share">
                                        <span>Share:</span>
                                        <ul class="social_icons">
                                            <li><a :href="`https://www.facebook.com/dialog/feed?app_id=1389892087910588%20&redirect_uri=http://becleopatra.com/product/${selectedProduct.id}%20&link=http://becleopatra.com/product/${selectedProduct.id}%20&picture=${selectedProduct.first_image}%20&caption=${selectedProduct.name}caption%20&description=${selectedProduct.name}`" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                                            <li><a :href="`https://twitter.com/intent/tweet?url=${this.url}/product/${selectedProduct.id}&text=${this.caption}`" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li>
                                            <li><a href="/" @click.prevent="shareOnInstagram()"><i class="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button title="Close (Esc)" @click="showProdDetails = false; selectedProductQty = 1" type="button" class="mfp-close">×</button>
                    </div>
                </div>
                <div class="mfp-preloader">Loading...</div>
            </div>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
import axios from 'axios';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

export default {
    name: 'HomeView',
    data() {
        return {
            home_content: null,
            showProdDetails: false,
            selectedProduct: {},
            selectedProductQty: 1,
            news: null,
            products: null,
            cards: null,
            lang: 'en',
            home_data: null,
            url: window.location.href,
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Autoplay, Pagination],
        };
    },
    methods: {
        shareOnInstagram() {
            var pageUrl = window.location.href + `/product/${this.selectedProduct.id}`;
            var instagramUrl = "https://www.instagram.com/share?url=" + encodeURIComponent(pageUrl);
            window.open(instagramUrl, "_blank");
        },
        addProductToCompare(product) {
            $('.loader').fadeIn()
            if (localStorage.getItem('compare_cart')) {
                if (JSON.parse(localStorage.getItem('compare_cart')).length < 3) {
                    let compare = JSON.parse(localStorage.getItem('compare_cart'));
                    let itemExists1 = compare[0] ? compare[0].id == product.id : false
                    let itemExists2 = compare[1] ? compare[1].id == product.id : false
                    let itemExists3 = compare[2] ? compare[2].id == product.id : false
                    if (!itemExists1 && !itemExists2 && !itemExists3) {
                        compare.push(product)
                        localStorage.setItem('compare_cart', JSON.stringify(compare))
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'success'
                        error.innerHTML = this.lang == 'ar' ? 'تمت إضافة المنتج للمقارنة بنجاح' : 'product added to compare successfully'
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        setTimeout(() => {
                            $('input').css('outline', 'none')
                            $('#errors').fadeOut('slow')
                            $('.loader').fadeOut()
                        }, 2000);
                    } else {
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = this.lang == 'ar' ? 'هذا المنتج موجود بالفعل في المقارنة' : 'This product is already in the compare'
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }
                } else {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = this.lang == 'ar' ? 'المقارنة لا يمكن أن تحتوي على أكثر من 3 عناصر' : 'Compare cannot have more than 3 items'
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }, 2000);
                }
            } else {
                let compare = []
                compare.push(product)
                localStorage.setItem('compare_cart', JSON.stringify(compare))
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'success'
                error.innerHTML = this.lang == 'ar' ? 'تمت إضافة المنتج للمقارنة بنجاح' : 'product added to compare successfully'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                    $('.loader').fadeOut()
                }, 2000);
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
        async getHomeContent() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://admin.becleopatra.com/api/home`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        }
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.home_content = response.data.data
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
        async likeProduct(product_id) {
            try {
                const response = await axios.post(`https://admin.becleopatra.com/api/users/favourites/addOrRemoveProduct`, {
                    product_id: product_id,
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
                    $('.loader').fadeOut()
                    this.getHomeContent()
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
                err.innerHTML = 'Please login first'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        async updateQty(product_id, qty,) {
            try {
                const response = await axios.put(`https://admin.becleopatra.com/api/users/carts/updateProductQty?product_id=${product_id}&qty=${qty}`, {
                    qty: qty,
                    product_id: product_id,
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        }
                    },
                );
                if (response.data.status === true) {
                    console.log('');
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

        },
        async addProductToCart(product_id, qty,) {
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
                    this.updateQty(product_id, qty)
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
                err.innerHTML = error.response.status == 401 ? 'Please login first' : 'server error try again later'
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
            let data = require('../assets/api/home.json');
            this.home_data = this.lang == 'ar' ? data.ar : data.en
            this.getHomeContent(this.lang)
        },

    },
    created() {
        this.getHomeData()
    },
    mounted() {
        $(`.home_link`).addClass('active')
        $(`.home_link`).siblings().removeClass('active')

        $(document).mousemove(function (e) {
            $('.hint-pop-up').css({
                top: e.clientY,
                left: e.pageX + 10 // Adjust the position to 10px to the right of the mouse
            });
        });

        $('.prod-name').hover(function () {
            $('.hint-pop-up').show();
        }, function () {
            $('.hint-pop-up').hide();
        });
    },
}
</script>

<style scoped>.swiper {
    padding: 0 0 2rem;
}

.hint-pop-up {
    position: fixed;
    display: none;
    padding: 10px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    z-index: 9999999999999;
    font-size: 12px;
    border-radius: 10px;
}

.prod-name:hover .hint-pop-up {
    display: block;
}

.prod-name,
.name {
    position: relative;
}

.name:hover .hint-pop-up-x {
    display: block
}

.hint-pop-up-x {
    position: absolute;
    display: none;
    padding: 10px;
    background-color: #f1f1f1f2;
    border: 1px solid #ccc;
    z-index: 99999;
    font-size: 12px;
    border-radius: 10px;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    backdrop-filter: blur(2px);
}</style>