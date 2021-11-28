<template>
  <div class="row">
    <div class="col-12">
      <span class="full-url">{{ full }}</span>
      <span>
        <span class="short-url">
          <a :href="short">{{ short }}</a>
        </span>
        <span><Button @btn-click="copy" text="Copy" /></span>
      </span>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button";

export default {
  name: "ShortedUrl",
  components: {
    Button,
  },
  props: {
    full: String,
    short: String,
  },
  methods: {
    copy() {
      var shortUrl = document.getElementsByClassName("short-url")[0];
      navigator.clipboard.writeText(shortUrl.innerText);
    },
  },
};
</script>

<style scoped>
div.col-12 {
  display: flex;
  height: auto;
  border-radius: 10px;
  border: 1px solid rgb(0, 68, 196);
  padding: 16px 20px;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

Button {
  padding: 8px 20px;
  font-size: 1rem;
  background-color: rgb(221, 233, 255);
  color: rgb(0, 68, 196);
  font-weight: 300;
}

Button:active {
  background-color: rgb(201, 212, 233);
}

span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 300;
}

a {
  text-decoration: none;
  color: rgb(0, 68, 196);
  cursor: pointer;
}

.full-url {
  display: inline-block;
  vertical-align: middle;
}

.short-url {
  padding-right: 25px;
}

@media screen and (max-width: 720px) {
  div.col-12 {
    display: block;
    padding: 15px 20px;
    text-align: left;
  }

  span {
    display: block;
    padding: 6px 0;
    max-width: none;
    text-align: left;
  }

  .btn {
    width: 100%;
  }

  .short-url {
    padding: 0 0 6px 0;
  }
}
</style>