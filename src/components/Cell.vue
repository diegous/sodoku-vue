<template>
  <div class="cell" v-bind:class="{ original: cell.original }">
    {{ cell.value === "." ? "" : cell.value }}
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    cell: {
      value: String,
      original: Boolean
    }
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
