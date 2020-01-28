/**
 * Audio support
 */

import createAnalyzer, { WebAudioAnalyser } from 'web-audio-analyser'
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

const fftSize = 256

export class SongPlayer {
  audio = new Audio()
  div: HTMLDivElement | undefined = undefined
  analyzer: WebAudioAnalyser | undefined = undefined
  freq: AudioArrays | undefined
  wav: AudioArrays | undefined

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
      const analyzer = createAnalyzer(this.audio)
      analyzer.analyser.fftSize = fftSize
      console.log('freq bin count', analyzer.analyser.frequencyBinCount)
      this.wav = new AudioArrays(analyzer.analyser.frequencyBinCount)
      this.freq = new AudioArrays(analyzer.analyser.frequencyBinCount)
      this.analyzer = analyzer
    }
  }

  update() {
    if (this.analyzer && this.wav && this.freq) {
      this.freq.swap()
      this.analyzer.frequencies(this.freq.current)
      this.wav.swap()
      this.analyzer.waveform(this.wav.current)
      return { wav: this.wav, freq: this.freq }
    }
    return undefined
  }
}

export class AudioArrays {
  constructor(public buckets: number) {}
  current = new Uint8Array(this.buckets)
  prev = new Uint8Array(this.buckets)
  swap() {
    const prev = this.current
    this.current = prev
    this.prev = prev
  }
}
