<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app'
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  ul,
  li {
    list-style: none;
  }
  a{
    text-decoration: none;
    color: #252526;
  }
  
</style>