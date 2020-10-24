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
      <HistoryTable :notes="notes" />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'History',
  data: () => ({
    loading: true,
    notes: [],
    categories: []
  }),
  async mounted() {
    // this.notes = await this.$store.dispatch('fetchNotes')
    const notes = await this.$store.dispatch('fetchNotes')
    this.categories = await this.$store.dispatch('fetchCategories')

    this.notes = notes.map(note => {
      return {
        ...note,
        categoryName: this.categories.find(category => category.id === note.categoryId).title,
        typeClass: note.type === 'income' ? 'green' : 'red',
        typeText :note.type === 'income' ? 'Income' : 'Outcome'
      }
    })

    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>

