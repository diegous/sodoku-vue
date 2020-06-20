<template>
  <div class="cell">
    {{ this.cell === "." ? "" : this.cell }}
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    cell: String
  }
}
</script>

<style scoped>
.cell {
  width: 35px;
  height: 35px;
  line-height: 35px;

  border-color: grey;
  border-style: solid;
  border-width: 1px;
}
</style>
