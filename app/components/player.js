import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class PlayerComponent extends Component {
  @service('tictac') tictacService;
}
