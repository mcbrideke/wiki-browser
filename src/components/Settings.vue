<template>
  <h1 class="text-center text-gray-700 h-8 font-bold tracking-wide">Settings</h1>
  <div class="flex flex-grow" >
    <div class="flex flex-col">
      <div class="mx-2">
        <label for="unchecked" class="mt-3 inline-flex items-center cursor-pointer">
          <span class="relative">
            <span class="block w-10 h-6 rounded-full shadow-inner" :class="[ checked ? 'bg-green-600' : ' bg-gray-400']"></span>
            <span class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out" :class="[ checked ? 'transform translate-x-full' : ' left-0']">
              <input id="unchecked" type="button" class="absolute opacity-0 w-0 h-0" @click="check"/>
            </span>
          </span>
          <span class="ml-3 text-sm">Hide Toolbar</span>
        </label>
      </div>
      <div class="grid grid-cols-3 mx-2 w-1/2">
        <div class="m-1 w-3 h-3 bg-gray-600"></div>
        <div class="m-1 w-3 h-3 bg-gray-600"></div>
        <div class="m-1 w-3 h-3 bg-gray-600"></div>
        <div class="m-1 w-3 h-3 bg-gray-600"></div>
        <div class="m-1 w-3 h-3 bg-gray-600"></div>
        <div class="m-1 w-3 h-3 bg-gray-600"></div>
        <div class="m-1 w-3 h-3 bg-gray-600"></div>
        <div class="m-1 w-3 h-3 bg-gray-600"></div>
        <div class="m-1 w-3 h-3 bg-gray-600"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Settings',
  emits: ['hide-toolbar'],
  data () {
    return {
      checked: false
    }
  },
  methods: {
    check () {
      this.checked = !this.checked
      this.$emit('hide-toolbar')
    }
  }
}
</script>
