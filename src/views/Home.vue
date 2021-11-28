<template>
  <div class="home">
    <h1>Shortit</h1>
    <Shortener @shorten="shorten" :showShorted="showShorted" :shortedUrl="shortedUrl" :fullUrl="fullUrl" />
    <Stats :stats="stats" />
  </div>
</template>

<script>
import Shortener from "@/components/Shortener.vue";
import Stats from "@/components/Stats.vue";

export default {
  name: "Home",
  components: {
    Shortener,
    Stats,
  },
  data() {
    return {
      stats: [],
      showShorted: false,
      shortedUrl: "",
      fullUrl: ""
    };
  },
  methods: {
    async shorten(url) {
      const res = await fetch("/api/url", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(url),
      });
      if (!res.ok) {
        console.error("short url post error");
        return;
      }
      const data = await res.json();
      this.fullUrl = data.data.full;
      this.shortedUrl = "https://crlnm.com/l/" + data.data.short;
      this.showShorted = true;
      return data;
    },
    async fetchStats() {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: "",
      });
      if (!res.ok) {
        console.error("stats fetch error");
        return;
      }
      const data = await res.json();
      return data.data.stats;
    },
  },
  async created() {
    this.stats = await this.fetchStats();
  },
};
</script>

<style scoped>
h1 {
  font-size: 100px;
}

@media screen and (max-width: 720px) {
  h1 {
    font-size: 80px;
  }
}
</style>