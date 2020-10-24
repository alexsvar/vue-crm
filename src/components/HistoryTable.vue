<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Amount</th>
      <th>Date</th>
      <th>Category</th>
      <th>Type</th>
      <th>Open</th>
    </tr>
    </thead>

    <tbody v-for="(note, idx) of notes" :key="note.id">
    <tr>
      <td>{{idx + 1}}</td>
      <td>{{note.amount | currency('RUB')}}</td>
      <td>{{note.date | date('datetime')}}</td>
      <td>{{note.categoryName}}</td>
      <td>
        <span
          :class="[note.typeClass]"
          class="white-text badge"
        >
          {{note.typeText}}
        </span>
      </td>
      <td>
        <button
          class="btn-small btn"
          @click="$router.push(`/detail/${note.id}`)"
          v-tooltip="'Open note'"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    notes: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
