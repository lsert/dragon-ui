
/* eslint-disable */
export default function (node: Node | null, tree: Element) {
  while (node) {
    if (node === tree) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
