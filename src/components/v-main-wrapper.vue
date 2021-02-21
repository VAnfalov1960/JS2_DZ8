<template>
  <div class="v-main-wrapper">
    <v-header />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vHeader from './layouts/v-header'

  export default {
    name: 'v-main-wrapper',
    components: {
      vHeader
    },
    props: {},
    data() {
      return {
        title: 'Main wrapper'
      }
    },
    computed: {},
    methods: {},
    watch: {}
  }
</script>

<style>
/* Каталог wrapper */
  .v-main-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }
</style>
