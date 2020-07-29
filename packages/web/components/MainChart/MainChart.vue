<template>
  <pie-chart class="chart" :chart-data="chartData" :options="options" />
</template>

<script lang="ts">
import Vue from 'vue'

const colors = ['#2f96de', '#5cba99', '#e94b35', '#9b56b8', '#bdc3c7']

export default Vue.extend({
  props: {
    listUsers: {
      type: Array,
      default: null
    }
  },

  data: () => ({
    options: {
      maintainAspectRatio: false,
      legend: {
        position: 'right'
      }
    }
  }),

  computed: {
    chartData () {
      const remaining = 100 - this.listUsers.reduce((total: number, user: any) => (user.participation + total), 0)

      return {
        labels: [...this.listUsers.map((user: any) => `${user.firstName} ${user.lastName}`), 'Remaining'],
        datasets: [
          {
            label: 'Participation',
            backgroundColor: this.listUsers.map((_, i) => colors[i % colors.length]),
            data: [...this.listUsers.map((user: any) => user.participation), remaining]
          }
        ]
      }
    }
  }

})
</script>

<style lang="scss" scoped>
  .chart {
    height: 33vh1;
    padding: 20px;
  }
</style>
