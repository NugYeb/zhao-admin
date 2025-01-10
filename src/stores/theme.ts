import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Themes } from 'md-editor-v3'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<string>('dark')

  const theme = computed(() => currentTheme.value)

  const isDark = computed(() => theme.value === 'dark')

  const editTheme = computed<Themes>(() => {
    return theme.value === 'dark' ? 'dark' : 'light'
  })

  const setTheme = (newTheme: string) => {
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
    isDark,
    editTheme,
    initTheme,
    setTheme,
  }
})
