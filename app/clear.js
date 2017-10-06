class ClearOverlay {
  constructor(clearFunc){
    this.clearFunc = clearFunc;
    this.overlay = document.getElementById('clear-prompt-modal')
    this.button = document.querySelector('#file-options div:nth-child(2)')
    this.cancelButton = document.getElementById('clear-prompt-cancel')
    this.clearButton = document.getElementById('clear-prompt-delete')
    this.clear = this.clear.bind(this)
    this.close = this.close.bind(this)
    this.configureContainer()
  }

  configureContainer(){
    const {
      button, open, close, cancelButton, clearButton, clear
    } = this;

    button.addEventListener('click', open.bind(this))
    cancelButton.addEventListener('click', close.bind(this))
    clearButton.addEventListener('click', () => (clear(), close()));

    window.addEventListener('keydown', e =>
      (e.keyCode === 27) && close()
    )
  }

  close(){ this.overlay.style.display = "none" }
  open(){ this.overlay.style.display = "flex" }
  clear(){ this.clearFunc() }
}

export default ClearOverlay;
