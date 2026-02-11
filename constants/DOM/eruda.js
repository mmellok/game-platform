import {minify} from "html-minifier";
import erudaScript from "./erudaScript.html";
import erudaTrickScript from "./erudaTrickScript.html";

export function addEruda() {
  let minifiedEruda = "";


  if (!process.env.LOCALHOST) {
    if (process.env.ERUDA_DEFAULT)
      minifiedEruda = minify(erudaScript, {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true
      });
    else if (process.env.ERUDA_TRICK)
      minifiedEruda = minify(erudaTrickScript, {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true
      })
  }
  return minifiedEruda;
}
