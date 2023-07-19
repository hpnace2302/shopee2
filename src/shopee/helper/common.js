function isEmptyObject(obj) {
    for(let prop in obj) {
        // kiểm tra trong obj có tồn tại key k ?
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
    // return true là obj rỗng
}

export const helper = {
  isEmptyObject
}
