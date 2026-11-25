import test from "node:test";
import assert from "node:assert/strict";
import {
  GROUND_Y,
  PING_HEIGHT,
  PING_X,
  checkCollision,
  createInitialState,
  formatHud,
  stepRunner,
  triggerJump,
} from "./packet-runner-engine";

test("initial state stays idle and preserves best score", () => {
  const state = createInitialState(42);
  assert.equal(state.phase, "idle");
  assert.equal(state.best, 42);
  assert.equal(state.py, GROUND_Y - PING_HEIGHT);
});

test("game does not advance while idle", () => {
  const initial = createInitialState(10);
  const next = stepRunner(initial, 1);
  assert.deepEqual(next, initial);
});

test("first jump starts run from idle", () => {
  const idle = createInitialState(15);
  const started = triggerJump(idle);
  assert.equal(started.phase, "running");
  assert.equal(started.score, 0);
  assert.equal(started.best, 15);
});

test("jump sets upward velocity when grounded and ignores mid-air double jump", () => {
  const running = triggerJump(createInitialState(0));
  const jumped = triggerJump(running);
  assert.ok(jumped.vy < 0);

  const midAir = stepRunner(jumped, 1, () => 0.5);
  assert.ok(midAir.py < GROUND_Y - PING_HEIGHT);

  const attemptDoubleJump = triggerJump(midAir);
  assert.equal(attemptDoubleJump.vy, midAir.vy);
});

test("collision ends the run and updates best score", () => {
  const running = {
    ...triggerJump(createInitialState(5)),
    score: 24.8,
    obstacles: [{ x: PING_X + 2 }],
  };
  assert.equal(checkCollision(running.py, running.obstacles), true);

  const next = stepRunner(running, 0.5, () => 0.5);
  assert.equal(next.phase, "over");
  assert.equal(next.best, 24);
});

test("formatHud pads Uptime and Best to 5 digits", () => {
  assert.equal(formatHud(42.9, 120), "Uptime 00042  Best 00120");
});
