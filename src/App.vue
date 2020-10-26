<template>
<div class="flex h-12 w-12 bg-gray-600 items-center justify-center" :class="[locked ? '': 'toolbar']" v-show="minimized">
  <button class="hover:bg-gray-700 px-1 py-1 focus:outline-none rounded-full text-white" @click="minimized = false">
    <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  </button>
</div>
<div class="flex flex-col bg-white h-full" v-show="!minimized">
  <div class="flex h-10" v-show="!barHidden" :class="[locked ? '': 'toolbar']">
    <div class="flex items-center justify-around w-1/5 bg-gray-500">
      <button class=" rounded-full text-white focus:outline-none px-1 py-1" :class="[ goBack ? 'hover:bg-gray-600  ' : 'opacity-50 cursor-default']" @click="back" >
        <svg class="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <button class="focus:outline-none rounded-full text-white px-1 py-1" :class="[ goForward ? 'hover:bg-gray-600  ' : 'opacity-50 cursor-default']" @click="forward">
        <svg class="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
    <div class="flex items-center justify-center w-3/5 bg-gray-500">
      <button class="bg-white h-6 px-2 rounded-l focus:outline-none text-gray-500" @click="submit">
       <svg class="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      </button>
      <input class="h-6 focus:outline-none rounded-r w-1/2" v-on:keyup.enter="submit" v-model="url" placeholder="Enter wiki url" />
    </div>
    <div class="flex items-center justify-around w-1/5 bg-gray-500">
      <button class="hover:bg-gray-600 px-1 py-1 focus:outline-none rounded-full text-white" @click="minimized = true">
        <svg class="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </button>
      <button class="hover:bg-red-600 px-1 py-1 focus:outline-none rounded-full text-white" @click="close">
        <svg class="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <button class="hover:bg-gray-300 px-1 py-1 focus:outline-none rounded-full text-gray-500" @click="clickThrough">
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
            <div class="w-full h-full flex flex-col" v-show="!collapsed"><keep-alive><component v-bind:is="currentTabComponent" @hide-toolbar="hidetoolbar" @lock-position="lockposition" @zoom-factor="zoom" @change-color="color" @on-top="toggleTop" :color="mainColor"></component></keep-alive></div>
          </div>
        </div>
      </div>
      <div id="browser-view" class="bg-gray-500 flex flex-grow ">
        <webview ref="web" class="inline-flex bg-gray-500 w-full h-full" src="https://www.github.com/"></webview>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Notes from './components/Notes.vue'
import Settings from './components/Settings.vue'
import Styles from './components/Styles.vue'
// import Back from './assets/icons/back-md.svg'
export default {
  name: 'App',
  data () {
    return {
      url: '',
      mainColor: 'gray',
      collapsed: true,
      canClickThrough: false,
      currentTab: 'Notes',
      minimized: false,
      goBack: true,
      goForward: true,
      barHidden: false,
      locked: false
    }
  },
  mounted () {
    this.$refs.web.addEventListener('did-stop-loading', this.loadstop)
  },
  beforeUnmount () {
    this.$refs.web.removeEventListener('did-stop-loading', this.loadstop)
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab
    }
  },
  methods: {
    lockposition (e, position) {
      if (position === 'free') {
        this.locked = false
      } else {
        this.locked = true
        const screenWidth = window.screen.availWidth
        const screenHeight = window.screen.availHeight
        const windowOuterWidth = window.outerWidth
        const windowOuterHeight = window.outerHeight
        const positions = {
          tl: { x: 0, y: 0 },
          l: { x: 0, y: screenHeight / 2 - windowOuterHeight / 2 },
          bl: { x: 0, y: screenHeight - windowOuterHeight },
          tm: { x: screenWidth / 2 - windowOuterWidth / 2, y: 0 },
          m: { x: screenWidth / 2 - windowOuterWidth / 2, y: screenHeight / 2 - windowOuterHeight / 2 },
          bm: { x: screenWidth / 2 - windowOuterWidth / 2, y: screenHeight - windowOuterHeight },
          tr: { x: screenWidth - windowOuterWidth, y: 0 },
          r: { x: screenWidth - windowOuterWidth, y: screenHeight / 2 - windowOuterHeight / 2 },
          br: { x: screenWidth - windowOuterWidth, y: screenHeight - windowOuterHeight }
        }
        window.ipcRenderer.send('lock-position', positions[position])
      }
    },
    toggleTop () {
      window.ipcRenderer.send('toggle-top')
    },
    color (e, currentColor) {
      // console.log(currentColor)
      this.mainColor = currentColor
    },
    zoom (e, zoomFactor) {
      this.$refs.web.setZoomFactor(zoomFactor / 100)
    },
    hidetoolbar () {
      this.barHidden = !this.barHidden
    },
    loadstop () {
      this.goBack = this.$refs.web.canGoBack()
      this.goForward = this.$refs.web.canGoForward()
    },
    back () {
      this.$refs.web.goBack()
    },
    forward () {
      this.$refs.web.goForward()
    },
    notes () {
      this.collapsed = false
      this.currentTab = 'Notes'
    },
    close () {
      window.ipcRenderer.send('close-app')
    },
    clickThrough () {
      console.log('cthrough')
      // this.$refs.web.setVerticalScrollBarEnabled(false)
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
      const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/
      if (pattern.test(this.url)) {
        this.$refs.web.loadURL(this.url)
      } else {
        const search = 'https://www.google.com/search?q=' + this.url
        this.$refs.web.loadURL(search)
      }
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
