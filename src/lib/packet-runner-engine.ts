export const GAME_WIDTH = 300;
export const GAME_HEIGHT = 75;
export const GROUND_Y = 62;

export const PING_WIDTH = 12;
export const PING_HEIGHT = 13;
export const PING_X = 24;

export const PACKET_SIZE = 8;

export const PING_SPRITE: readonly string[] = [
  ".....##.....",
  ".....##.....",
  "......#.....",
  "..########..",
  ".##########.",
  ".##.####.##.",
  ".##.####.##.",
  ".##########.",
  ".##########.",
  "..########..",
  "..##....##..",
  "..##....##..",
  ".###....###.",
];

export const PACKET_SPRITE: readonly string[] = [
  "########",
  "#......#",
  "#.#..#.#",
  "#..##..#",
  "#..##..#",
  "#.#..#.#",
  "#......#",
  "########",
];

export type GamePhase = "idle" | "running" | "over";

export interface Obstacle {
  x: number;
}

export interface RunnerState {
  phase: GamePhase;
  py: number;
  vy: number;
  speed: number;
  obstacles: Obstacle[];
  score: number;
  best: number;
}

export function createInitialState(best = 0): RunnerState {
  return {
    phase: "idle",
    py: GROUND_Y - PING_HEIGHT,
    vy: 0,
    speed: 1.6,
    obstacles: [{ x: GAME_WIDTH + 30 }],
    score: 0,
    best: Math.max(0, Math.floor(best)),
  };
}

export function startRun(state: RunnerState): RunnerState {
  return {
    phase: "running",
    py: GROUND_Y - PING_HEIGHT,
    vy: 0,
    speed: 1.6,
    obstacles: [{ x: GAME_WIDTH + 30 }],
    score: 0,
    best: state.best,
  };
}

export function triggerJump(state: RunnerState): RunnerState {
  if (state.phase !== "running") {
    return startRun(state);
  }
  const floorY = GROUND_Y - PING_HEIGHT;
  if (state.py >= floorY - 0.01) {
    return {
      ...state,
      vy: -4.6,
    };
  }
  return state;
}

export function checkCollision(py: number, obstacles: readonly Obstacle[]): boolean {
  const pingLeft = PING_X + 2;
  const pingRight = PING_X + PING_WIDTH - 2;
  const pingBottom = py + PING_HEIGHT;
  const packetTop = GROUND_Y - PACKET_SIZE;

  return obstacles.some(
    (o) =>
      o.x < pingRight &&
      o.x + PACKET_SIZE > pingLeft &&
      pingBottom > packetTop + 1,
  );
}

export function stepRunner(
  state: RunnerState,
  dt: number,
  randomGap: () => number = Math.random,
): RunnerState {
  if (state.phase !== "running") {
    return state;
  }

  const clampedDt = Math.min(Math.max(dt, 0), 2);
  const floorY = GROUND_Y - PING_HEIGHT;

  let vy = state.vy + 0.28 * clampedDt;
  let py = state.py + vy * clampedDt;
  if (py >= floorY) {
    py = floorY;
    vy = 0;
  }

  const obstacles = state.obstacles
    .map((o) => ({ x: o.x - state.speed * clampedDt }))
    .filter((o) => o.x >= -PACKET_SIZE);

  const last = obstacles[obstacles.length - 1];
  const minGap = 72 + randomGap() * 88;
  if (!last || last.x < GAME_WIDTH - minGap) {
    obstacles.push({ x: GAME_WIDTH + PACKET_SIZE });
  }

  const speed = state.speed + 0.0008 * clampedDt;
  const score = state.score + speed * clampedDt * 0.1;

  if (checkCollision(py, obstacles)) {
    const best = Math.max(state.best, Math.floor(score));
    return {
      ...state,
      phase: "over",
      py,
      vy,
      speed,
      obstacles,
      score,
      best,
    };
  }

  return {
    ...state,
    py,
    vy,
    speed,
    obstacles,
    score,
  };
}

export function formatHud(score: number, best: number): string {
  const s = String(Math.floor(score)).padStart(5, "0");
  const b = String(Math.floor(best)).padStart(5, "0");
  return `Uptime ${s}  Best ${b}`;
}
