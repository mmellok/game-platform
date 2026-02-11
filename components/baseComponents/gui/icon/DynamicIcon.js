import React, {useEffect, useState, useMemo} from "react";
import * as PropTypes from "prop-types";
import parse, {attributesToProps, domToReact} from "html-react-parser";
import classNames from "classnames";

const load = (() => {
  const cache = {};
  return (src) => {
    if (!cache[src]) {
      cache[src] = fetch(src).then(r => r.text());
    }
    return cache[src];
  }
})();

export default function DynamicIcon({src, className, style, onLoaded}) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!src) return;
    load(src).then(setText);
  }, [src]);

  useEffect(() => {
    if (!text) return;
    onLoaded?.();
  }, [text, onLoaded]);

  return useMemo(() => {
    if (!text) return;
    const options = {
      replace(domNode) {
        const {name} = domNode;
        if (name === "script") return (<></>);
        if (name === "svg") {
          const props = attributesToProps(domNode.attribs);
          return (
            <svg {...props} className={classNames("icon", props.className, className)} style={style} fill={"none"}>
              {domToReact(domNode.children, options)}
            </svg>
          )
        }
        return domNode;
      }
    };
    return (
      <React.Fragment>{parse(text, options)}</React.Fragment>
    );
  }, [text, className, style]);
}

DynamicIcon.propTypes = {
  /**
   * Имя svg-файла
   */
  src: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  svgRef: PropTypes.oneOfType([
    PropTypes.shape({current: PropTypes.any}),
    PropTypes.func,
  ]),
};

