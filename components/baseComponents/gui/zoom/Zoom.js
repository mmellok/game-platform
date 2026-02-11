import React, {useCallback, useEffect, useMemo, useRef} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Icon from "../../../baseComponents/gui/icon/Icon";
import {parseComplexStyleProperty} from "../../../../utils/style/parseComplexStyleProperty";
import styles from "./Zoom.module.scss";


export default function Zoom({className, setLibraryMapZoom, libraryMapZoom}) {
  const bgRef = useRef();
  const memoizedData = useMemo(() => ({sliderProgress: 0, slider: null, lines: [], dragData: {isPressed: false}}), []);

  const initZoomSlider = useCallback(() => {
    const wrapper = bgRef.current;
    const lines = Array.from(wrapper.querySelectorAll("span"));
    const slider = wrapper.querySelector(".zoom__point");

    memoizedData.lines = lines.map(line => ({
      element: line,
      offsetTop: line.offsetTop,
    })).reverse();
    memoizedData.slider = slider;
    memoizedData.sliderStartOffset = memoizedData.lines[0].offsetTop;

    const startLine = lines[0];
    const endLine = lines.at(-1);
    const minExtreme = startLine.offsetTop;
    const maxExtreme = endLine.offsetTop;
    memoizedData.dragData = {
      ...memoizedData.dragData,
      offsets: {minExtreme, maxExtreme}
    };
  }, []);

  const moveSlider = useCallback(() => {
    const {sliderProgress, lines, slider} = memoizedData;

    const line = lines[sliderProgress];
    slider.style.transform = `translateY(${line.offsetTop}px)`;

    memoizedData.sliderStartOffset = line.offsetTop;

    setLibraryMapZoom(sliderProgress);
  }, [memoizedData]);

  const scale = useCallback(() => {
    const {lines, sliderProgress} = memoizedData;
    memoizedData.sliderProgress = Math.min(lines.length - 1, sliderProgress + 1);
    moveSlider();
  }, [memoizedData]);

  const unScale = useCallback(() => {
    const {sliderProgress} = memoizedData;
    memoizedData.sliderProgress = Math.max(0, sliderProgress - 1);
    moveSlider();
  }, [memoizedData]);

  const onDragStart = useCallback((event) => {
    const isTouch = event.type.startsWith("touch");
    const clientY = isTouch ? event.touches[0].clientY : event.clientY;

    memoizedData.dragData = {
      ...memoizedData.dragData,
      isPressed: true,
      startPosition: clientY
    };
  }, []);

  const onDragMove = useCallback((event) => {
    if (!memoizedData.dragData.isPressed) return;

    const isTouch = event.type.startsWith("touch");
    const clientY = isTouch ? event.touches[0].clientY : event.clientY;

    const {dragData: {startPosition, offsets}, sliderStartOffset, slider} = memoizedData;

    const deltaY = clientY - startPosition;

    const clamped = Math.max(offsets.minExtreme, Math.min(offsets.maxExtreme, sliderStartOffset + deltaY));
    slider.style.transform = `translateY(${clamped}px)`;
  }, []);

  const onDragEnd = useCallback(() => {
    const {slider, lines} = memoizedData;

    const data = parseComplexStyleProperty(slider.style.transform);
    const currentTranslate = parseFloat(data.translateY[0]);
    const deltas = lines.map(({offsetTop}) => Math.abs(currentTranslate - offsetTop));
    const minDelta = Math.min(...deltas);

    memoizedData.dragData.isPressed = false;
    memoizedData.sliderProgress = deltas.indexOf(minDelta);

    moveSlider();
  }, []);

  useEffect(() => {
    if (!memoizedData) return;
    const {lines, slider} = memoizedData;

    if (!slider) return;

    const progress = Math.max(0, Math.min(Math.ceil(libraryMapZoom), lines.length - 1));
    const line = lines[progress];
    if (!line) return;
    slider.style.transform = `translateY(${line.offsetTop}px)`;
    memoizedData.sliderStartOffset = line.offsetTop;
    memoizedData.sliderProgress = progress;
  }, [libraryMapZoom])

  useEffect(() => {
    initZoomSlider();
    moveSlider();
  }, []);

  return (
    <div className={classNames("zoom", className,styles.zoom)}>
      <div className={classNames("zoom__bg",styles.zoom__bg)} ref={bgRef}>
        <span className={classNames("zoom__bg-line",styles.zoom__bgLine)}/>
        <span className={classNames("zoom__bg-line",styles.zoom__bgLine)}/>
        <span className={classNames("zoom__bg-line",styles.zoom__bgLine)}/>
        <span className={classNames("zoom__bg-line",styles.zoom__bgLine)}/>
        <div className={classNames("zoom__point",styles.zoom__point)}/>
      </div>
      <div className={classNames("zoom__point-wrapper",styles.zoom__pointWrapper)}
           onMouseDown={onDragStart}
           onTouchStart={onDragStart}
           onMouseMove={onDragMove}
           onTouchMove={onDragMove}
           onTouchEnd={onDragEnd}
           onTouchCancel={onDragEnd}
           onMouseLeave={onDragEnd}
           onMouseUp={onDragEnd}
           onMouseOut={onDragEnd}
      />
      <button className={classNames("zoom__button zoom__button_add",styles.zoom__button, styles.zoom__button_add)}
              onClick={scale} />
      <button className={classNames("zoom__button zoom__button_del",styles.zoom__button, styles.zoom__button_del)}
              onClick={unScale} />
    </div>
  );
}
Zoom.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
