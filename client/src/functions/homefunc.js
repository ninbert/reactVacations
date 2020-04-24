export function checkArray (arr1,arr2,id) {
    let payload = {arr:[],name:""};
    if (arr1.findIndex(item=> {
    return (item.props.id == id)}) != -1) {
        payload.arr=arr1
        payload.name='firstArray'
        return payload
    } else {
        payload.arr=arr2
        payload.name='secondArray'
        return payload
    }
}

export function arrMove (arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }