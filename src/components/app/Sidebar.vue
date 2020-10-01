<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link of links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-purple pointer">{{ link.title }}</a>
    </router-link>

  </ul>
</template>

<script>
export default {
  props: ['value'],
  name: "Sidebar",
  data: () => ({
    links: [
      {title: 'Account', url: '/', exact: true},
      {title: 'History', url: '/history'},
      {title: 'Planning', url: '/planning'},
      {title: 'New Note', url: '/note'},
      {title: 'Categories', url: '/categories'},
    ]
  })
}
</script>

<style scoped>

</style>
