import assert from 'node:assert';
import expected from './users.json' with { type: 'json' };

(async () => {
  const response = await fetch('http://localhost:3000');
  const users = await response.json();

  assert.deepEqual(users, expected);
})();
