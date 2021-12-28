<template>
  <div class="link">
    <span class="full-url">{{ full }}</span>
    <span>
      <span class="short-url">
        <a :href="short">{{ short }}</a>
      </span>
      <span class="copy"
        ><Button class="btn" @btn-click="copy" :text="text"
      /></span>
    </span>
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
  data() {
    return {
      text: "Copy"
    };
  },
  methods: {
    copy() {
      var shortUrl = document.getElementsByClassName("short-url")[0];
      navigator.clipboard.writeText(shortUrl.innerText);
      this.text = "Copied!";
      setTimeout(() => this.text = "Copy", 1000);
    },
  },
};
</script>

<style scoped>
.link {
  display: flex;
  padding: 16px 20px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 18px;
  list-style: none;
  height: auto;
  border-radius: 10px;
  border: 1px solid rgb(0, 68, 196);
  padding: 16px 20px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 95%;
  margin: 1rem auto;
}

span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 300;
}

.full-url {
  display: inline-block;
  vertical-align: middle;
}

.short-url {
  padding-right: 25px;
  vertical-align: middle;
}

a {
  text-decoration: none;
  color: rgb(0, 68, 196);
  cursor: pointer;
}

.copy {
  overflow: unset;
  padding: 2px;
  display: inline-block;
  vertical-align: middle;
}

Button {
  padding: 8px 20px;
  font-size: 1rem;
  position: relative;
  background-color: rgb(221, 233, 255);
  color: rgb(0, 68, 196);
  font-weight: 300;
  width: 100%;
}

Button:active {
  background-color: rgb(201, 212, 233);
}

@media screen and (max-width: 720px) {
  span {
    display: block;
    padding: 6px 0;
    max-width: none;
    text-align: left;
  }

  .link,
  .full-url {
    display: block;
  }

  .short-url {
    margin-bottom: 1rem;
  }

  .copy {
    width: 100%;
  }

  Button {
    margin: 0;
  }
}
</style>