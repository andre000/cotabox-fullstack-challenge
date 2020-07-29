<script lang="ts">
import Vue from 'vue'
import { Pie, mixins } from 'vue-chartjs'

export default Vue.extend({
  extends: Pie,
  mixins: [mixins.reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },

  mounted () {
    (this as any).renderChart((this as any).chartData, this.options)
  }
})
</script>
