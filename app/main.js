import ColorPicker from './color_picker'
import Easle from './easle'

document.addEventListener('DOMContentLoaded', e => {
				const bottomGUI  = document.getElementById('bottom-gui');
				const topGUI = document.querySelector('#brush-types');

				const colorPicker = new ColorPicker(bottomGUI, 'gui-color', 'black');
				const toolPicker = new ColorPicker(topGUI, 'brush-type', 'circle')

				const easle = new Easle({
					canvas: document.getElementById('canvas'),
					colorPicker,
					toolPicker
				});

				window.ColorPicker = colorPicker
				window.Easle = easle
});
