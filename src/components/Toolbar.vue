<template>
   <div
      class="flex h-full"
      v-show="!barHidden"
      :class="[locked ? `bg-${color}-${currentMode.toolbarBg} opacity-${opacity}` : `bg-${color}-${currentMode.toolbarBg} toolbar opacity-${opacity}`]"
    >
      <div class="flex items-center justify-around w-1/5">
        <button
          class="rounded-full focus:outline-none w-6 h-6 py-1 px-1"
          :class="[
            goBack ? `text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}` : `text-${color}-${currentMode.icon} opacity-50 cursor-default`,
          ]"
          @click="$emit('go-back')"
        >
         <icon icon="back"/>
        </button>
        <button
          class="focus:outline-none rounded-full  w-6 h-6 py-1 px-1"
          :class="[
            goForward ? `text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}` : `text-${color}-${currentMode.icon} opacity-50 cursor-default`,
          ]"
          @click="$emit('go-forward')"
        >
         <icon icon="forward"/>
        </button>
      </div>
      <div class="flex items-center justify-center w-3/5">
        <button
          class="bg-white h-6 rounded-l w-6 px-1 focus:outline-none"
          :class="[`text-${color}-500 border-l hover:bg-${color}-200 border-t border-b border-${color}-500`]"
          @click="search"
        >
         <icon icon="magnify"/>
        </button>
        <input
          class="h-6 focus:outline-none rounded-r w-1/2"
          :class="[`text-${color}-500 border-r border-t border-b placeholder-${color}-500 border-${color}-500`]"
          v-model="newUrl"
          v-on:keyup.enter="search"
          placeholder="Enter a url"
        />
      </div>
      <div class="flex items-center justify-around w-1/5">
        <button
          class="px-1 py-1 w-6 h-6 focus:outline-none rounded-full"
          :class="[`text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]"
          @click="$emit('set-mini')"
        >
          <icon icon="minimize"/>
        </button>
        <button
          class="hover:bg-red-500 px-1 py-1 w-6 h-6 focus:outline-none rounded-full"
          :class="[`text-${color}-${currentMode.icon}`]"
          @click="$emit('close-win')"
        >
          <icon icon="exit"/>
        </button>
      </div>
    </div>
</template>
<script>
import Icon from './Icon.vue'
export default {
  name: 'Toolbar',
  data () {
    return {
      newUrl: ''
    }
  },
  methods: {
    search () {
      this.$emit('submit-search', this.$event, this.newUrl)
      this.newUrl = ''
    }
  },
  props: {
    locked: {
      type: Boolean,
      required: true
    },
    goBack: {
      type: Boolean,
      required: true
    },
    goForward: {
      type: Boolean,
      required: true
    },
    barHidden: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    currentMode: {
      type: Object,
      required: true
    },
    opacity: {
      required: true
    }
  },
  components: {
    Icon
  }
}
</script>
