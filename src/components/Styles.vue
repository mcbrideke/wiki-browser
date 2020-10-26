<template>
  <h1 class="text-center text-gray-700 h-8 font-bold tracking-wide select-none">
    Styles
  </h1>
  <div class="flex flex-grow justify-center">
   <div class="flex flex-row justify-around pt-4 h-full w-4/5" id="v-model-radiobutton">
        <div class="w-6 h-6" v-for="n in 5" :key="n">
          <span class="relative">
            <span
              class="absolute block w-6 h-6 shadow rounded-full inset-y-0 focus-within:shadow-outline"
              :class="[
                currentColor === colors[n-1] ? `bg-${colors[n-1]}-500 border-2 border-${colors[n-1]}-700` : `bg-${colors[n-1]}-500`,
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-6 h-6 cursor-pointer"
                v-model="currentColor"
                v-bind:value="colors[n-1]"
              />
            </span>
          </span>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Styles',
  emits: ['change-color'],
  data () {
    return {
      colors: [
        'gray',
        'green',
        'orange',
        'pink',
        'blue'
      ],
      currentColor: ''
    }
  },
  watch: {
    currentColor () {
      this.$emit('change-color', this.$event, this.currentColor)
    }
  }
}
</script>
