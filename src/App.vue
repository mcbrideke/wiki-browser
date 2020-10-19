<template>
  <nav class="toolbar">
      <button @click="back"><i class="material-icons md-light">arrow_back</i></button>
      <button @click="forward"><i class="material-icons md-light">arrow_forward</i></button>
      <input v-model="url" placeholder="" />
      <button @click="minimize"><i class="material-icons md-light">minimize</i></button>
      <button @click="close"><i class="material-icons md-light">close</i></button>
  </nav>
  <div class="main">
    <div :class="[collapsed ? sidebarOpen : sidebarCollapsed, sidebar]">
        <button class="notes" @click="notes"><i class="material-icons sm-light">note_add</i></button>
        <button class="settings" @click="settings"><i class="material-icons sm-light">settings</i></button>
        <button class="style-op" @click="styles"><i class="material-icons sm-light">style</i></button>
        <button class="click-through" @click="clickThrough"><i class="material-icons sm-light">gamepad</i></button>
        <button class="exit-side" v-show="collapsed" @click="collapsed = false"><i class="material-icons sm-light">fullscreen_exit</i></button>
        <div class="component-info" v-show="collapsed"><component v-bind:key="tab" v-bind:is="currentTabComponent"></component></div>
    </div>
    <div id="browser-view"></div>
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
      collapsed: false,
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
      console.log(dimensions)
      window.ipcRenderer.send('resize-view', dimensions)
    },
    back () {
      window.ipcRenderer.send('go-back')
    },
    forward () {
      window.ipcRenderer.send('go-forward')
    },
    notes () {
      this.collapsed = true
    },
    minimize () {
      console.log('minimize')
    },
    close () {
      window.ipcRenderer.send('close-app')
    },
    clickThrough () {
      console.log('click-through')
    },
    settings () {
      this.collapsed = true
    },
    styles () {
      this.collapsed = true
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
  width:100%;
  height:100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr;
  grid-template-areas:
  "toolbar"
  "browser";
}
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
#browser-view{
  width:100%;
}
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
