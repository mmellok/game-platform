import {useEffect, useRef} from "react";

export default function useSwipe(listeners, deps) {
  const ref = useRef(global.document?.documentElement);

  useEffect(
    () => {
      const events = listeners;
      const target = ref.current;
      if (!target) return;
      const destroy = events.map(([name, listener]) => {
        if (listener) {
          target.addEventListener(name, listener, {passive: true});
          return () => {
            target.removeEventListener(name, listener);
          }
        }
      });

      return () => {
        destroy.forEach(fn => fn?.());
        destroy.length = 0;
      };
    },
    deps // eslint-disable-line react-hooks/exhaustive-deps
  );

  return ref;
}

export function initSwipe(target = global.document?.body) {
  const root = global;
  const events = [
    ["mousedown", onMouseDown, target],
    ["mousemove", onMouseMove, root],
    ["mouseup", onMouseUp, root],
    ["touchstart", onTouchStart, target],
    ["touchmove", onTouchMove, root],
    ["touchend", onTouchEnd, root],
  ];
  const destroy = events.map(([name, listener, target]) => {
    target.addEventListener(name, listener, {passive: true});
    return () => {
      target.removeEventListener(name, listener);
    }
  });

  return () => {
    destroy.forEach(fn => fn());
    destroy.length = 0;
  };
}


function now() {
  return new Date().getTime();
}

let startTouch;
let touchMove;

function onMouseDown(event) {
  if (!startTouch) {
    startTouch = getMousePosition(event);
    triggerStart(startTouch);
  }
}
function onMouseMove(event) {
  if (startTouch) {
    const _touchMove = getMousePosition(event);
    triggerMove(startTouch, touchMove, _touchMove, event);
    touchMove = _touchMove;
  }
}
function onMouseUp(event) {
  if (startTouch) {
    trigger(startTouch, getMousePosition(event), false);
  }
}
function onTouchStart(event) {
  if (!startTouch) {
    startTouch = getTouchPosition(event)[0];
    triggerStart(startTouch, true);
  }
}
function onTouchMove(event) {
  if (startTouch) {
    const _touchMove = getTouchPosition(event, startTouch.id)[0];
    triggerMove(startTouch, touchMove, _touchMove, event, true);
    touchMove = _touchMove;
  }
}
function onTouchEnd(event) {
  trigger(startTouch, touchMove, true);
  startTouch = undefined;
  touchMove = undefined;
}

function _trigger(target, name, props) {
  const event = new Event(name, {bubbles: true});
  if (props) {
    Object.keys(props).forEach(key => {
      event[key] = props[key];
    });
  }
  target.dispatchEvent(event);
}

function triggerStart(start, isTouch) {
  _trigger(start.target, "pep:touchstart", {
    isTouch,
    touchstart: {
      x: start.x,
      y: start.y
    }
  });
}

function triggerMove(start, prev, current, originalEvent, isTouch) {
  if (!(start && current && prev)) {
    return;
  }

  const dx = current.x - start.x;
  const dy = current.y - start.y;
  const { target } = start;

  _trigger(target, "pep:touchmove", {
    isTouch,
    touchmove: {
      originalEvent,
      current,
      dx,
      dy,
      offset: {
        dx: current.x - prev.x,
        dy: current.y - prev.y
      }
    }
  });
}

function trigger(start, end, isTouch) {
  if (!start || !end) {
    return;
  }
  startTouch = undefined;
  touchMove = undefined;

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const { target } = start;

  _trigger(target, "pep:touchend", {
    isTouch,
    touchend: {
      dx,
      dy,
      duration: end.timestamp - start.timestamp
    }
  });

  if( Math.abs(dx)<5 && Math.abs(dy)<5 ) return;

  const direction = getSwipeDirection(dx, dy);
  const direction2 = ["left", "right"].indexOf(direction) >= 0 ? "horizontal" : "vertical";
  _trigger(target, "pep:swipe", {
    isTouch,
    swipe: {
      dx,
      dy,
      direction,
      getDirection: getDirection(dx, dy)
    }
  });
  _trigger(target, `pep:swipe-${direction}`, {isTouch});

  _trigger(target, `pep:swipe-${direction2}`, {
    swipe: {direction: ["left", "up"].indexOf(direction) < 0 ? -1 : 1},
    isTouch
  });

}

function getDirection(dx, dy) {
  const a = (Math.atan2(dy, dx) * 180) / Math.PI;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return function(ax, ay, length) {
    if (typeof length === "number" && distance < length) {
      return;
    }

    if (typeof ax === "undefined") {
      ax = 45;
    }
    if (typeof ay === "undefined") {
      ay = ax;
    }

    if (Math.abs(a) < ax) return "right";
    if (180 - Math.abs(a) < ax) return "left";

    if (Math.abs(90 - a) < ay) return "down";
    if (Math.abs(-90 - a) < ax) return "up";
  };
}
function getSwipeDirection(dx, dy) {
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx < 0 ? "left" : "right";
  }
  return dy < 0 ? "up" : "down";
}

function getMousePosition(event) {
  return {
    timestamp: now(),
    type: "mouse",
    target: event.target,
    x: event.pageX || event.clientX,
    y: event.pageY || event.clientY
  };
}
function getTouchPosition(event, touchId) {
  const _map = [];
  const time = now();
  const notID = typeof touchId === "undefined";
  for (let i = 0; i < event.touches.length; i++) {
    if (notID || event.touches[i].identifier === touchId) {
      _map.push(map(event.touches[i]));
    }
  }
  return _map;

  function map(touch) {
    return {
      timestamp: time,
      type: "touch",
      id: touch.identifier,
      target: event.target,
      x: touch.pageX || touch.clientX,
      y: touch.pageY || touch.clientY
    };
  }
}
