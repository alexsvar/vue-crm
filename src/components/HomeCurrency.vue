<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Course of currencies</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Course</th>
            <th>Date</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur of currencies" :key="cur">
            <td>{{cur}}</td>
            <td>{{rates[cur].toFixed(5)}}</td>
            <td>{{date | date(date)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  name: 'HomeCurrency',
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  })
}
</script>

