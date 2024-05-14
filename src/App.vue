<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <nav>
    <RouterLink class="link" to="/">Home</RouterLink>
    <RouterLink class="link" to="/cart">Panier</RouterLink>
  </nav>
  <div class="space"></div>
  <RouterView />
</template>

<!-- style scss -->
<style lang="scss">
  nav{
    display: flex;
    justify-content: center;
    margin: 20px 0;
    background-color: rgb(19, 19, 19);
    padding: 20px;
    margin-top: 0;
    width: 100%;
    position: fixed;
    z-index: 100;
    a {
      margin: 0 10px;
    }    
  }
  .space{
    height: 100px;
  }

  .link {
  position: relative;
  padding: 5px 35px 5px 35px;
  border: 3px ridge #149CEA;
  outline: none;
  background-color: transparent;
  color: white;
  transition: 1s;
  border-radius: 0.3em;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.link::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 3%;
  width: 95%;
  height: 40%;
  background-color: rgb(19, 19, 19);
  transition: 0.5s;
  transform-origin: center;
}

.link::before {
  content: "";
  transform-origin: center;
  position: absolute;
  top: 80%;
  left: 3%;
  width: 95%;
  height: 40%;
  background-color: rgb(19, 19, 19);
  transition: 0.5s;
}

.link:hover::before, .link:hover::after {
  transform: scale(0)
}

.link:hover {
  box-shadow: inset 0px 0px 25px #1479EA;
  text-decoration: none;
  color:#ffffff;
}
</style>

