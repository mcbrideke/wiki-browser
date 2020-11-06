<template>
  <div
    class="flex h-12 w-12  items-center justify-center"
    :class="[locked ? `bg-${mainColor}-${currentMode.toolbarBg}` : `bg-${mainColor}-${currentMode.toolbarBg} toolbar`]"
    v-show="minimized"
  >
    <button
      class="w-8 h-8 px-1 py-1 focus:outline-none rounded-full"
      :class="[`hover:bg-${mainColor}-${currentMode.hover} text-${mainColor}-${currentMode.icon}`]"
      @click="reset"
    >
      <icon icon="plus"/>
    </button>
  </div>
  <div  class="flex flex-col h-full overflow-hidden" v-show="!minimized">
    <div class="h-10" v-show="!barHidden">
    <toolbar
      :locked="locked"
      :goBack="goBack"
      :goForward="goForward"
      :barHidden="barHidden"
      :color="mainColor"
      :currentMode="currentMode"
      :opacity="setOpacity"
      @close-win="close"
      @submit-search="submit"
      @set-mini="minimize"
      @go-forward="forward"
      @go-back="back"
    />
    </div>
    <div class="flex flex-grow ">
      <div class="flex w-full flex-row ">
        <sidebar
          :collapsed="collapsed"
          :color="mainColor"
          :opacity="setOpacity"
          :current-mode="currentMode"
          :current-component="currentTabComponent"
          :tip-active="tipActive"
          @notes-comp="notes"
          @settings-comp="settings"
          @styles-comp="styles"
          @click-through="clickThrough"
          @disable-click-through="disableClickThrough"
          @set-collapsed="collapsed = true"
        >
          <keep-alive>
            <component
            :is="currentTabComponent"
            @hide-toolbar="hidetoolbar"
            @lock-position="lockposition"
            @zoom-factor="zoom"
            @change-color="color"
            @change-mode="mode"
            @on-top="toggleTop"
            @toggle-tip="toggleTip"
            @opacity-factor="opacity"
            :current-component="currentTabComponent"
            :color="mainColor"
            :current-mode="currentMode"
            ></component>
          </keep-alive>
        </sidebar>
        <div id="browser-view" class="flex flex-grow" :class="[`opacity-${setOpacity}`]">
          <webview
            ref="web"
            class="inline-flex w-full h-full"
            src="https://www.fandom.com/topics/games"
            allowpopups="false"
          ></webview>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Notes from './components/Notes.vue'
import Settings from './components/Settings.vue'
import Styles from './components/Styles.vue'
import Icon from './components/Icon.vue'
import Toolbar from './components/Toolbar.vue'
import Sidebar from './components/Sidebar.vue'
export default {
  name: 'App',
  data () {
    return {
      currentMode: {
        toolbarBg: '200',
        sidebarBg: '300',
        hover: '500',
        icon: '700'
      },
      theme: {
        dark: {
          toolbarBg: '800',
          sidebarBg: '700',
          hover: '500',
          icon: '300'
        },
        light: {
          toolbarBg: '200',
          sidebarBg: '300',
          hover: '500',
          icon: '700'
        }
      },
      setOpacity: '100',
      mainColor: 'gray',
      collapsed: true,
      canClickThrough: false,
      currentTab: 'Notes',
      minimized: false,
      goBack: true,
      goForward: true,
      barHidden: false,
      locked: false,
      currentPosition: 'free',
      tipActive: true
    }
  },
  mounted () {
    // console.log(this.tipActive)
    this.$refs.web.addEventListener('did-stop-loading', this.loadstop)
  },
  beforeUnmount () {
    this.$refs.web.removeEventListener('did-stop-loading', this.loadstop)
  },
  watch: {
    barHidden () {
      this.lockposition(null, this.currentPosition)
    }
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab
    }
  },
  methods: {
    lockposition (e, position) {
      this.currentPosition = position
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
    toggleTip () {
      this.tipActive = !this.tipActive
    },
    color (e, currentColor) {
      this.mainColor = currentColor
    },
    mode (e, m) {
      this.currentMode = this.theme[m]
    },
    zoom (e, zoomFactor) {
      this.$refs.web.setZoomFactor(zoomFactor / 100)
    },
    opacity (e, opacityFactor) {
      this.setOpacity = opacityFactor
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
    reset () {
      this.minimized = false
      window.ipcRenderer.send('reset')
    },
    forward () {
      this.$refs.web.goForward()
    },
    minimize () {
      this.minimized = true
      window.ipcRenderer.send('set-mini')
    },
    notes () {
      this.collapsed = false
      this.currentTab = 'Notes'
    },
    close () {
      window.ipcRenderer.send('close-app')
    },
    clickThrough () {
      window.ipcRenderer.send('cthrough')
      this.collapsed = true
    },
    disableClickThrough () {
      window.ipcRenderer.send('disable-cthrough')
    },
    settings () {
      this.collapsed = false
      this.currentTab = 'Settings'
    },
    styles () {
      this.collapsed = false
      this.currentTab = 'Styles'
    },
    submit (e, u) {
      const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/
      if (pattern.test(u)) {
        this.$refs.web.loadURL(u)
      } else {
        const search = 'https://www.google.com/search?q=' + u
        this.$refs.web.loadURL(search)
      }
    }
  },
  components: {
    Toolbar,
    Sidebar,
    Notes,
    Settings,
    Styles,
    Icon
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
