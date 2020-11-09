<template>
  <div class="h-8">
    <div class="flex flex-row">
      <div class="flex w-1/5 justify-center items-center">
        <button class="focus:outline-none w-6 h-6 text-center rounded-full" @click="save" v-show="!list" :class="[`text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]">
          <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div class="flex justify-center w-3/5">
        <h1 class="font-bold tracking-wide select-none" :class="[`text-${color}-${currentMode.icon}`]">Notes</h1>
      </div>
      <div class="flex w-1/5 justify-center items-center">
        <button class="focus:outline-none w-6 h-6 text-center rounded-full" @click="deleteNote" v-show="!list" :class="[`text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        </button>
      </div>
    </div>
  </div>
  <div class="flex flex-grow">
    <div class="flex flex-col w-full" v-show="list">
      <div class="mx-auto select-none" v-if="!notes.length" :class="[`text-${color}-${currentMode.icon}`]">No notes</div>
      <div class="flex flex-col w-full ml-4 mb-2 cursor-pointer" v-show="list" v-for="item in notes" :key="item.id" @click="updateNote(item)">
        <div>
          <div class="flex h-auto justify-start ml-2 font-bold"  :class="[`text-${color}-${currentMode.icon}`]">
              {{ shorten(item.title) }}
          </div>
           <div class="flex h-auto justify-start ml-4 text-xs " :class="[`text-${color}-${currentMode.icon}`]">
              {{ shorten(item.text) }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-5/6 h-full m-auto" v-show="!list">
      <input type="text" class="focus:outline-none h-6 font-bold" :class="[`bg-${color}-${currentMode.sidebarBg} text-${color}-${currentMode.icon} placeholder-${color}-800`]" placeholder="Title" v-model="title" ref="title"/>
      <textarea class="focus:outline-none resize-none text-sm h-full" :class="[`bg-${color}-${currentMode.sidebarBg} text-${color}-${currentMode.icon} placeholder-${color}-600`]" v-model="note" placeholder="Take a note..."></textarea>
    </div>
  </div>
  <div class="flex h-6 justify-end items-center pr-2 pb-2">
     <button class="w-6 h-6 rounded-full focus:outline-none " @click="newNote" v-show="list && notes.length < 5" :class="[`text-${color}-${currentMode.icon} hover:bg-${color}-${currentMode.hover}`]">
        <svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: 'Notes',
  props: ['color', 'currentMode'],
  data () {
    return {
      list: true,
      note: '',
      title: '',
      notes: [],
      nextNotesId: 0,
      activeId: -1
    }
  },
  methods: {
    newNote () {
      this.list = false
      this.$nextTick(() => this.$refs.title.focus())
    },
    save () {
      this.list = true
      if (this.activeId !== -1 && (this.note.length !== 0 || this.title.length !== 0)) {
        const objIndex = this.notes.findIndex(obj => obj.id === this.activeId)
        const updatedObj = { ...this.notes[objIndex], title: this.title, text: this.note }
        const updatedNotes = [
          ...this.notes.slice(0, objIndex),
          updatedObj,
          ...this.notes.slice(objIndex + 1)
        ]
        this.notes = updatedNotes
        this.note = ''
        this.title = ''
        this.activeId = -1
      } else if (this.note.length !== 0 || this.title.length !== 0) {
        this.notes.push({ id: this.nextNotesId++, title: this.title, text: this.note })
        this.note = ''
        this.title = ''
      }
    },
    updateNote (u) {
      this.list = false
      this.note = u.text
      this.title = u.title
      this.activeId = u.id
      this.$nextTick(() => this.$refs.title.focus())
    },
    shorten (n) {
      if (n.length > 10) {
        return `${n.substring(0, 10)}...`
      }
      return n
    },
    deleteNote () {
      this.list = true
      if (this.activeId !== -1) {
        const index = this.activeId
        this.notes = this.notes.filter(note => note.id !== index)
        this.note = ''
        this.title = ''
        this.activeId = -1
      } else {
        this.note = ''
        this.title = ''
      }
    }
  }
}
</script>
