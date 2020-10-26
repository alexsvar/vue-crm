<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">{{'Name' | localize}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          {{'Message_EnterName' | localize}}
        </span>
      </div>

      <div class="switch">
        <label>
          Русский
          <input type="checkbox" v-model="isEnLocale">
          <span class="lever"></span>
          English
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'Profile',
  data: () => ({
    name: '',
    isEnLocale: true
  }),
  validations: {
    name: {required}
  },
  mounted() {
    this.name = this.info.name
    this.isEnLocale = this.info.locale === 'en-US'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isEnLocale ? 'en-US' : 'ru-RU'
        })
      } catch(e) {}
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
