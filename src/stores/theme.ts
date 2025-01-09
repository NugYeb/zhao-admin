import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Themes } from 'md-editor-v3'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<string>('dark')

  const theme = computed(() => currentTheme.value)

  const editTheme= computed<Themes>(() => {
    return theme.value === 'dark' ? 'dark' : 'light'
  })

  function setTheme(newTheme: string) {
    if (newTheme === 'dark') {
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      document.body.removeAttribute('arco-theme')
    }
    currentTheme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  const initTheme = () => {
    const storedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(storedTheme)
    currentTheme.value = storedTheme
  }

  return {
    theme,
    editTheme,
    initTheme,
    setTheme,
  }
})
