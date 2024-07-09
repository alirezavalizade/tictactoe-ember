import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { createActor } from 'xstate';
import { ticTacToeMachine } from '../machines/tic-tac-toe-machine';

export default class TictacService extends Service {
  @tracked state;
  @tracked context;
  actor;

  constructor() {
    super(...arguments);

    this.actor = createActor(ticTacToeMachine).start();
    this.state = this.actor.getSnapshot();
    this.context = this.state.context;

    this.actor.subscribe((state) => {
      console.log(state);

      this.state = state;
      this.context = state.context;
    });
  }

  send(params) {
    this.actor.send(params);
  }

  matches(params) {
    return this.state.matches(params);
  }
}
