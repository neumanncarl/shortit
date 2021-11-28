<template>
  <MainInput class="row" @shorten="shorten" />
  <ShortedUrl v-show="showShorted" :short="shortedUrl" :full="fullUrl" />
</template>

<script>
import MainInput from "../components/MainInput";
import ShortedUrl from "../components/ShortedUrl";

export default {
  name: "Shortener",
  props: {
    showShorted: Boolean,
    fullUrl: String,
    shortedUrl: String,
  },
  data() {
    return {
      short: this.shortedUrl,
      full: this.fullUrl,
    };
  },
  components: {
    MainInput,
    ShortedUrl,
  },
  methods: {
    shorten(url) {
      this.$emit('shorten', url);
    }
  },
  emits: ['shorten'],
};
</script>