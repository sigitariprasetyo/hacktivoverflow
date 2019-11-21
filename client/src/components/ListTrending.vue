<template>
  <div>
    <tr>
      <td>
        <b-tooltip :label="(item.count).toString()" position="is-right">
          <a href="#" @click.prevent="getTag(item._id)">
            <i class="fas fa-hashtag"></i>
            {{item._id}}
          </a>
        </b-tooltip>
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  name: "ListTrending",
  props: ["item"],
  methods: {
    getTag(tag){
      this.$store.dispatch('getByTag', {tag})
      this.$router.push(`/search-tag/${tag}`)
    }
  },
};
</script>
<style scoped>
.fas,
.far,
a {
  margin-right: 15px;
  color: black;
}
a:hover {
  color: rgb(241, 167, 56);
}
</style>