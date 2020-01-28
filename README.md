# WebGL Fluid Simulation (Typescript)

This repo is a fork of Pavel Dobryakov's WebGL fluid simulation.

My plan is:

- [x] Convert it to typescript, so it's easier to work with.
- [ ] Modularize the code, so it's easier to add new inputs.
  - It's faily easy to drop some code into the update loop as it is.
    I've decided not to rewrite things more.
- [ ] Drive simulation inputs from an event bus.
  - Going to do this last
- [x] Add a soundcloud music source
- [ ] Make some visualizers!

---

[Play here](https://justjake.github.io/WebGL-Fluid-Simulation/)

<img src="/screenshot.jpg?raw=true" width="880">

## References

http://developer.download.nvidia.com/books/HTML/gpugems/gpugems_ch38.html

https://github.com/mharrys/fluids-2d

https://github.com/haxiomic/GPU-Fluid-Experiments

## License

The code is available under the [MIT license](LICENSE)

---

## Developing

1. Install dependencies with `yarn install` or `npm install`
2. Start webpack: `yarn watch` or `npm run watch`
3. Start the server: `yarn serve` or `npm run serve`
4. Open the server in your browser of choice.

## Notes

The coordinate system puts 0, 0 in the bottom-left.

A "splat" puts a hunk of dye of a specific color into the simulation:

```
/**
 * Splat some dye into the simulation.
 * @param x - Center X coordinate. Float from 0 (left) to 1 (right)
 * @param y - Center Y coordinate. Float form 0 (bottom) to 1 (top)
 * @param dx - Horizontal force vector element, in pixels. Positive -> left, negative -> right.
 * @param dy - Vertical force vector element, in pixels. Positive -> top, negative -> bottom.
 * @param color - Color. Using { r, g, b } values >1 creates a larger splat. (or a larger bloom?).
 */
function splat(x: number, y: number, dx: number, dy: number, color?: Color, radius?: number) {
```

Try it in a chrome debugger:

`splat(0.5, 0.5, 500, 0, { r: 1, g: 0, b: 0 })`

### Music theory approach to visualizers

https://github.com/ccorcos/circle

[![Chet's visualizer](https://github.com/ccorcos/circle/raw/master/assets/linear-spread.png)](https://ccorcos.github.io/circle/?grid=true&mode=song&view=linear&overlap=false&sharpness=5.01&gain=1.00&hue=254.23&sweep=-36.65&radius=0.37&opacity=0.60)

* Note: you need to click on the browser canvas ASAP after opening this link or Chrome will stop audio from working.

### Audio from Soundcloude / Audio source

FFT stuff using Soundcloud and raw `new Audio()` API.

https://codepen.io/nfj525/pen/rVBaab

http://hughsk.io/moire-1/

https://www.npmjs.com/package/web-audio-analyser

```javascript
  if (analyser) {
    analyser.waveform(daudio)
    for (var i = 0, n = 0; i < 512; i++) {
      var o = faudio[n]
      var N = (daudio[i] - 127)
      faudio[n++] =
      faudio[n++] =
      faudio[n++] =
      faudio[n++] = o + (N - o) * 0.0025
    }
    taudio.setPixels(naudio)
  }
```

https://www.npmjs.com/package/soundcloud-badge

```javascript
var audio = new Audio

require('soundcloud-badge')({
    client_id: 'ded451c6d8f9ff1c62f72523f49dab68'
  , song: 'https://soundcloud.com/coltongorg/floating'
  , getFonts: true
}, function(err, src, data) {
  if (err) throw err

  audio.addEventListener('canplay', function() {
    if (analyser) return
    audio.play()
    analyser = Analyser(audio)
  }, false)

  audio.crossOrigin = 'Anonymous'
  audio.src = src
  audio.addEventListener('ended', function() {
    console.log('ended')
    audio.currentTime = 0
    audio.play()
  }, false)
})
```

### Visualizing Spotify

Spotify aparently publishes detailed song breakdowns including "danceability". 
Kaleidosync is based on that API data.

https://www.kaleidosync.com/

https://github.com/zachwinter/kaleidosync

https://github.com/zachwinter/spotify-viz
