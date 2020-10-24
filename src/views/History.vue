<template>
  <div>
    <div class="page-title">
      <h3>History Of Notes</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!notes.length">No notes yet.&nbsp;
      <router-link to="/note">Create new note</router-link>
    </p>

    <section v-else>
      <HistoryTable :notes="items" />

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

export default {
  name: 'History',
  data: () => ({
    loading: true,
    notes: []
  }),
  mixins: [paginationMixin],
  async mounted() {
    this.notes = await this.$store.dispatch('fetchNotes')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setupPagination(this.notes.map(note => {
      return {
        ...note,
        categoryName: categories.find(category => category.id === note.categoryId).title,
        typeClass: note.type === 'income' ? 'green' : 'red',
        typeText :note.type === 'income' ? 'Income' : 'Outcome'
      }
    }))
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>

