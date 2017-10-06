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
    const url = canvas.toDataURL(), d = new Date()

    const link = document.createElement('a');
    link.download = "ezpaint_";
    link.download += d.toLocaleDateString() +
                     d.toLocaleTimeString().replace(/ /, '') +
                     ".png";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}



export default DownloadOverlay;
