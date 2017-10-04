class SubscribableSlider {
  constructor($input){
    this.input = $input
    this.subscribers = []
    $input.addEventListener('change', this.onChange.bind(this))
    this.value = $input.value
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
