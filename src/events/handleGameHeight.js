import Utils from '../utils/utils';

Utils.debounce.on('resize', handleGameHeight);

function handleGameHeight() {
	let game = document.getElementById('game');
	if (game) {
		requestAnimationFrame(() => {
			game.style.height = window.innerHeight + 'px';
		});
	}
}

export default handleGameHeight;