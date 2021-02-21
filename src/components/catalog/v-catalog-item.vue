<template>
  <div class='v-catalog-item'>

    <v-popup
        v-if="isInfoPopupVisible"
        rightBtnTitle="Добавить в корзину"
        :popupTitle="product_data.name"
        @closePopup="closeInfoPopup"
        @rightBtnAction="addToCart"
    >
      <img class="v-catalog-item__image" :src=" require('../../assets/images/' + product_data.image) " alt="img">
      <div>
        <p class="v-catalog-item__name">{{product_data.name}}</p>
        <p class="v-catalog-item__price"> Цена: {{product_data.price | toFix | formattedPrice}}</p>
        <p class="v-catalog-item__price">{{product_data.category}}</p>
      </div>
    </v-popup>

<!-- require - изучить подробнее  урок 3-->
    <img class="v-catalog-item__image" :src=" require('../../assets/images/' + product_data.image) " alt="img" @click="productClick">
    <p class="v-catalog-item__name">{{product_data.name}}</p>
    <p class="v-catalog-item__price">Цена: {{product_data.price | toFix | formattedPrice}}</p>
    <button
        class="v-catalog-item__show-info"
        @click="showPopupInfo"
    >
      Подробная информация
    </button>
    <br>
    <button
        class="v-catalog-item__add_to_cart_btn btn"
        @click="addToCart"
    >Добавить в корзину
    </button>
  </div>
</template>

<script>
  import vPopup from '../popup/v-popup'
  import toFix from '../../filters/toFix'
  import formattedPrice from "../../filters/price-format";

  export default {
    name: "v-catalog-item",
    components: {
      vPopup
    },
    props: {
      product_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isInfoPopupVisible: false
      }
    },
    filters: {
      toFix,
      formattedPrice
    },
    computed: {},
    methods: {
      productClick() {
        /* вызывем $emit в котором указываем
        product_data.article что хотим передать
        productClick - как будет называться в родителе */
        this.$emit('productClick', this.product_data.article)
      },
      showPopupInfo() {
        this.isInfoPopupVisible = true;
      },
      closeInfoPopup() {
        this.isInfoPopupVisible = false;
      },
      addToCart() {
        this.$emit('addToCart', this.product_data);
      }
    },
    mounted() {
      this.$set(this.product_data, 'quantity', 1)
    }
  }
</script>

<style lang="scss">
/* Каталог - блок карточка товара */
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    border-radius: $radius;

    /* картинка */
    &__image {
      width: 250px;
      border-radius: $radius;
    }
  }
/* Каталог - Кнопка "Подробная информация" */
  .v-catalog-item__show-info {
    margin-bottom: 30px;
    min-width: 250px;
    padding: 8px;
    color: $white-color;
    border-radius: $radius;
    background: $blue-bg;
    margin-top: 30px;
    cursor: pointer;
    outline: none;
    &:hover {
      background: $blue-bg-hover;
    }
  }
</style>
