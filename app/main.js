import SubscribableSlider from './subscribable_slider';
import SelectableList from './selectable_list';
import Easle from './easle';
import splash from './splash'
import ClearOverlay from './clear';

document.addEventListener('DOMContentLoaded', e => {
				const bottomGUI  = document.getElementById('bottom-gui');
				const topGUI = document.querySelector('#brush-types');
				const toolSize = document.querySelector('input[type="range"]')

				const colorPicker = new SelectableList(bottomGUI, 'gui-color', 'black');
				const toolPicker = new SelectableList(topGUI, 'brush-type', 'circle')
				const slider = new SubscribableSlider(toolSize);

				const easle = new Easle({
					canvas: document.getElementById('canvas'),
					colorPicker,
					toolPicker,
					slider
				});

				// Add event listeners to splash screen so it may be closed.
				splash();
				new ClearOverlay(easle.clear.bind(easle))

				window.ColorPicker = colorPicker
				window.Easle = easle
});
