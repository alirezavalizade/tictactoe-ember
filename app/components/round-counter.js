import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class GameStatusComponent extends Component {
  @service('tictac') tictacService;
}
