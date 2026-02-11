let count = 0;

const timers = {};

class Timer {
  _time = 0;
  _lastUpdateTime = getTime();
  _listeners = [];

  constructor({onTimeout, duration = 0, delta = 1000} = {}) {
    this.time = this.duration = duration;
    this._delta = duration ? Math.min(duration, delta) : delta;
    this._onTimeout = onTimeout;
    this._animationFrameId = null;
    this._isRunning = false;
  }

  get time() {
    return this._time;
  }

  set time(value) {
    this._time = Math.max(0, value);
    this._listeners.forEach(listener => listener(this.time));
  }

  subscribe(listener) {
    if (typeof listener === "function" && !this._listeners.includes(listener)) {
      this._listeners.push(listener);
      listener(this.time);
    }
  }

  unsubscribe(listener) {
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  update = () => {
    const currentTime = getTime();
    const deltaTime = currentTime - this._lastUpdateTime;

    if (deltaTime >= this._delta) {
      this._lastUpdateTime = currentTime - (deltaTime % this._delta);
      this.time -= Math.floor(deltaTime / this._delta) * this._delta;

      if (this.time <= 0) {
        this._onTimeout?.call(null);
        this.stop();
        return;
      }
    }

    this._animationFrameId = requestAnimationFrame(this.update);
  };

  start() {
    if (!this._isRunning) {
      this._isRunning = true;
      this._lastUpdateTime = getTime();
      this.update();
    }
  }

  stop() {
    this._isRunning = false;
    cancelAnimationFrame(this._animationFrameId);
  }

  pause() {
    this._isRunning = false;
    cancelAnimationFrame(this._animationFrameId);
  }

  destroy() {
    this.stop();
    this._listeners = [];
  }

  get stringTime() {
    return msToTime(this.time);
  }

  setOnTimeout(onTimeout) {
    this._onTimeout = onTimeout;
  }
}

function getTime() {
  return performance.now();
}

export function addTimer({duration, onTimeout} = {}) {
  const timer = new Timer({duration, onTimeout});
  timers[++count] = timer;
  return count;
}

export function getTimer(uuid) {
  return timers[uuid];
}

export function removeTimer(uuid) {
  const timer = timers[uuid];
  timer.destroy();
  delete timers[uuid];
}

export function timeToString(time) {
  const secondsTotal = Math.ceil(time / 1000);
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal % 60;

  return `${String(minutes).padStart(2, '0')}мин. ${String(seconds).padStart(2, '0')}с.`;
}

function msToTime(s) {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;
  let str = "";

  if (hrs)
    str = str.concat(`${String(hrs).padStart(2, '0')}:`);
  return str.concat(`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`)
}
