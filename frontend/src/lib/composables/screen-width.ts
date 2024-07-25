import { ref, onMounted, onUnmounted } from 'vue'

export function useScreenWidth() {
  const LG_SCREEN_SIZE = 1024
  const SM_SCREEN_SIZE = 640
  const widthScreen = ref(window.innerWidth)

  const handleResize = () => {
    widthScreen.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize, true)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize, true)
  })

  return { widthScreen, LG_SCREEN_SIZE, SM_SCREEN_SIZE }
}
