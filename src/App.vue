<template>
<div class="flex h-full flex-col">
  <div class="flex h-12">
    <div class="flex items-center justify-around w-1/5 bg-teal-500">
      <button class="hover:bg-teal-600 px-2 py-1 focus:outline-none rounded-full" @click="back"><i class="material-icons md-light">arrow_back</i></button>
      <button class="hover:bg-teal-600 px-2 py-1 focus:outline-none rounded-full" @click="forward"><i class="material-icons md-light">arrow_forward</i></button></div>
    <div class="flex items-center justify-center w-3/5 bg-teal-500">
      <button class="bg-white h-8 px-2 rounded-l focus:outline-none text-gray-500">
       <svg class="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      </button>
      <input class="h-8 focus:outline-none rounded-r" v-on:keyup.enter="submit" v-model="url" placeholder="enter wiki url" />
    </div>
    <div class="flex items-center justify-around w-1/5 bg-teal-500">
      <button @click="minimize"><i class="material-icons md-light">minimize</i></button>
      <button @click="close"><i class="material-icons md-light">close</i></button>
    </div>
  </div>
  <div class="flex flex-grow">
    <div class="flex w-full flex-row">
      <div class="bg-gray-400" :class="[ collapsed ? 'w-12' : 'w-48' ]">
        <div class="flex" :class="[ collapsed ? 'w-full h-full flex-row' : 'h-full flex-col' ]">
          <div class="bg-gray-100 flex items-center justify-around" :class="[ collapsed ? 'flex-col w-12' : 'flex-row h-12' ]">
            <div class="py-6">
              <button class="" @click="notes"><i class="material-icons sm-light">note_add</i></button>
            </div>
            <div class="py-6">
              <button class="" @click="settings"><i class="material-icons sm-light">settings</i></button>
            </div>
            <div class="py-6">
              <button class="" @click="styles"><i class="material-icons sm-light">style</i></button>
            </div>
            <div class="py-6">
              <button class="" @click="clickThrough" @mouseover="disableClickThrough"><i class="material-icons sm-light">gamepad</i></button>
            </div>
            <div class="py-6">
              <button class="" v-show="!collapsed" @click="collapsed = true"><i class="material-icons sm-light">fullscreen_exit</i></button>
            </div>
          </div>
          <div class="bg-gray-500 flex flex-grow">
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
    // const el = document.getElementById('clickThrough')
    // el.addEventListener('mouseenter', () => {
    //   console.log(this.canClickThrough)
    // })
  },
  beforeUnmount () {
    // Unregister the event listener before destroying this Vue instance
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
      // console.log(dimensions)
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
.main {
  height:100%;
  grid-area: browser;
  display:flex;
  align-items: stretch;
}
#app {
  height: 100%;
  display: block;
}
// #app {
//   width:100%;
//   height:100%;
//   display: grid;
//   grid-template-columns: 1fr;
//   grid-template-rows: 40px 1fr;
//   grid-template-areas:
//   "toolbar"
//   "browser";
// }
html, body {
  margin: 0;
  height: 100%;
}
.toolbar {
  -webkit-app-region: drag;
  grid-area: toolbar;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(6, 48, 58);
}
.toolbar button{
  -webkit-app-region: no-drag
}
.toolbar input{
  -webkit-app-region: no-drag
}
// #browser-view{
//   width:100%;
//   background-color: black;
//   opacity: 0.5;
// }
.sidebar-collapsed {
  width:50px !important;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "notes"
    "settings"
    "style-op"
    "click-through";
}
.sidebar-open {
  width:200px !important;
  grid-template-rows: 0.2fr 1.8fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "notes settings style-op click-through exit-side"
    "component-info component-info component-info component-info component-info";
}
.sidebar{
  display: grid;
  background-color: whitesmoke;
}
.notes { grid-area: notes; }
.settings { grid-area: settings; }
.style { grid-area: style-op; }
.click-through { grid-area: click-through; }
.component-info{grid-area: component-info; }
</style>
