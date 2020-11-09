<template>
  <h1 class="text-center h-8 font-bold tracking-wide select-none" :class="[`text-${color}-${currentMode.icon}`]">
    Settings
  </h1>
  <div class="flex flex-grow">
    <div class="flex flex-col">
      <div class="mx-2">
        <label class="inline-flex items-center cursor-pointer">
          <span class="relative">
            <span
              class="block w-10 h-6 rounded-full shadow-inner"
              :class="[onTop ? 'bg-black opacity-20 border-2 border-white' : ' bg-gray-500 opacity-40']"
            ></span>
            <span
              class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
              :class="[onTop ? 'transform translate-x-full' : ' left-0']"
            >
              <input
                type="button"
                class="absolute opacity-0 w-0 h-0"
                @click="toggleTop"
              />
            </span>
          </span>
          <span class="ml-3 select-none" :class="[`text-${color}-${currentMode.icon}`]">Always top</span>
        </label>
      </div>
      <div class="mx-2">
        <label class="inline-flex items-center cursor-pointer">
          <span class="relative">
            <span
              class="block w-10 h-6 rounded-full shadow-inner"
              :class="[!checked ? 'bg-black opacity-20 border-2 border-white' : ' bg-gray-500 opacity-40']"
            ></span>
            <span
              class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
              :class="[!checked ? 'transform translate-x-full' : ' left-0']"
            >
              <input
                type="button"
                class="absolute opacity-0 w-0 h-0"
                @click="check"
              />
            </span>
          </span>
          <span class="ml-3 select-none" :class="[`text-${color}-${currentMode.icon}`]">Toolbar</span>
        </label>
      </div>
      <div class="mx-2">
        <label class="inline-flex items-center cursor-pointer">
          <span class="relative">
            <span
              class="block w-10 h-6 rounded-full shadow-inner"
              :class="[tooltip ? 'bg-black opacity-20 border-2 border-white' : ' bg-gray-500 opacity-40']"
            ></span>
            <span
              class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
              :class="[tooltip ? 'transform translate-x-full' : ' left-0']"
            >
              <input
                type="button"
                class="absolute opacity-0 w-0 h-0"
                @click="toggleTooltip"
              />
            </span>
          </span>
          <span class="ml-3 select-none" :class="[`text-${color}-${currentMode.icon}`]">Tooltips</span>
        </label>
      </div>
      <div class="mx-2">
        <label class="inline-flex items-center cursor-pointer">
          <span class="relative">
            <span
              class="block w-10 h-6 rounded-full shadow-inner"
              :class="[lockPosition ? 'bg-black opacity-20 border-2 border-white' : ' bg-gray-500 opacity-40']"
            ></span>
            <span
              class="absolute block w-4 h-4 mt-1 ml-1  bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
              :class="[lockPosition ? 'transform translate-x-full' : ' left-0']"
            >
              <input
                type="button"
                class="absolute opacity-0 w-0 h-0"
                @click="positionCheck"
              />
            </span>
          </span>
          <span class="ml-3 select-none" :class="[`text-${color}-${currentMode.icon}`]">Lock</span>
        </label>
      </div>
      <div class="grid grid-cols-3 gap-1 mx-3 mb-2 w-1/2" id="v-model-radiobutton" v-show="lockPosition">
        <div class="" v-for="n in 9" :key="n">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[n-1] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[n-1]"
              />
            </span>
          </span>
        </div>
      </div>
      <div class="inline-flex mx-2">
        <button class="bg-red-500 rounded-l w-6 h-6 shadow inset-y-0 text-white focus:outline-none hover:bg-opacity-50" :class="[ minZoom ? 'pointer-events-none opacity-75' : '']" @click="zoomDec">
          <svg class="pointer-events-none w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
        </button>
        <div class="bg-white w-10 h-6 px-1 text-sm text-center shadow-inner cursor-default select-none" :class="[`text-${color}-800`]">
          {{ zoomFactor }}%
        </div>
        <button class="bg-green-500 rounded-r w-6 h-6 text-white shadow inset-y-0 focus:outline-none hover:bg-opacity-50" :class="[ maxZoom ? 'pointer-events-none opacity-75' : '']" @click="zoomInc">
          <svg class="pointer-events-none w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <span class="ml-3 select-none" :class="[`text-${color}-${currentMode.icon}`]">Zoom</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Settings',
  emits: ['hide-toolbar', 'lock-position', 'zoom-factor', 'on-top', 'toggle-tip'],
  props: ['color', 'currentMode'],
  data () {
    return {
      mainColor: this.color,
      onTop: true,
      checked: false,
      lockPosition: false,
      positions: ['tl', 'tm', 'tr', 'l', 'm', 'r', 'bl', 'bm', 'br'],
      currentPosition: '',
      zoomFactor: 100,
      minZoom: false,
      maxZoom: false,
      tooltip: true
    }
  },
  watch: {
    currentPosition () {
      this.$emit('lock-position', this.$event, this.currentPosition)
    }
  },
  methods: {
    toggleTop () {
      this.onTop = !this.onTop
      this.$emit('on-top')
    },
    toggleTooltip () {
      this.tooltip = !this.tooltip
      this.$emit('toggle-tip')
    },
    check () {
      this.checked = !this.checked
      this.$emit('hide-toolbar')
      // console.log(this.currentPosition)
    },
    positionCheck () {
      this.lockPosition = !this.lockPosition
      if (!this.lockPosition) {
        this.currentPosition = 'free'
      } else {
        this.currentPosition = 'tl'
      }
    },
    zoomInc () {
      this.minZoom = false
      if (this.zoomFactor === 290) {
        this.zoomFactor += 10
        this.maxZoom = true
        this.$emit('zoom-factor', this.$event, this.zoomFactor)
      } else if (this.zoomFactor > 290) {
        this.maxZoom = true
      } else {
        this.zoomFactor += 10
        this.maxZoom = false
        this.$emit('zoom-factor', this.$event, this.zoomFactor)
      }
    },
    zoomDec () {
      this.maxZoom = false
      if (this.zoomFactor === 60) {
        this.zoomFactor -= 10
        this.minZoom = true
        this.$emit('zoom-factor', this.$event, this.zoomFactor)
      } else if (this.zoomFactor < 60) {
        this.minZoom = true
      } else {
        this.zoomFactor -= 10
        this.minZoom = false
        this.$emit('zoom-factor', this.$event, this.zoomFactor)
      }
    }
  }
}
</script>
