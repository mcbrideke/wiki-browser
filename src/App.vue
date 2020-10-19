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
        <nav>
          <button @click="note"><i class="material-icons md-light">note_add</i></button>
          <button ><i class="material-icons md-light">settings</i></button>
          <button ><i class="material-icons md-light">style</i></button>
          <button ><i class="material-icons md-light">gamepad</i></button>
          <button @click="collapsed = !collapsed"><i class="material-icons md-light">add</i></button>
        </nav>
        <div>blah blah</div>
    </div>
    <div id="browser-view"></div>
  </div>
</template>
<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data () {
    return {
      url: '',
      collapsed: false,
      sidebarOpen: 'sidebar-open',
      sidebarCollapsed: 'sidebar-collapsed',
      sidebar: 'sidebar'
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
    note () {
      console.log(this.collapsed)
    },
    minimize () {
      console.log('minimize')
    },
    close () {
      window.ipcRenderer.send('close-app')
    }
  }
  // components: {
  //   HelloWorld
  // }
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
  width:50px;
}
.sidebar-open {
  width:200px;
}
.sidebar{
  min-width: 50px;
  display:flex;
  flex-direction: column;
  background-color: whitesmoke;
}
</style>
