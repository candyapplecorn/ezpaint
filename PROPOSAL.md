# Why a painter program?

1. The initial hurdles can be done in four days.
  * Make a GUI (html + css + JS event listeners)
    * Color Picker
      * 3 primary + 3 secondary + black & white
    * Brush size
      * Use an [HTML slider](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)
  * Have the GUI control the canvas
    * The user should be able to paint
2. Extra features will be easy to add. I'll be able to use all of my extra time to add bonus features like:
  * Paintbucket tool
  * Spraybrush tool
  * External image loading from URL (image -> canvas)
  * Exporting canvas as image (canvas API)
  * Brush types (Square, Triangle, Star, ???)
3. **bonus**: Mobile Friendly... probably
  * It's probably possible to make the GUI usable via phone
    * Some phones activate their histories by swiping the webpage, I don't have a solution yet!
  * ```@media``` queries to go from a boxy layout to a portrait one

I think I can get it working within four days, and use all the spare time I have to make it nicer. I am specifically thinking a **paint** program, not a **vector graphics** program, so painting will **not** be implemented by storing lines. This means no undo/redo functionality.

## Technologies involved

* HTML
  * I could try making the entire application in Canvas
  * However it would be much easier to build it using HTML. I'm already using HTML.
  * An HTML GUI would be much easier to manage as it's affected by CSS.
* CSS
* Javascript
  * I shouldn't need any libraries, not even jQuery.


* **bonus**: Webstorage, probably localstorage, for saving images.
  * They'd probably be turned into png/jpg's and then stored.
  * Could be used for autosave?

## MVP's

* A GUI which lets the user pick colors and brush size
* A canvas element which allows the user to paint
* Flood Fill
  * Is a bonus but would be really cool and adds something to talk about

## Timeline

### Monday
  * Set up all files + webpack
  * Get color picker working
    * Event listeners - should be able to log current color to console
  * Get brush size selector working
    * Event listeners - should be able to log current brush size to console

### Tuesday
  * Should be able to select color and brush size and be able to draw to canvas by noon.
  * Bonus features:
    * Begin working on Bucket tool

### Wednesday
  * Bonus features:
    * Finish Bucket (Flood Fill)
  * File download / upload
    * Bonus-Bonus: From URL?

### Thursday
  * Finish up Styling with CSS
  * Bonus:
    * ```@media``` for mobile
