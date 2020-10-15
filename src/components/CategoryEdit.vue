<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category of categories"
              :key="category.id"
              :value="category.id"
            >
              {{category.title}}
            </option>
          </select>
          <label>Select category</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="editName"
            v-model="title"
            :class="{invalid: $v.title.$dirty && $v.title.required}"
          >
          <label for="editName">Title</label>
          <span
            v-if="$v.title.$dirty && $v.title.required"
            class="helper-text invalid"
          >
            Enter the name of category
          </span>
        </div>

        <div class="input-field">
          <input
            id="editLimit"
            type="number"
            v-model="limit"
            :class="{invalid: $v.limit.$dirty && $v.limit.minValue}"
          >
          <label for="editLimit">Limit</label>
          <span
            v-if="$v.limit.$dirty && $v.limit.minValue"
            class="helper-text invalid"
          >
            Minimal value is {{limit}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  name: 'CategoryEdit',
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(10)}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('The category updated successfully')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>
