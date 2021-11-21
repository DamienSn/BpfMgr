module.exports.uploadErrors = (err) => {
    let errors = {format: '', maxSize: ''};

/*     if (err.message.includes('invalid file')) {
        errors.format = 'Format incompatible';
    } else if (err.message.includes('max size')) {
        errors.maxSize = 'Le fichier dépasse 500ko';
    } */

    switch (err.message) {
        case 'invalid file':
            errors.format = 'Format incompatible';
        case 'max size':
            errors.maxSize = 'Le fichier dépasse 500ko'; 
    }

    return errors;
}
