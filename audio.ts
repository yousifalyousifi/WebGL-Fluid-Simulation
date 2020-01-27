/**
 * Audio support
 */

import createAnalyzer, { WebAudioAnalyzer } from 'web-audio-analyser'
import SoundcloudBadge, { SoundcloudBadgeOptions } from './soundcloud-badge'

function SoundcloudBadgePromise(
  opts: SoundcloudBadgeOptions
): Promise<{ src: string; data: unknown; div: HTMLDivElement }> {
  return new Promise((resolve, reject) => {
    SoundcloudBadge(opts, (err, src, data, div) => {
      if (err) {
        return reject(err)
      }

      resolve({
        src,
        data,
        div,
      })
    })
  })
}

export class SongPlayer {
  audio = new Audio()
  div: HTMLDivElement | undefined = undefined
  analyzer: WebAudioAnalyzer | undefined = undefined

  constructor() {
    this.audio.crossOrigin = 'Anonymous'
    this.audio.addEventListener('ended', () => {
      console.log('looping da soundz')
      this.audio.currentTime = 0
      this.audio.play()
    })
  }

  async setSoundcloudUrl(song: string) {
    // Stop
    if (this.div) {
      this.div.remove()
      this.div = undefined
    }
    this.audio.currentTime = 0
    this.audio.src = ''

    // Load data
    const { src, div } = await SoundcloudBadgePromise({
      // Soundcloud isn't accepting new API access requests!?
      // Stolen from http://hughsk.io/moire-1/,
      client_id: 'ded451c6d8f9ff1c62f72523f49dab68',
      song,
      dark: false,
      getFonts: true,
    })
    this.audio.src = src
    this.audio.play()

    this.div = div

    // Go
    if (!this.analyzer) {
      this.analyzer = createAnalyzer(this.audio)
    }
  }
}
