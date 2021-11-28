<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;700;900&family=Quicksand:wght@300;400;700&display=swap");
@import "assets/simple-grid.min.css";

* {
  font-family: Outfit, Quicksand, Helvetica, Arial, sans-serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

.container {
  max-width: 1000px;
  overflow: auto;
  border-radius: 5px;
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
}

.btn:focus {
  outline: none;
}

.btn:active {
  background: rgb(0, 55, 158);
}
</style>
