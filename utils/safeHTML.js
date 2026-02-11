import React from "react";
import parse from 'html-react-parser';

export function safeHTML(htmlString, key) {
  return htmlString && (
    <React.Fragment key={key}>
      {parse(htmlString.toString(), {
        replace(domNode) {
          const {name} = domNode;
          if (name === "script") return (<></>);
          return domNode;
        }
      })}
    </React.Fragment>
  );
}


export function deleteHTML(htmlString) {
  if (!htmlString) return '';

  // Удаляем HTML-теги
  let text = htmlString.replace(/<\/?[^>]+(>|$)/g, '');

  // Удаляем HTML-энтити
  text = text.replace(/&[a-zA-Z]+;|&#[0-9]+;|&#x[0-9a-fA-F]+;/g, '');

  return text;
}
