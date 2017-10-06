class SubscribableSlider {
  constructor($input){
    this.input = $input
    this.subscribers = []
    $input.addEventListener('change', this.onChange.bind(this))
    this.value = $input.value
    this.configureContainer();
  }

  configureContainer(){
    const { input } = this;

    document.getElementById('small').addEventListener('click', e => {
      input.value = "10"
      this.onChange({ target: { value: input.value }})
    })

    document.getElementById('large').addEventListener('click', e => {
      input.value = "50"
      this.onChange({ target: { value: input.value }})
    })
  }

  onChange(e){
    this.value = e.target.value
    this.emit()
  }

  emit(){
    this.subscribers.forEach(s => {
      s(this)
    })
  }
}

export default SubscribableSlider
