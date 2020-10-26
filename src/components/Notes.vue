<template>
  <div class="h-8">
    <div class="flex flex-row">
      <div class="flex w-1/5 justify-center items-center">
        <button class="text-gray-700 focus:outline-none w-6 h-6 text-center hover:bg-gray-400 rounded-full" @click="save" v-show="!list">
          <svg class="pointer-events-none w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div class="flex justify-center w-3/5">
        <h1 class="text-gray-700 font-bold tracking-wide">Notes</h1>
      </div>
    </div>
  </div>
  <div class="flex flex-grow">
    <div class="flex flex-col w-full" v-show="list">
      <div class="mx-auto text-gray-600" v-if="!notes.length" >No notes</div>
      <div class="flex flex-col w-full ml-4 mb-2 cursor-pointer" v-show="list" v-for="item in notes" :key="item.id" @click="updateNote(item)">
          <div class="flex h-auto justify-start ml-2 text-gray-600 font-bold" >
              {{ item.title }}
          </div>
           <div class="flex h-auto justify-start ml-4 text-xs text-gray-500 ">
              {{ item.text }}
          </div>
          <div>
            <hr class="w-4/5 bg-gray-600"/>
          </div>
      </div>
    </div>
    <div class="flex flex-col w-5/6 h-full m-auto" v-show="!list">
      <input type="text" class="bg-gray-100 focus:outline-none h-6 text-gray-700 font-bold" placeholder="Title" v-model="title"/>
      <hr class="w-full bg-gray-600"/>
      <textarea class="bg-gray-100 focus:outline-none resize-none text-gray-600 text-sm h-full" v-model="note" placeholder="Take a note..."></textarea>
    </div>
  </div>
  <div class="flex h-6 justify-end items-center pr-2 pb-2">
     <button class="w-6 h-6 rounded-full text-gray-700 focus:outline-none hover:bg-gray-400 " @click="list=false" v-show="list">
        <svg class="pointer-events-none w-6 h-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: 'Notes',
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
    save () {
      this.list = true
      if (this.activeId !== -1) {
        console.log('this ran')
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
        console.log('no this ran')
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
    }
  }
}
</script>
