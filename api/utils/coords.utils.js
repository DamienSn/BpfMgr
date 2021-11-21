module.exports.convertDMSToDD = (degrees, minutes, seconds, direction) => {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W" || direction == "South" || direction == "West") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}