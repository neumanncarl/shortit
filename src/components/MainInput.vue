<template>
  <form @submit="onSubmit" class="row">
    <input
      class="full-url-input col-9"
      type="text"
      v-model="fullUrl"
      name="fullUrl"
      placeholder="Link to shorten"
    />
    <input type="submit" value="Shorten" class="btn col-3" />
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
}

.full-url-input:focus {
  border: solid 1px rgb(148, 148, 148);
}

.btn {
  margin: 1rem 0 0 1rem;
}

@media screen and (max-width: 720px) {
  .btn {
    margin-left: 0;
  }
}

@media screen and (min-width: 720px) {
  .btn {
    width: 23%;
  }
}
</style>