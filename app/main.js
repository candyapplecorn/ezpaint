import ColorPicker from './color_picker'
import Easle from './easle'

document.addEventListener('DOMContentLoaded', e => {
				const bottomGUI  = document.getElementById('bottom-gui');
				const colorPicker = new ColorPicker(bottomGUI);
				const easle = new Easle({
					canvas: document.getElementById('canvas'),
					colorPicker
				});

				window.ColorPicker = colorPicker
				window.Easle = easle 
});
