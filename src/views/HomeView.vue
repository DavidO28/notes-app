<template>
  <main
    class="w-9/12 m-auto"
    :theme="theme"
  >
    <header class="my-3 flex flex-row justify-between items-center">
      <v-btn
        :icon="
          currentTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="toggleTheme"
      />
      <h1 class="font-bold text-3xl">Notes</h1>
      <v-btn
        @click="toggleModal"
        icon="mdi-plus"
        size="large"
        :color="currentTheme === 'light' ? 'black' : 'white'"
      />
    </header>
    <v-dialog
      v-model="modal"
      width="1024px"
      opacity="0.8"
    >
      <v-card>
        <v-snackbar
          v-model="errorState"
          timeout="2000"
          rounded="pill"
          color="red"
        >
          <p class="font-bold text-black text-center">
            {{ errorMessage }}
          </p>

          <template v-slot:actions>
            <v-btn
              color="gray"
              variant="text"
              @click="errorState = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-textarea
          v-model.trim="newNote"
          label="Add new note"
          prepend-inner-icon="mdi-comment"
          cols="30"
          rows="10"
        ></v-textarea>
        <v-card-actions class="flex flex-row justify-center gap-5">
          <v-btn
            @click="addNote"
            icon="mdi-plus-circle"
            color="green"
            size="x-large"
          />
          <v-btn
            @click="toggleModal"
            icon="mdi-close"
            color="red"
            size="x-large"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container class="flex flex-wrap">
      <v-card
        v-for="note in savedNotes"
        :key="note.id"
        class="ma-2 pa-2"
        :style="{ backgroundColor: note.backgroundColor }"
      >
        <p class="text-lg">{{ note.text }}</p>
        <div class="mt-5 flex flex-row justify-between items-center text-sm">
          <p>{{ note.date }}</p>
        </div>
      </v-card>
    </v-container>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useTheme } from 'vuetify'

  type Note = {
    id: number
    text: string
    date: string
    backgroundColor: string
  }

  const newNote = ref<string>('')
  const savedNotes = ref<Note[]>([])
  const errorState = ref<boolean>(false)
  const errorMessage = ref<string>('')
  const modal = ref<boolean>(false)
  const currentTheme = ref('light')

  const theme = useTheme()

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      currentTheme.value = savedTheme
      theme.global.name.value = savedTheme
    } else {
      currentTheme.value = 'light'
      theme.global.name.value = 'light'
    }
  })

  function toggleTheme() {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    theme.global.name.value = newTheme
    currentTheme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  const toggleModal = () => {
    modal.value = !modal.value
    errorState.value = false
    newNote.value = ''
    errorMessage.value = ''
  }

  const getRandomColor = () => {
    const color = 'hsl(' + Math.random() * 360 + ', 100%, 75%'
    return color
  }

  const addNote = () => {
    if (newNote.value!.length < 1) {
      errorState.value = true
      return (errorMessage.value = "Empty text can't be added to notes")
    }
    savedNotes.value!.unshift({
      id: Math.floor(Math.random() * 1000000),
      text: newNote.value!,
      date: new Date().toLocaleDateString(),
      backgroundColor: getRandomColor(),
    })
    toggleModal()
    errorMessage.value = ''
  }
</script>
