<template>
  <div class='v-catalog'>

    <v-notification
        :messages="messages"
    />


    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
      <div class="v-catalog__link_to_cart">Корзина: {{CART.length}}</div>
    </router-link>
    <h1>Каталог</h1>
    <div class="filters">
      <v-select
          :selected="selected"
          :options="categories"
          @select="sortByCategories"
      />
      <div class="range-slider">
        <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value="50"
            v-model.number="minPrice"
            @change="setRangeSlider"
        >
        <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value="50"
            v-model.number="maxPrice"
            @change="setRangeSlider"
        >
      </div>
      <div class="range-values">
        <p>Минимальная: {{minPrice}}</p>
        <p>Максимальная: {{maxPrice}}</p>
      </div>
    </div>
    <!-- Циклом бежим по массиву filteredProducts
    под каждый объект массива создаём отдельный элемент - карточку товара-->
    <div class="v-catalog__list">
      <v-catalog-item
          v-for="product in filteredProducts"
          :key="product.article"
          :product_data="product"
          @addToCart="addToCart"
          @productClick="productClick"
      />
    </div>
  </div>
</template>

<script>
  import vCatalogItem from './v-catalog-item'
  import {mapActions, mapGetters} from 'vuex'
  import vSelect from '../v-select'
  import vNotification from '../notifications/v-notification'

  export default {
    name: "v-catalog",
    components: {
      vCatalogItem,
      vSelect,
      vNotification
    },
    props: {},
    data() {
      return {
        categories: [
          {name: 'Все', value: 'ALL'},
          {name: 'Детские', value: 'м'},
          {name: 'Взрослые', value: 'ж'},
        ],
        selected: 'Все',
        sortedProducts: [],
        minPrice: 0,
        maxPrice: 1000,
        messages: []
      }
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'CART',
        'IS_MOBILE',
        'IS_DESKTOP',
        'SEARCH_VALUE'
      ]),
      filteredProducts() {
        if (this.sortedProducts.length) {
          return this.sortedProducts
        } else {
          return this.PRODUCTS
        }
      },
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      productClick(article) {
        this.$router.push( {name: 'product', query: { 'product': article }})
      },
      /* При работе с ползунком фильтрации min и max меняются при необходимостии местами */
      setRangeSlider() {
        if (this.minPrice > this.maxPrice) {
          let tmp = this.maxPrice;
          this.maxPrice = this.minPrice;
          this.minPrice = tmp;
        }
        this.sortByCategories()
      },
      /*  */
      sortByCategories(category) {
        let vm = this;
        this.sortedProducts = [...this.PRODUCTS]
        this.sortedProducts = this.sortedProducts.filter(function (item) {
          return item.price >= vm.minPrice && item.price <= vm.maxPrice
        })
        if (category) {
          this.sortedProducts = this.sortedProducts.filter(function (e) {
            vm.selected === category.name;
            return e.category === category.name
          })
        }
      },
      addToCart(data) {
        this.ADD_TO_CART(data)
          .then(() => {
            let timeStamp = Date.now().toLocaleString();
            this.messages.unshift(
              {name: 'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp}
            )
          })
      },
      sortProductsBySearchValue(value) {
        this.sortedProducts = [...this.PRODUCTS]
        if (value) {
          this.sortedProducts = this.sortedProducts.filter(function (item) {
            return item.name.toLowerCase().includes(value.toLowerCase())
          })
        } else {
          this.sortedProducts = this.PRODUCTS;
        }
      }
    },
    watch: {
      SEARCH_VALUE() {
        this.sortProductsBySearchValue(this.SEARCH_VALUE);
      }
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            this.sortByCategories()
            this.sortProductsBySearchValue(this.SEARCH_VALUE)
          }
        })
    }
  }
</script>

<style lang="scss">
/* Каталог - Блок для карточек товаров */
  .v-catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
    /* Кнопка перехода в корзину справа вверху экрана */
    &__link_to_cart {
      position: fixed;
      top: 80px;
      right: 10px;
      padding: $padding*2;
      border: solid 2px $green-color;
      border-radius: $radius;
      background: $white-color;
      &:hover {
        background: $green-bg-hover;
        color: $white-color;
      }
    }
  }
/* Блок для фильтров */
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: green;
  }

  .range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .range-slider svg,
  .range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  input[type=range]::-webkit-slider-thumb {
    z-index: 1;
    position: relative;
    top: 2px;
    margin-top: -7px;
    color: green;
  }
</style>
