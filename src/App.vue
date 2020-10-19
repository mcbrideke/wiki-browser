<template>
  <nav class="toolbar">
      <button v-on:click="back"><i class="material-icons md-light">arrow_back</i></button>
      <button v-on:click="forward"><i class="material-icons md-light">arrow_forward</i></button>
      <button v-on:click="note"><i class="material-icons md-light">note_add</i></button>
      <input v-model="url" placeholder="" />
      <button v-on:click="minimize"><i class="material-icons md-light">minimize</i></button>
      <button v-on:click="close"><i class="material-icons md-light">close</i></button>
  </nav>
  <div id="browser-view">
  </div>
  <!-- <div class="side-nav">
  </div> -->
</template>
<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data () {
    return { url: '' }
  },
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
  height:100%;
  display:flex;
}
// #app {
//   height: 100%;
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   display: grid;
//     grid-template-columns: 1fr;
//     grid-template-rows: 0.2fr 1.8fr;
//     grid-template-areas:
//     "item-nav"
//     "item-content";
// }
html, body {
  margin: 0;
  height: 100%;
}
// #search {
//   grid-area: item-content;
//   display: flex;
// }
#browser-view {
  height: 100%;
}
.toolbar {
  -webkit-app-region: drag;
  grid-area: item-nav;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(6, 48, 58);
}
.toolbar button{
  -webkit-app-region: no-dragS
}
.toolbar input{
  -webkit-app-region: no-drag
}

</style>
