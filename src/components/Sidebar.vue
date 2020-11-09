<template>
     <div
      :class="[collapsed ? `w-12 bg-${color}-${currentMode.sidebarBg} opacity-${opacity}` : `w-48 bg-${color}-${currentMode.sidebarBg} opacity-${opacity}`]"
     >
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
              <div class="" ref="disable">
                <button
                  class="px-1 py-1 w-8 h-8 focus:outline-none rounded-full"
                  :class="[cthrough ? `text-${color}-${currentMode.icon} bg-${color}-${currentMode.hover} cursor-default` : `text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]"
                  @click="clickThrough"
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
  emits: ['disable-click-through', 'click-through', 'notes-comp', 'settings-comp', 'set-collapsed'],
  data () {
    return {
      cthrough: false,
      tip: null,
      clickTip: null,
      noteTip: null,
      styleTip: null,
      settingTip: null
    }
  },
  mounted () {
    console.log(this.$props.tipActive)
    const noteTip = tippy(this.$refs.notes, { content: 'Notes', theme: 'main' })
    const settingTip = tippy(this.$refs.settings, { content: 'Settings', theme: 'main' })
    const styleTip = tippy(this.$refs.styles, { content: 'Styles', theme: 'main' })
    const original = tippy(this.$refs.click, { content: 'Click Through', theme: 'main' })
    const disable = tippy(this.$refs.disable, {
      content: '<div class="w-5 h-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>',
      allowHTML: true,
      placement: 'bottom',
      arrow: false,
      theme: 'disable',
      interactive: true,
      trigger: 'manual'
    })
    this.tip = disable
    this.clickTip = original
    this.noteTip = noteTip
    this.styleTip = styleTip
    this.settingTip = settingTip
    this.tip.popper.addEventListener('mouseover', () => {
      this.tip.hide()
      this.$emit('disable-click-through')
      this.cthrough = false
      this.clickTip.setContent('Click Through')
    })
  },
  beforeUnmount () {
    this.tip.popper.removeEventListener('mouseover', () => {
      this.tip.hide()
      this.$emit('disable-click-through')
      this.cthrough = false
      this.clickTip.setContent('Click Through')
    })
  },
  watch: {
    tipActive () {
      if (!this.$props.tipActive) {
        this.noteTip.disable()
        this.settingTip.disable()
        this.styleTip.disable()
        this.clickTip.disable()
      } else {
        this.noteTip.enable()
        this.settingTip.enable()
        this.styleTip.enable()
        this.clickTip.enable()
      }
    }
  },
  computed: {
    userStyle () {
      const root = document.documentElement
      root.style.setProperty('--bg', `var(--color-${this.$props.color}-${this.$props.currentMode.hover})`)
      root.style.setProperty('--text', `var(--color-${this.$props.color}-${this.$props.currentMode.icon})`)
      return {
        '--bg': `--color-${this.$props.color}-500`
      }
    }
  },
  methods: {
    clickThrough () {
      this.$emit('click-through')
      this.cthrough = true
      this.tip.show()
      this.clickTip.setContent('Hover the icon below to disable')
      this.clickTip.show()
    }
  },

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
      required: true
    },
    tipActive: {
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
  .tippy-box[data-theme~='main'][data-placement^='bottom'] > .tippy-arrow::before {
    border-bottom-color: var(--bg);
  }
  .tippy-box[data-theme~='main'][data-placement^='left'] > .tippy-arrow::before {
    border-left-color: var(--bg);
  }
  .tippy-box[data-theme~='main'][data-placement^='right'] > .tippy-arrow::before {
    border-right-color: var(--bg);
  }
   .tippy-box[data-theme~='disable'] {
    background-color: var(--color-red-500);
    color: var(--color-white);
    font-weight: 700;
  }
</style>
