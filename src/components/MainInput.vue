<template>
  <form @submit="onSubmit" class="row">
    <input
      class="full-url-input"
      type="text"
      v-model="fullUrl"
      name="fullUrl"
      placeholder="Link to shorten"
    />
    <input type="submit" value="Shorten" class="btn" />
  </form>
</template>

<script>
export default {
  name: "MainInput",
  data() {
    return {
      fullUrl: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const urlToShorten = {
        fullUrl: this.fullUrl,
      };
      this.$emit("shorten", urlToShorten);
      this.fullUrl = "";
    },
  },
};
</script>

<style scoped>
.full-url-input {
  padding: 15px 15px 15px 20px;
  border-radius: 10px;
  font-size: 20px;
  text-align: left;
  border: solid 1px lightgray;
  outline: none;
  box-sizing: border-box;
  width: 70%;
}

.full-url-input:focus {
  border: solid 1px rgb(148, 148, 148);
}

@media screen and (max-width: 720px) {
  .btn {
    width: 96%;
    margin-left: 0;
  }
  .full-url-input {
    width: 96%;
    margin-bottom: 1rem;
  }
}
</style>