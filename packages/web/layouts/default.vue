<template>
  <el-container class="page">
    <main-header />

    <el-main class="page__main">
      <Nuxt />
    </el-main>

    <el-footer class="page__footer">
      <a href="http://github.com/andre000">@andre000</a>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>

<style lang="scss">
  @import '@/assets/scss/main.scss';

  .page {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    justify-content: center;

    @media screen and (max-width: 990px) {
      .header {
        min-height: 200px !important;
      }
      align-items: flex-end;
    }

    background: linear-gradient(48deg, #15a1d4, #4db8e2);
    background-size: 400% 400%;

    -webkit-animation: animated-background 20s ease infinite;
    -moz-animation: animated-background 20s ease infinite;
    animation: animated-background 20s ease infinite;

    &__main {
      // padding: 5vh 10vw 10vh 10vw;
      width: 70vw;
    }

    &__footer {
      text-align: center;
      a {
        text-decoration: none;
        color: #fff9;
        transition: .25s all ease-in-out;
        &:hover {
          color: #fff;
        }
      }
    }
  }

  @keyframes animated-background {
    0% { background-position:97% 0% }
    50% { background-position:4% 100% }
    100% { background-position:97% 0% }
  }
</style>
