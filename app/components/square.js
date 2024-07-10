import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SquareComponent extends Component {
  @service('tictac') tictacService;

  @tracked player = this.args.player;
  @tracked index = this.args.index;

  get isFinished() {
    return this.tictacService.matches('finished');
  }

  get selectedClasses() {
    if (this.player) {
      if (
        this.isFinished &&
        this.tictacService.context.winningLine.includes(this.index)
      ) {
        return 'bg-green-500 shadow-2xl shadow-green-500';
      }

      if (this.player === 'X') {
        return 'bg-red-500 text-white shadow-lg';
      }

      if (this.player === 'O') {
        return 'bg-yellow-500 text-white shadow-lg';
      }
    }

    return 'bg-white hover:bg-white/90';
  }

  @action
  handleClick() {
    if (!this.player) {
      this.tictacService.send({ type: 'MOVE', index: this.args.index });
    }
  }
}
