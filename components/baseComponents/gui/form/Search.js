import React, {useEffect, useRef, useState, useTransition} from "react";
import {array, node, string} from "prop-types";
import LabelInput from "./LabelInput";
import classNames from "classnames";
import {combineRefs} from "../../../../utils/element/applyRef";
import Scroll from "../scroll/Scroll";

const Search = React.forwardRef(({
                                   options,
                                   filter,
                                   className,
                                   isScroll = options?.length > 4,
                                   ...rest
                                 }, ref) => {
  const inputRef = useRef();
  const scrollRef = useRef();
  const searchRef = useRef();
  const [, startTransition] = useTransition();
  const [text, setText] = useState("");
  const [opened, setOpened] = useState(false);

  const container = useRef();
  const onSelect = (value, label) => {
    const input = inputRef.current.querySelector("input")
    const searchInput = searchRef.current.querySelector("input");

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(input, value);
    nativeInputValueSetter.call(searchInput, "");

    searchInput.placeholder = label;

    input.dispatchEvent(new Event('input', {bubbles: true}));
    searchInput.dispatchEvent(new Event('input', {bubbles: true}));

    setOpened(false)
  };

  const filteredOptions = options.filter(filter ?? (({label}) => text ?
    label.toLowerCase().search(
      text.replace(new RegExp("\\\\", "g"), "\\\\").toLowerCase()) !== -1 : true));

  useEffect(() => {
    const searchInput = searchRef.current.querySelector("input");

    if (filteredOptions.length && !searchInput.placeholder) {
      searchInput.placeholder = filteredOptions[0].label;
    }
  }, [filteredOptions.length]);

  useEffect(() => {
    window.addEventListener("mousedown", onDown);
    window.addEventListener("touchstart", onDown);

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("touchstart", onDown);
    }

    function onDown(e) {
      if (!container.current.contains(e.target))
        setOpened(false)
    }
  }, []);

  function content(children) {
    if (isScroll === false) return children;
    return (
      <Scroll noScrollX={true}
              removeTracksWhenNotUsed={true}
              ref={scrollRef}
              className={classNames("search__scrollbar")}
      >
        {children}
      </Scroll>
    );
  }

  return (
    <div ref={combineRefs([ref, container])}
         className={classNames("search", className, {
           "search_active": opened
         })}
    >
      <div className={classNames("search__label", {
        "search__list_scroll": isScroll
      })}>{rest.label}</div>
      <LabelInput name={`search`}
                  autoComplete={"off"}
                  labelProps={{ref: searchRef, className: "search__header"}}
                  onFocus={() => setOpened(true)}
                  onChange={(e) => startTransition(() => setText(e.target.value))}/>
      <LabelInput {...rest} labelProps={{ref: inputRef, style: {display: "none"}}}/>
      <div className={"search__list"}>
        <div className={"search__list-block"}>
          {content(
            <>
              <div className={"search__list-content"}>
                {filteredOptions.map(({label, value}) => (
                  <div className={"search__item"} key={value} onClick={() => onSelect(value, label)}>
                    <div className={"search__item-text"}>{label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
});

export default Search;

Search.propTypes = {
  label: string,
  children: node,
  options: array,
  error: node,
  name: string,
};
