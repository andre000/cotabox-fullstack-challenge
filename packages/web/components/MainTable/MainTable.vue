<template>
  <el-table :data="listUsers">
    <el-table-column
      prop="firstName"
      label="First Name"
    />
    <el-table-column
      prop="lastName"
      label="Last Name"
    />
    <el-table-column
      prop="participation"
      label="Participation"
    />
  </el-table>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    listUsers: {
      type: Array,
      default: null
    }
  }
})
</script>
