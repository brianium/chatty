exports.extend = function(obj, props) {
    Object.keys(props).forEach(function(key){
        obj[key] = props[key];
    });
    return obj;
};