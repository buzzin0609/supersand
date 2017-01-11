import Events from './Events';
import GameState from '../shared/GameState';
import GameLoop from '../gameloop/GameLoop';
import On from '../utils/On';

Events.on('keydown', handlePause);

function handlePause(e) {
	if (e.key === 'p' && GameState.hasStarted) {
		if (GameLoop.running) {
			GameLoop.stop();
			On.trigger('setView', 'pause');
		} else {
			GameLoop.start();
			On.trigger('setView', 'game');
		}

	}
}
