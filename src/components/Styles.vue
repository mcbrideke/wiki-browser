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
              :class="[mode === 'dark' ? 'bg-black opacity-20' : 'bg-gray-500 opacity-40']"
            ></span>
            <span
              class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
              :class="[mode === 'dark' ? 'transform translate-x-full ' : 'left-0']"
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
      <div class="inline-flex mx-2 mt-3">
        <button class="bg-red-500 rounded-l w-6 h-6 shadow inset-y-0 text-white focus:outline-none hover:bg-opacity-50" :class="[ minopacity ? 'pointer-events-none opacity-75' : '']" @click="opacityDec">
          <svg class="pointer-events-none w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
        </button>
        <div class="bg-white w-10 h-6 px-1 text-sm text-center shadow-inner cursor-default select-none" :class="[`text-${color}-800`]">
          {{ opacityFactor }}%
        </div>
        <button class="bg-green-500 rounded-r w-6 h-6 text-white shadow inset-y-0 focus:outline-none hover:bg-opacity-50" :class="[ maxopacity ? 'pointer-events-none opacity-75' : '']" @click="opacityInc">
          <svg class="pointer-events-none w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <span class="ml-3 select-none" :class="[`text-${color}-${currentMode.icon}`]">Opacity</span>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Styles',
  emits: ['change-color', 'change-mode', 'opacity-factor'],
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
      currentColor: 'gray',
      opacityFactor: 100,
      minopacity: false,
      maxopacity: false
    }
  },
  methods: {
    changeMode () {
      this.mode === 'light' ? this.mode = 'dark' : this.mode = 'light'
      this.$emit('change-mode', this.$event, this.mode)
    },
    opacityInc () {
      this.minopacity = false
      if (this.opacityFactor === 90) {
        this.opacityFactor += 10
        this.maxopacity = true
        this.$emit('opacity-factor', this.$event, this.opacityFactor)
      } else if (this.opacityFactor > 90) {
        this.maxopacity = true
      } else {
        this.opacityFactor += 10
        this.maxopacity = false
        this.$emit('opacity-factor', this.$event, this.opacityFactor)
      }
    },
    opacityDec () {
      this.maxopacity = false
      if (this.opacityFactor === 20) {
        this.opacityFactor -= 10
        this.minopacity = true
        this.$emit('opacity-factor', this.$event, this.opacityFactor)
      } else if (this.opacityFactor < 20) {
        this.minopacity = true
      } else {
        this.opacityFactor -= 10
        this.minopacity = false
        this.$emit('opacity-factor', this.$event, this.opacityFactor)
      }
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
