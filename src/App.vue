<template>
  <div class="container">
    <h1>Shortit</h1>
    <Shortener
      @shorten="shorten"
      :showShorted="showShorted"
      :shortedUrl="shortedUrl"
      :fullUrl="fullUrl"
    />
    <Stats :stats="stats" />
  </div>
</template>

<script>
import Shortener from "@/components/Shortener.vue";
import Stats from "@/components/Stats.vue";

export default {
  name: "App",
  components: {
    Shortener,
    Stats,
  },
  data() {
    return {
      stats: [],
      showShorted: false,
      shortedUrl: "",
      fullUrl: "",
    };
  },
  methods: {
    async shorten(url) {
      const res = await fetch("/", {
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
      const res = await fetch("/stats");
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
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;700;900&family=Quicksand:wght@300;400;700&display=swap");

* {
  font-family: Outfit, Quicksand, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

.container {
  max-width: 1000px;
  overflow: auto;
  margin: auto;
}

h1 {
  font-size: 100px;
}

.btn {
  display: inline-block;
  background: rgb(0, 68, 196);
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  font-family: inherit;
  width: 23%;
  margin-left: 2%;
}

.btn:focus {
  outline: none;
}

.btn:active {
  background: rgb(0, 55, 158);
}

@media screen and (max-width: 720px) {
  h1 {
    font-size: 80px;
  }
}
</style>