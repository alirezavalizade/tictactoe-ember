import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class GameStatusComponent extends Component {
  @service('tictac') tictacService;

  get isFinished() {
    return this.tictacService.matches('finished');
  }

  get isDraw() {
    return this.tictacService.matches('draw');
  }

  get gameStatus() {
    if (this.isFinished) {
      return `${this.tictacService.context.currentPlayer} wins!`;
    }

    if (this.isDraw) {
      return `Please restart the game`;
    }

    return `Next player: ${this.tictacService.context.currentPlayer}`;
  }
}
