import { ref, onMounted, onUnmounted } from 'vue'

export function useScreenWidth() {
  const LG_SCREEN_SIZE = 1024
  const widthScreen = ref(window.innerWidth)

  const handleResize = () => {
    widthScreen.value = window.innerWidth
  }

  onMounted(async () => {
    window.addEventListener('resize', handleResize, true)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize, true)
  })

  return { widthScreen, LG_SCREEN_SIZE }
}
