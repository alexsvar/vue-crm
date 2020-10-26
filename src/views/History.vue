<template>
  <div>
    <div class="page-title">
      <h3>History Of Notes</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!notes.length">No notes yet.&nbsp;
      <router-link to="/note">Create new note</router-link>
    </p>

    <section v-else>
      <HistoryTable :notes="items"/>

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin'
import {Pie} from 'vue-chartjs'

export default {
  name: 'History',
  extends: Pie,
  data: () => ({
    loading: true,
    notes: []
  }),
  mixins: [paginationMixin],
  async mounted() {
    this.notes = await this.$store.dispatch('fetchNotes')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.notes.map(note => {
        return {
          ...note,
          categoryName: categories.find(category => category.id === note.categoryId).title,
          typeClass: note.type === 'income' ? 'green' : 'red',
          typeText: note.type === 'income' ? 'Income' : 'Outcome'
        }
      }))
      this.renderChart({
        labels: categories.map(category => category.title),
        datasets: [{
          label: 'Expenses by categories',
          data: categories.map(category => {
            return this.notes.reduce((total, note) => {
              if (note.categoryId === category.id && note.type === 'outcome') {
                total += note.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  },
  components: {
    HistoryTable
  }
}
</script>

