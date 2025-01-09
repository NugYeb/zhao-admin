import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<string>('dark')

  const theme = computed(() => currentTheme.value)

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
    initTheme,
    setTheme,
  }
})
