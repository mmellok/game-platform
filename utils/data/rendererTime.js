import React from "react";
import numWord from "../numWord";

export function rendererTime ({ days, hours, minutes, seconds , completed }){
  if (completed) {
    return <span> 00 : 00 : 00</span>
  } else {
    if (days) {
      return <span> {days}д : {hours}ч : {minutes}м </span>;
    }
    else {
      return <span>  {hours}ч : {minutes}м : {seconds}с </span>;
    }
  }
}

export function rendererTimeDays ({ days, completed }){
  if (completed) {
    return <span> 0</span>
  } else {
    if (days) {
      return <span> {days} {numWord(days,["день", "дня", "дней"])} </span>;
    }
    else {
      return <span>  0 </span>;
    }
  }
}
