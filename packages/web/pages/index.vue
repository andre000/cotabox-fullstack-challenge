<template>
  <div class="container">
    <h1>DATA</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

    <div>
      <el-row>
        <el-col :lg="12" :md="24">
          <main-table :list-users="users" />
        </el-col>
        <el-col :lg="12" :md="24">
          <main-chart :list-users="users" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['users'])
  },

  created () {
    this.fetchUsers()
  },

  methods: {
    ...mapActions(['fetchUsers'])
  }
})
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
