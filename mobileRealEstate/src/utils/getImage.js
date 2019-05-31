import ip from '../../static/ip'
export default function (data, i) {
  const head = ip + "/static/image/";
  const imgSplit = data.split(/\_|\./g);
  let index = i;
  while (imgSplit.length - 1 <= index) {
    index--;
  }
  return head + imgSplit[0] + "_" + imgSplit[index] + "." + imgSplit[imgSplit.length - 1];

}