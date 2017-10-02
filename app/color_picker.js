class ColorPicker {
				constructor(colorContainer){
								this.colorContainer = colorContainer
								this.configureContainer(colorContainer)

								this.subscribers = [];
								this.setSelected('black')
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
								if (!target.classList.contains('gui-color'))
									return;


								this.removeSelected()
								this.setSelected(target.getAttribute('id'))
				}
				setSelected(color){
								this.color = color
								const { children } = this.colorContainer

								Array.prototype.find.call(
									children, c => c.getAttribute('id') == color
								)
								.classList
								.add('selected')

								this.emit();
				}
				removeSelected(){
								Array.prototype.forEach.call(
									this.colorContainer.children,
									c => c.classList.remove('selected')
								);
				}
}

export default ColorPicker;
