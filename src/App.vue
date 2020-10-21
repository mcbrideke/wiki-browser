<template>
<div class="flex h-full flex-col">
  <div class="toolbar flex h-12">
    <div class="flex items-center justify-around w-1/5 bg-teal-500">
      <button class="hover:bg-teal-600 px-1 py-1 focus:outline-none rounded-full text-white" @click="back">
        <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <button class="hover:bg-teal-600 px-1 py-1 focus:outline-none rounded-full text-white" @click="forward">
        <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button></div>
    <div class="flex items-center justify-center w-3/5 bg-teal-500">
      <button class="bg-white h-8 px-2 rounded-l focus:outline-none text-gray-500">
       <svg class="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      </button>
      <input class="h-8 focus:outline-none rounded-r" v-on:keyup.enter="submit" v-model="url" placeholder="Enter wiki url" />
    </div>
    <div class="flex items-center justify-around w-1/5 bg-teal-500">
      <button class="hover:bg-teal-600 px-1 py-1 focus:outline-none rounded-full text-white" @click="minimize">
        <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </button>
      <button class="hover:bg-teal-600 px-1 py-1 focus:outline-none rounded-full text-white" @click="close">
        <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
  <div class="flex flex-grow">
    <div class="flex w-full flex-row">
      <div class="bg-gray-400" :class="[ collapsed ? 'w-12' : 'w-48' ]">
        <div class="flex" :class="[ collapsed ? 'w-full h-full flex-row' : 'h-full flex-col' ]">
          <div class="bg-gray-100 flex items-center justify-around" :class="[ collapsed ? 'flex-col w-12' : 'flex-row h-12' ]">
            <div class="">
              <button class="hover:bg-gray-300 px-1 py-1 focus:outline-none rounded-full text-gray-500" @click="notes">
                <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            <div class="">
              <button class="hover:bg-gray-300 px-1 py-1 focus:outline-none rounded-full text-gray-500" @click="settings">
                <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <div class="">
              <button class="hover:bg-gray-300 px-1 py-1 focus:outline-none rounded-full text-gray-500" @click="styles">
                <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </button>
            </div>
            <div class="">
              <button class="hover:bg-gray-300 px-1 py-1 focus:outline-none rounded-full text-gray-500" @click="clickThrough" @mouseover="disableClickThrough">
                <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </button>
            </div>
            <div class="">
              <button class="hover:bg-gray-300 px-1 py-1 focus:outline-none rounded-full text-gray-500" v-show="!collapsed" @click="collapsed = true">
                <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              </button>
            </div>
          </div>
          <div class="bg-gray-100 flex flex-grow">
            <div v-show="!collapsed"><component v-bind:is="currentTabComponent"></component></div>
          </div>
        </div>
      </div>
      <div id="browser-view" class="bg-gray-500 flex flex-grow"></div>
    </div>
  </div>
</div>
</template>
<script>
import Notes from './components/Notes.vue'
import Settings from './components/Settings.vue'
import Styles from './components/Styles.vue'

export default {
  name: 'App',
  data () {
    return {
      url: '',
      collapsed: true,
      canClickThrough: false,
      sidebarOpen: 'sidebar-open',
      sidebarCollapsed: 'sidebar-collapsed',
      sidebar: 'sidebar',
      currentTab: 'Notes'
    }
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.onResize)
  },
  watch: {
    collapsed (val) {
      this.$nextTick(() => {
        this.onResize()
      })
    }
  },
  methods: {
    onResize () {
      const dimensions = {
        x: document.getElementById('browser-view').getBoundingClientRect().x,
        y: document.getElementById('browser-view').getBoundingClientRect().y,
        width: document.getElementById('browser-view').getBoundingClientRect().width,
        height: document.getElementById('browser-view').getBoundingClientRect().height
      }
      window.ipcRenderer.send('resize-view', dimensions)
    },
    back () {
      window.ipcRenderer.send('go-back')
    },
    forward () {
      window.ipcRenderer.send('go-forward')
    },
    notes () {
      this.collapsed = false
      this.currentTab = 'Notes'
    },
    minimize () {
      console.log('minimize')
    },
    close () {
      window.ipcRenderer.send('close-app')
    },
    clickThrough () {
      window.ipcRenderer.send('click-through')
      this.canClickThrough = false
    },
    disableClickThrough () {
      // console.log(this.canClickThrough)
      if (this.canClickThrough) {
        window.ipcRenderer.send('disable-click-through')
      }
    },
    settings () {
      this.collapsed = false
      this.currentTab = 'Settings'
    },
    styles () {
      this.collapsed = false
      this.currentTab = 'Styles'
    },
    submit () {
      // console.log(this.url)
      window.ipcRenderer.send('load-wiki', this.url)
      this.url = ''
    }
  },
  components: {
    Notes,
    Settings,
    Styles
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
html, body {
  margin: 0;
  height: 100%;
}
.toolbar {
  -webkit-app-region: drag;
}
.toolbar button{
  -webkit-app-region: no-drag
}
.toolbar input{
  -webkit-app-region: no-drag
}
</style>
