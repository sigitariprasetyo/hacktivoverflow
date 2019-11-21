<template>
  <div class="columns">
    <Mainleft />
    <Mainright />
  </div>
</template>

<script>
import Mainleft from '../components/MainLeft'
import Mainright from '../components/MainRight'

export default {
  name: 'home',
  components: {
    Mainleft,
    Mainright
  }
}
</script>
