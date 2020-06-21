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
  width: 60px;
  height: 60px;
  line-height: 60px;

  border-color: grey;
  border-style: solid;
  border-width: 1px;

  font-size: 2rem;
}

.original {
  font-weight: bold;
}
</style>
