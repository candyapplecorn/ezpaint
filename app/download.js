class DownloadOverlay {
  constructor(){
    this.canvas = document.querySelector('canvas');
    this.button = document.querySelector('#file-options div:nth-child(1)')
    this.configureContainer()
  }

  configureContainer(){
    const { button, download } = this
    button.addEventListener('click', download.bind(this), false)
  }

  download(){
    const { canvas } = this;
    const url = canvas.toDataURL('img/jpeg'), d = new Date();

    // canvas.setAttribute(
    //   'download',
    //   d.toLocaleDateString() +
    //   d.toLocaleTimeString().replace(/ PM/, "") +
    //   '.jpg'
    // )

    window.location = url;
  }
}

export default DownloadOverlay;
