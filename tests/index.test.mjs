import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('orthogonal equator', () => {
  assert.equal(api.angularSeparation(0, 0, 90, 0), 90);
});
test('antipodes', () => {
  assert.equal(api.angularSeparation(0, 0, 180, 0), 180);
});
test('same coordinate', () => {
  assert.equal(api.angularSeparation(20, 30, 20, 30), 0);
});
test('near identical', () => {
  assert.ok(Math.abs(api.angularSeparation(0, 0, 1e-9, 0) - 1e-9) < 1e-20);
});
test('invalid declination', () => {
  assert.throws(() => api.angularSeparation(0, 91, 0, 0));
  assert.throws(() => api.angularSeparation(NaN, 0, 0, 0));
});
test('meridian and symmetry', () => {
  for (let d = -80; d <= 80; d += 5) {
    assert.ok(Math.abs(api.angularSeparation(0, 0, 0, d) - Math.abs(d)) < 1e-12);
    assert.equal(api.angularSeparation(20, 30, 50, d), api.angularSeparation(50, d, 20, 30));
  }
});
