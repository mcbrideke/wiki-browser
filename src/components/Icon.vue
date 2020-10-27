<template>
    <svg
      class="pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="path[icon]"
      />
    </svg>
</template>
<script>
export default {
  name: 'Icon',
  data () {
    return {
      path: {
        plus: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
        back: 'M10 19l-7-7m0 0l7-7m-7 7h18',
        forward: 'M14 5l7 7m0 0l-7 7m7-7H3',
        magnify: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        minimize: 'M20 12H4',
        exit: 'M6 18L18 6M6 6l12 12',
        note: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        style: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
        click: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
        chevL: 'M15 19l-7-7 7-7'
      }
    }
  },
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>
