import Utils from './utils';

export default function random(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
   return Math.random() * (max - min) + min;
}

Utils.register('random', random);
Utils.register('randomFloat', randomFloat);
