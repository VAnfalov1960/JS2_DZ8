<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class='v-popup'>
      <div class="v-popup__header">
        <span>{{popupTitle}}</span>
        <span>
        <i
            class="material-icons"
            @click="closePopup"
        >
          close
        </i>
      </span>
      </div>
      <div class="v-popup__content">
        <slot></slot>
      </div>
      <div class="v-popup__footer">
        <button class="close_modal" @click="closePopup">Закрыть</button>
        <button
            class="submit_btn"
            @click="rightBtnAction"
        >
          {{rightBtnTitle}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-popup",
    props: {
      popupTitle: {
        type: String,
        default: 'Popup name'
      },
      rightBtnTitle: {
        type: String,
        default: 'Ok'
      }
    },
    data() {
      return {}
    },
    methods: {
      rightBtnAction() {
        this.$emit('rightBtnAction')
      },
      closePopup() {
        this.$emit('closePopup')
      }
    },
    mounted() {
      let vm = this;
      document.addEventListener('click', function (item) {
        if (item.target === vm.$refs['popup_wrapper']) {
          vm.closePopup()
        }
      })
    },
  }
</script>

<style lang="scss">
/* Блок Подробная информация */
  .popup_wrapper {
  //background: rgba(64,64,64, .4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }

/* Блок для карточки самого товара с подробной информацией */
  .v-popup {
    padding: 16px;
    position: fixed;
    top: 50px;
    width: 400px;
    background: #ffffff;
    border-radius: $radius;
    box-shadow: 0 0 17px 0 #e7e7e7;
    z-index: 10;

    /* Блок для шапки и футера */
    &__header, &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    /* Блок для контента */
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 10px;
    }

    /* Кнопка Добавить в корзину */
    .submit_btn {
      padding: $padding $padding*2;
      background: $green-bg;
      color: $white-color;
      margin-top: 30px;
      border: 0;
      border-radius: $radius;
      outline: none;
      cursor: pointer;
      &:hover {
        background: $green-bg-hover;
      }
    }
    /* Кнопка Закрыть */
    .close_modal {
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
