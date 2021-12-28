<template>
  <table>
    <tr>
      <th>URL</th>
      <th>Shortened</th>
      <th>Hits</th>
    </tr>
    <tr :key="stat._id" v-for="stat in stats">
      <Stat :stat="stat" />
    </tr>
  </table>
</template>

<script>
import Stat from "./Stat";

export default {
  name: "Stats",
  props: {
    stats: Array,
  },
  components: {
    Stat,
  },
};
</script>

<style scoped>
table {
  width: 95%;
  margin: auto;
  margin-top: 1rem;
  border-collapse: collapse;
}

tr,
th {
  text-align: left;
}

th {
  padding: 8px;
}

tr {
  border-bottom: 1px solid rgb(180, 180, 180);
}
</style>