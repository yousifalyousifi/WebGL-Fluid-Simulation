declare module 'web-audio-analyser' {
  export type AudioAnalyzerInput = HTMLAudioElement | AudioNode
  export type Left = 0
  export type Right = 1
  export interface WebAudioAnalyzer {
    waveform(outArray?: Uint8Array, channel?: Left | Right): Uint8Array
    frequencies(outArray?: Uint8Array, channel?: Left | Right): Uint8Array
  }
  function webAudioAnalyzer(
    audio: AudioAnalyzerInput,
    ctx?: AudioContext,
    options?: {
      stereo?: true
      audible?: false
    }
  ): WebAudioAnalyzer
  export default webAudioAnalyzer
}
