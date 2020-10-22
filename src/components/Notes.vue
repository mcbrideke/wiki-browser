<template>
  <h1 class="text-center text-gray-700 h-8 font-bold tracking-wide">Notes</h1>
  <textarea class="flex flex-grow bg-gray-100 focus:outline-none mx-4 resize-none" v-model="note"></textarea>
</template>
<script>
export default {
  name: 'Notes',
  data () {
    return {
      note: ''
    }
  }
}
</script>
