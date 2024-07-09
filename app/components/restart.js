import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class RestartComponent extends Component {
  @service('tictac') tictacService;

  get isFinished() {
    return this.tictacService.matches('finished');
  }

  get isDraw() {
    return this.tictacService.matches('draw');
  }

  get isWaitingForRestart() {
    return this.isFinished || this.isDraw;
  }

  @action
  handleClick() {
    this.tictacService.send({ type: 'RESTART' });
  }
}
