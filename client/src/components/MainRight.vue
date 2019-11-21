<template>
  <div class="column">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.column {
  padding: 2vw 12vw 2vw 2vw;
  margin-right: 10%;
  overflow: scroll;
  height: 90vh;
  overflow-x: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey; */
  border-radius: 2px;
  background-color: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  /* background: rgb(233, 198, 81); */
  background-color: transparent;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ca7a7a;
}
</style>