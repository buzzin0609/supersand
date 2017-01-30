import React, { Component } from 'react';
import Scene from '../scene/Scene';
import GameLoop from '../gameloop/GameLoop';
import GameState from '../shared/GameState';
import walls from './gameObstacles';
import Goon from '../actor/Enemy/Goon';
import GameControls from '../gameControls/GameControls';


export default class Game extends Component {

	componentWillMount() {
		console.log(GameState.character, 'about to mount actor');
	}

	componentDidMount() {
		console.log('mounted game');
		GameLoop.start.call(GameLoop);
	}

	componentWillUnmount() {
		GameLoop.stop.call(GameLoop);
	}

	render() {
		return (
			<div className="wrapper">
				<div id="game">
					<Scene
						id="game-scene"
						actors={[GameState.character]}
						enemies={[Goon(), Goon(), Goon(), Goon(), Goon(), Goon()]}
						obstacles={walls}
						width="800"
						height="450"
						 />
				</div>
				<GameControls />
			</div>
		)
	}

}



(function() {

	var myVar;

	function myFunc() {
		myVar = 2;
	}

	function myFunc2() {
		var somethingwithMyVar = 3 + myVar;
	}

	myFunc();
	myFunc2();


}());
