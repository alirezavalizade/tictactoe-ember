import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class GameBoardComponent extends Component {
  @service('tictac') tictacService;
}
