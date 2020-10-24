<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="note">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a class="breadcrumb" @click.prevent>
          {{note.type === 'income' ? 'Income' : 'Outcome'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="note.type === 'income' ? 'green' : 'red'">
            <div class="card-content white-text">
              <p>Description: {{note.description}}</p>
              <p>Amount: {{note.amount | currency}}</p>
              <p>Category: {{note.categoryName}}</p>

              <small>{{note.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>This note is not found</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data: () => ({
    note: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const note = await this.$store.dispatch('fetchNoteById', id)
    const category = await this.$store.dispatch('fetchCategoryById', note.categoryId)

    this.note = {
      ...note,
      categoryName: category.title
    }

    this.loading = false
  }
}
</script>

<style scoped>

</style>
