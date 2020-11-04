<template>
  <h1 class="text-center h-8 font-bold tracking-wide select-none" :class="[`text-${currentColor}-${currentMode.icon}`]">
    Styles
  </h1>
  <div class="flex flex-grow flex-col">
      <div class="mx-2">
        <label class="mt-3 inline-flex items-center cursor-pointer">
          <span class="relative">
            <span
              class="block w-10 h-6 rounded-full shadow-inner"
              :class="[mode === 'dark' ? `bg-${currentColor}-800` : `bg-${currentColor}-500`]"
            ></span>
            <span
              class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
              :class="[mode === 'dark' ? 'transform translate-x-full' : ' left-0']"
            >
              <input
                type="button"
                class="absolute opacity-0 w-0 h-0"
                @click="changeMode"
              />
            </span>
          </span>
          <span class="ml-3 capitalize select-none" :class="[`text-${currentColor}-${currentMode.icon}`]">{{ mode }}</span>
        </label>
      </div>
    <div class="flex flex-row justify-around pt-4 h-12 w-4/5 ml-2" id="v-model-radiobutton">
        <div class="w-6 h-6" v-for="n in 5" :key="n">
          <span class="relative">
            <span
              class="absolute block w-6 h-6 shadow rounded-full inset-y-0 focus-within:shadow-outline"
              :class="[
                currentColor === colors[n-1] ? `bg-${colors[n-1]}-500 border-2 border-${colors[n-1]}-${currentMode.icon}` : `bg-${colors[n-1]}-500`,
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
  emits: ['change-color', 'change-mode'],
  data () {
    return {
      mode: 'light',
      colors: [
        'gray',
        'green',
        'orange',
        'pink',
        'blue'
      ],
      currentColor: 'gray'
    }
  },
  methods: {
    changeMode () {
      this.mode === 'light' ? this.mode = 'dark' : this.mode = 'light'
      this.$emit('change-mode', this.$event, this.mode)
    }
  },
  watch: {
    currentColor () {
      this.$emit('change-color', this.$event, this.currentColor)
    }
  },
  props: {
    color: {
      type: String,
      required: true
    },
    currentMode: {
      type: Object,
      required: true
    }
  }
}
</script>
