<template>
  <td class="stats-url col-10">
    <span class="stats-short">
      <a :href="'https://crlnm.com/l/' + stat.short">{{ `crlnm.com/l/${stat.short}` }}</a>
    </span>
    <span class="stats-full">{{ stat.full }}</span>
  </td>
  <td class="stats-shortened col-1">
    {{ stat.shortened }}
  </td>
  <td class="stats-hits col-1">
    {{ stat.hits }}
  </td>
</template>

<script>
export default {
  name: "Stat",
  props: {
    stat: Object,
  },
};
</script>

<style scoped>
td {
  text-align: left;
  padding: 8px;
}

span {
  position: relative;
  display: block;
  text-align: left;
}

.stats-full {
  font-size: 15px;
  color: rgb(148, 148, 148);
}

a {
  text-decoration: none;
  color: rgb(0, 68, 196);
  cursor: pointer;
}
</style>