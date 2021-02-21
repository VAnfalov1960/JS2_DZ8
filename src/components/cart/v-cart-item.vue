<template>
  <div class='v-cart-item'>
    <img class="v-cart-item__image" :src=" require('../../assets/images/' + cart_item_data.image) " alt="">
    <div class="v-cart-item__info">
      <p>{{cart_item_data.name}}</p>
      <p>{{cart_item_data.price | toFix | formattedPrice}}</p>
      <p>{{cart_item_data.article}}</p>
    </div>
    <div class="v-cart-item__quantity">
      <p>Добавить/убавить:</p>
      <span class="quantity__tools">
        <span class="quantity__btn" @click="decrementItem">-</span>
        {{cart_item_data.quantity}}
        <span class="quantity__btn" @click="incrementItem">+</span>
      </span>
    </div>
    <button class="btn_del" @click="deleteFromCart">Удалить товар полностью</button>
  </div>
</template>

<script>
import toFix from '../../filters/toFix'
import formattedPrice from "../../filters/price-format";


  export default {
    name: "v-cart-item",
    props: {
      cart_item_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    filters: {
      toFix,
      formattedPrice
    },
    computed: {},
    methods: {
      decrementItem() {
        this.$emit('decrement')
      },
      incrementItem() {
        this.$emit('increment')
      },
      deleteFromCart() {
        this.$emit('deleteFromCart')
      }
    }
  }
</script>

<style lang="scss">

/* Корзина блок карточка с выбранным товаром */
  .v-cart-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;

    /* Корзина картинка */
    &__image {
      max-width: 250px;
      border-radius: $radius;
    }

/* + и - добавить и убавить товар */
    .quantity__btn {
      cursor: pointer;
    }

/* +, количество и - добавить и убавить товар */
    .quantity__tools {
      user-select: none;
    }
    .btn_del {
      padding: $padding $padding*2;
      background: $red-bg;
      color: $white-color;
      margin-top: 30px;
      border: 0;
      border-radius: $radius;
      outline: none;
      cursor: pointer;
      &:hover {
        background: $red-bg-hover;
      }
    }
  }
</style>
