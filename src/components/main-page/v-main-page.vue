<template>
  <div class='v-main-page'>
    <h1>Интернет-магазин JS2</h1>
    <p>
      <router-link :to="{name: 'catalog'}">
        Перейти в каталог
      </router-link>

    </p>
  </div>
</template>

<script>
  export default {
    name: "v-main-page",
    props: {},
    data() {
      return {}
    },
    computed: {}
  }
</script>

<style scoped>

</style>
