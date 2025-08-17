// export function convertCode(name) {
//   if (name.startsWith("SUB")) {
//     return name.replace("SUB", "AD");
//   } else if (name.startsWith("AD")) {
//     return name.replace("AD", "ADM");
//   }
//   return name;
// }

export function convertCode(name) {
  if (name?.startsWith("AD")) {
    return name?.replace("AD", "ADM");
  } else if (name?.startsWith("SUB")) {
    return name?.replace("SUB", "AD");
  } else if (name?.startsWith("M")) {
    return name?.replace("M", "MA");
  }
  return name;
}
export function convertCodeReverse(name) {
  if (name?.startsWith("ADM")) {
    return name?.replace("ADM", "AD");
  } else if (name?.startsWith("AD")) {
    return name?.replace("AD", "SUB");
  } else if (name?.startsWith("MA")) {
    return name?.replace("MA", "M");
  }
  return name;
}


