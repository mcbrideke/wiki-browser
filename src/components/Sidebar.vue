<template>
     <div :class="[collapsed ? `w-12 bg-${color}-${currentMode.sidebarBg} opacity-${opacity}` : `w-48 bg-${color}-${currentMode.sidebarBg} opacity-${opacity}`]">
          <div
            class="flex "
            :class="[collapsed ? 'w-full h-full flex-row' : 'h-full flex-col ']"
          >
            <div
              class=" flex items-center justify-around"
              :class="[collapsed ? 'flex-col w-12' : 'flex-row h-12']"
            >
              <div>
                <button
                  class="px-1 py-1 w-8 h-8 focus:outline-none rounded-full"
                  :class="[currentComponent === 'Notes' && !collapsed? `text-${color}-${currentMode.icon} bg-${color}-${currentMode.hover} cursor-default` : `text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]"
                  @click="$emit('notes-comp')"
                  ref="notes"
                  :style="userStyle"
                >
                  <icon icon="note"/>
                </button>
              </div>
              <div>
                <button
                  class=" px-1 py-1 focus:outline-none rounded-full"
                  :class="[currentComponent === 'Settings' && !collapsed? `text-${color}-${currentMode.icon} bg-${color}-${currentMode.hover} cursor-default` : `text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]"
                  @click="$emit('settings-comp')"
                  ref="settings"
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
              <div>
                <button
                  class="px-1 py-1 focus:outline-none w-8 h-8 rounded-full"
                  :class="[currentComponent === 'Styles' && !collapsed? `text-${color}-${currentMode.icon} bg-${color}-${currentMode.hover} cursor-default` : `text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]"
                  @click="$emit('styles-comp')"
                  ref="styles"
                >
                <icon icon="style"/>
                </button>
              </div>
              <div class="">
                <button
                  class="px-1 py-1 w-8 h-8 focus:outline-none rounded-full"
                  :class="[`text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]"
                  @click="$emit('click-through')"
                  ref="click"
                >
                <icon icon="click"/>
                </button>
              </div>
              <div>
                <button
                  class="px-1 py-1 w-8 h-8 focus:outline-none rounded-full"
                  :class="[`text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]"
                  v-show="!collapsed"
                  @click="$emit('set-collapsed')"
                >
                 <icon icon="chevL"/>
                </button>
              </div>
            </div>
            <div
              class="flex flex-grow"
              :class="[`bg-${color}-${currentMode.sidebarBg}`]"
            >
              <div class="w-full h-full flex flex-col" v-show="!collapsed">
               <slot></slot>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
import Icon from './Icon.vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
export default {
  name: 'Sidebar',
  mounted () {
    tippy(this.$refs.notes, { content: 'Notes', theme: 'main' })
    tippy(this.$refs.settings, { content: 'Settings', theme: 'main' })
    tippy(this.$refs.styles, { content: 'Styles', theme: 'main' })
    tippy(this.$refs.click, { content: 'Click Through', theme: 'main' })
  },
  computed: {
    userStyle () {
      console.log(this.$props.color)
      const root = document.documentElement
      root.style.setProperty('--bg', `var(--color-${this.$props.color}-${this.$props.currentMode.hover})`)
      root.style.setProperty('--text', `var(--color-${this.$props.color}-${this.$props.currentMode.icon})`)
      return {
        '--bg': `--color-${this.$props.color}-500`
      }
    }
  },
  // computed: {
  //   cssProps() {
  //     return {
  //       '--hover-font-size': (this.baseFontSize * 2) + "em",
  //       '--bg-hover-color': this.bgHoverColor,
  //       '--hover-content': JSON.stringify(this.hoverContent)
  //     }
  //   }
  // },
  props: {
    collapsed: {
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
    currentComponent: {
      type: String,
      required: true
    },
    opacity: {
      type: String,
      required: true
    }
  },
  components: {
    Icon
  }
}
</script>
<style>
:root {
  --bg: rgb(34, 34, 34);
  --text: white;
}
  .tippy-box[data-theme~='main'] {
    background-color: var(--bg);
    color: var(--text);
    font-weight: 700;
  }
  .tippy-box[data-theme~='main'][data-placement^='top'] > .tippy-arrow::before {
    border-top-color: var(--bg);
  }
</style>
