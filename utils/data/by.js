export default function by(arr, key) {
  if(!Array.isArray(arr)) return;
  return arr.reduce((res, info)=>{
    res[info[key]] = info;
    return res;
  }, {});
}

export function listBy(arr, key) {
  const fn = typeof key === "function" ? key : item => item[key];
  return arr.reduce((res, item) => {
    const k = fn(item);
    if (!res[k]) res[k] = [];
    res[k].push(item);
    return res;
  }, {});
}
