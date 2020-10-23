<template>
  <div class="flex flex-row h-8 items-center justify-center">
    <div class="">
      <h1 class="text-gray-700 font-bold tracking-wide">Notes</h1>
    </div>
    <button class="text-gray-700 ml-2" @click="save" v-show="!list">
      <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    </button>
  </div>
  <div class="flex flex-grow justify-center">
    <div class="flex flex-col w-full items-center" v-show="list">
      <div class="w-4/5 h-6 mb-2 bg-gray-600 text-center text-white" v-for="item in notes" :key="item.key">
      <button class="bg-gray-600 focus:outline-none" @click="updateNote(item)">
        {{ item.text }}
      </button>
      </div>
      <div class="w-4/5 h-6 bg-gray-600 items-center text-white">
        <button class="bg-gray-600 text-white" @click="list=false">
            <svg class="pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </button>
        Add
      </div>
    </div>
    <div class="flex flex-col">
      <input type="text" class="bg-gray-100 focus:outline-none h-6" placeholder="Title" v-model="title" v-show="!list"/>
      <hr class="w-4/5 bg-gray-600"/>
      <textarea class="bg-gray-100 focus:outline-none resize-none text-sm" v-model="note" v-show="!list" placeholder="Take a note..."></textarea>
    </div>
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
      nextNotesId: 0
    }
  },
  methods: {
    save () {
      this.list = true
      if (this.note.length !== 0 && this.note.length !== 0) {
        this.notes.push({ id: this.nextNotesId++, title: this.title, text: this.note })
        this.note = ''
        this.title = ''
      }
    },
    updateNote (u) {
      this.list = false
      this.note = u.text
      this.title = u.title
    }
  }
}
</script>
