<template>
   <div
      class="flex h-10 bg-gray-800"
      v-show="!barHidden"
      :class="[locked ? '' : 'toolbar']"
    >
      <div class="flex items-center justify-around w-1/5">
        <button
          class="rounded-full text-gray-200 focus:outline-none w-6 h-6 py-1 px-1"
          :class="[
            goBack ? 'hover:bg-gray-500  ' : 'opacity-50 cursor-default',
          ]"
          @click="$emit('go-back')"
        >
         <icon icon="back"/>
        </button>
        <button
          class="focus:outline-none rounded-full text-gray-200 w-6 h-6 py-1 px-1"
          :class="[
            goForward ? 'hover:bg-gray-500  ' : 'opacity-50 cursor-default',
          ]"
          @click="$emit('go-forward')"
        >
         <icon icon="forward"/>
        </button>
      </div>
      <div class="flex items-center justify-center w-3/5">
        <button
          class="bg-white h-6 rounded-l w-6 px-1 focus:outline-none text-gray-500"
          @click="search"
        >
         <icon icon="magnify"/>
        </button>
        <input
          class="h-6 focus:outline-none rounded-r w-1/2"
          v-model="newUrl"
          v-on:keyup.enter="search"
          placeholder="Enter wiki url"
        />
      </div>
      <div class="flex items-center justify-around w-1/5">
        <button
          class="hover:bg-gray-500 px-1 py-1 w-6 h-6 focus:outline-none rounded-full text-gray-200"
          @click="$emit('set-mini')"
        >
          <icon icon="minimize"/>
        </button>
        <button
          class="hover:bg-red-500 px-1 py-1 w-6 h-6 focus:outline-none rounded-full text-gray-200"
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
    }
  },
  components: {
    Icon
  }
}
</script>
