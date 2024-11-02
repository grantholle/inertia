import { router, type PollOptions, type ReloadOptions } from '@inertiajs/core'
import { onDestroy, onMount } from 'svelte'

export default function usePoll(
  interval: number,
  requestOptions: ReloadOptions = {},
  options: PollOptions = {
    keepAlive: false,
    autoStart: true,
  },
): {
  stop: VoidFunction
  start: VoidFunction
  toggle: VoidFunction
  polling: () => boolean
} {
  const { stop, start, polling, toggle } = router.poll(interval, requestOptions, {
    ...options,
    autoStart: false,
  })

  onMount(() => {
    if (options.autoStart ?? true) {
      start()
    }
  })

  onDestroy(() => {
    stop()
  })

  return {
    stop,
    start,
    polling,
    toggle,
  }
}
