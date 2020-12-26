function compareObjects(obj1, obj2){
    const firstKeys = Object.keys(obj1);
    const secondKeys = Object.keys(obj2);

    if(firstKeys.length !== secondKeys.length){
        return false
    }
    else{
        for(let key in obj1){
            const current = obj1[key];

            if(typeof current === 'object' && !areEqual(current, obj2[key])){
                return false
            }
            else if(current !== obj2[key] && typeof current !== 'object' && !Array.isArray(current)){
                return false
            }
        }

        return true
    }
}

function compareArrays(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false
    }
    else{
        for(const [index, value] of arr1.entries()){
            if(typeof value === 'object' && !areEqual(value, arr2[index])){
                return false
            }
            else if(typeof value !== 'object' && value !== arr2[index]){
                return false
            }
        }
    }
    return true
}

function areEqual(value1, value2){
    if(Array.isArray(value1) && Array.isArray(value2)){
        return compareArrays(value1, value2);
    }
    else if(typeof value1 === 'object' && typeof value2 === 'object'){
        return compareObjects(value1, value2);
    }
    else{
        return value1 === value2
    }
}

export default areEqual