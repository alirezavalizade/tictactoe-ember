import { module, test } from 'qunit';
import { setupTest } from 'ff/tests/helpers';

module('Unit | Service | tictac', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:tictac');
    assert.ok(service);
  });
});
