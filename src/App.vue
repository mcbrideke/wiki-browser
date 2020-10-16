<template>
  <nav class="navbar">
    <button v-on:click="back"><i class="material-icons md-light">arrow_back</i></button>
    <button v-on:click="forward"><i class="material-icons md-light">arrow_forward</i></button>
    <button v-on:click="note"><i class="material-icons md-light">note_add</i></button>
    <button v-on:click="minimize"><i class="material-icons md-light">minimize</i></button>
    <button v-on:click="close"><i class="material-icons md-light">close</i></button>
  </nav>
  <div id="search" ref="search">
  </div>
</template>
<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  mounted () {
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount () {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      const dimensions = {
        x: document.getElementById('search').getBoundingClientRect().x,
        y: document.getElementById('search').getBoundingClientRect().y,
        width: document.getElementById('search').getBoundingClientRect().width,
        height: document.getElementById('search').getBoundingClientRect().height
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
    note () {
      console.log('note')
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
#app {
  height: 100%;
  background-color: transparent;
  opacity: 0.3;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 1.8fr;
    grid-template-areas:
    "item-nav"
    "item-content";
}
html, body {
  margin:0;
  height: 100%;
  box-sizing: border-box;
  background-color: transparent;
}
#search {
  grid-area: item-content;
  display: flex;
}
.navbar {
  -webkit-app-region: drag;
  grid-area: item-nav;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.navbar button {
  -webkit-app-region: no-drag
}
</style>
