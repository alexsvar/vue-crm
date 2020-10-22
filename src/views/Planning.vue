<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">No categories yet.&nbsp;
      <router-link to="/categories">Create new category</router-link>
    </p>

    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency}} / {{category.limit | currency}}
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const notes = await this.$store.dispatch('fetchNotes')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(category => {
      const spend = notes
        .filter(note => note.categoryId === category.id)
        .filter(note => note.type === 'outcome')
        .reduce((total, note) => {
          return total += note.amount
        }, 0)
      const percent = 100 * spend / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'
      return {
        ...category,
        progressPercent,
        progressColor,
        spend
      }
    })
    this.loading = false
  }
}
</script>

<style scoped>

</style>
