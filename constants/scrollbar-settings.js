import scroll from "../components/baseComponents/gui/scroll/Scroll.module.scss";

const trackBase = {
  className:scroll.scroll__track,
  style:{
    borderRadius:'var(--track-border-radius,.5em)',
    background:'var(--track-color,rgba(0,0,0,.1))',
  }
};
const thumbBase = {
  className:scroll.scroll__thumb,
  style:{
    borderRadius:'var(--track-border-radius,.5em)',
    background:'var(--thumb-color,rgba(0,0,0,.5))',
  }
};

export const defaultProps = {
  className:scroll.scroll,
  noScrollX:true,
  removeTracksWhenNotUsed:true,
  wrapperProps:{
    className:scroll.scroll__wrapper
  },
  contentProps:{
    className:scroll.scroll__content
  },
  trackXProps:{
    ...trackBase,
    style:{
      ...trackBase.style,
      height: 'var(--track-width,.5em)',
      width: "auto",
      left:'var(--track-offset-start,.5em)',
      right:'var(--track-offset-start,.5em)',
    }
  },
  trackYProps:{
    ...trackBase,
    style: {
      ...trackBase.style,
      width: 'var(--track-width,.5em)',
      height: "auto",
      top:'var(--track-offset-start,.5em)',
      bottom:'var(--track-offset-start,.5em)',
    }
  },
  thumbXProps:{...thumbBase},
  thumbYProps:{...thumbBase}
};
