export const getCountOfdublicates = (arr:string[]) => { 
  const count:{[key: string]: number} = {};
  arr.forEach(item => {
    if (!count[item]) {
      count[item] = 1;
    } else {
      count[item] ++;
    }
  }) 
  return count
}