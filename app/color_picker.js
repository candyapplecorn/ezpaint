class ColorPicker {
				constructor(container, className, initSelect){
								this.container = container
								this.configureContainer(container)

								this.subscribers = [];
								this.setSelected(initSelect)
								this.className = className
				}
				emit(){
					this.subscribers.forEach(s => {
						s(this)
					})
				}
				configureContainer(container){
								container.addEventListener('click',
																this.handleClick.bind(this))
				}
				handleClick(e){
								e.stopPropagation();
								const { target } = e;
								if (!target.classList.contains(this.className))
									return;


								this.removeSelected()
								this.setSelected(target.getAttribute('id'))
				}
				setSelected(value){
								this.value = value
								const { children } = this.container

								Array.prototype.find.call(
									children, c => c.getAttribute('id') == value
								)
								.classList
								.add('selected')

								this.emit();
				}
				removeSelected(){
								Array.prototype.forEach.call(
									this.container.children,
									c => c.classList.remove('selected')
								);
				}
}

export default ColorPicker;
