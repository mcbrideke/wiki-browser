<template>
  <h1 class="text-center text-gray-700 h-8 font-bold tracking-wide">
    Settings
  </h1>
  <div class="flex flex-grow">
    <div class="flex flex-col">
      <div class="mx-2">
        <label class="mt-3 inline-flex items-center cursor-pointer">
          <span class="relative">
            <span
              class="block w-10 h-6 rounded-full shadow-inner"
              :class="[checked ? 'bg-green-600' : ' bg-gray-400']"
            ></span>
            <span
              class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
              :class="[checked ? 'transform translate-x-full' : ' left-0']"
            >
              <input
                type="button"
                class="absolute opacity-0 w-0 h-0"
                @click="check"
              />
            </span>
          </span>
          <span class="ml-3 text-sm">Hide toolbar</span>
        </label>
      </div>
      <div class="mx-2">
        <label class="mt-3 inline-flex items-center cursor-pointer">
          <span class="relative">
            <span
              class="block w-10 h-6 rounded-full shadow-inner"
              :class="[lockPosition ? 'bg-green-600' : ' bg-gray-400']"
            ></span>
            <span
              class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
              :class="[lockPosition ? 'transform translate-x-full' : ' left-0']"
            >
              <input
                type="button"
                class="absolute opacity-0 w-0 h-0"
                @click="positionCheck"
              />
            </span>
          </span>
          <span class="ml-3 text-sm">Lock position</span>
        </label>
      </div>
      <div class="grid grid-cols-3 gap-2 mx-2 w-1/2" id="v-model-radiobutton" v-show="lockPosition">
        <div class="">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[0] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[0]"
              />
            </span>
          </span>
        </div>
        <div class="">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[1] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[1]"
              />
            </span>
          </span>
        </div>
        <div class="">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[2] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[2]"
              />
            </span>
          </span>
        </div>
        <div class="">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[3] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[3]"
              />
            </span>
          </span>
        </div>
        <div class="">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[4] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[4]"
              />
            </span>
          </span>
        </div>
        <div class="">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[5] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[5]"
              />
            </span>
          </span>
        </div>
        <div class="">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[6] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[6]"
              />
            </span>
          </span>
        </div>
        <div class="">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[7] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[7]"
              />
            </span>
          </span>
        </div>
        <div class="">
          <span class="relative">
            <span class="block w-5 h-5 shadow-inner bg-gray-400"></span>
            <span
              class="absolute block w-3 h-3 mt-1 ml-1 shadow inset-y-0 focus-within:shadow-outline"
              :class="[
                currentPosition === positions[8] ? 'bg-white' : 'bg-gray-400',
              ]"
            >
              <input
                type="radio"
                class="absolute opacity-0 w-4 h-4 cursor-pointer"
                v-model="currentPosition"
                v-bind:value="positions[8]"
              />
            </span>
          </span>
        </div>
        <!-- <div class="m-1 w-4 h-4 bg-gray-600"><div class="w-2 h-2 m-1 hover:bg-white"></div></div>
        <div class="m-1 w-4 h-4 bg-gray-600"></div>
        <div class="m-1 w-4 h-4 bg-gray-600"></div>
        <div class="m-1 w-4 h-4 bg-gray-600"></div>
        <div class="m-1 w-4 h-4 bg-gray-600"></div>
        <div class="m-1 w-4 h-4 bg-gray-600"></div>
        <div class="m-1 w-4 h-4 bg-gray-600"></div>
        <div class="m-1 w-4 h-4 bg-gray-600"></div>
        <div class="m-1 w-4 h-4 bg-gray-600"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Settings',
  emits: ['hide-toolbar', 'lock-position'],
  data () {
    return {
      checked: false,
      lockPosition: false,
      positions: ['tl', 'tm', 'tr', 'l', 'm', 'r', 'bl', 'bm', 'br'],
      currentPosition: ''
    }
  },
  watch: {
    currentPosition () {
      this.$emit('lock-position', this.$event, this.currentPosition)
    }
  },
  methods: {
    check () {
      this.checked = !this.checked
      this.$emit('hide-toolbar')
      console.log(this.currentPosition)
    },
    positionCheck () {
      this.lockPosition = !this.lockPosition
      if (!this.lockPosition) {
        this.currentPosition = 'free'
      } else {
        this.currentPosition = 'tl'
      }
      // this.$emit('lock-position', this.$event, this.currentPosition)
    }
  }
}
</script>
