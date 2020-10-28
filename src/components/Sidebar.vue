<template>
     <div class="bg-gray-700" :class="[collapsed ? 'w-12' : 'w-48']">
          <div
            class="flex"
            :class="[collapsed ? 'w-full h-full flex-row' : 'h-full flex-col']"
          >
            <div
              class=" flex items-center justify-around"
              :class="[collapsed ? 'flex-col w-12' : 'flex-row h-12']"
            >
              <div class="">
                <button
                  class="hover:bg-gray-500 px-1 py-1 w-8 h-8 focus:outline-none rounded-full text-gray-200"
                  @click="$emit('notes-comp')"
                >
                 <icon icon="note"/>
                </button>
              </div>
              <div class="">
                <button
                  class="hover:bg-gray-500 px-1 py-1 focus:outline-none rounded-full text-gray-200"
                  @click="$emit('settings-comp')"
                >
                  <svg
                    class="pointer-events-none w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
              <div class="">
                <button
                  class="hover:bg-gray-500 px-1 py-1 focus:outline-none w-8 h-8 rounded-full text-gray-200"
                  @click="$emit('styles-comp')"
                >
                <icon icon="style"/>
                </button>
              </div>
              <div class="">
                <button
                  class="hover:bg-gray-500 px-1 py-1 w-8 h-8 focus:outline-none rounded-full text-gray-200"
                  @click="$emit('click-through')"
                >
                <icon icon="click"/>
                </button>
              </div>
              <div class="">
                <button
                  class="hover:bg-gray-500 px-1 py-1 w-8 h-8 focus:outline-none rounded-full text-gray-200"
                  v-show="!collapsed"
                  @click="$emit('set-collapsed')"
                >
                 <icon icon="chevL"/>
                </button>
              </div>
            </div>
            <div class="bg-gray-700 flex flex-grow">
              <div class="w-full h-full flex flex-col" v-show="!collapsed">
               <slot></slot>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
import Icon from './Icon.vue'
export default {
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Icon
  }
}
</script>
