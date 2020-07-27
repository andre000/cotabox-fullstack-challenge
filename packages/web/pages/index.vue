<template>
  <div class="container">
    <h1>DATA</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .container {
    background: #fff;
    padding: 20px;
    border-radius: $--border-radius-base;
    min-height: calc(100% - 7.5vh);
  }
</style>
