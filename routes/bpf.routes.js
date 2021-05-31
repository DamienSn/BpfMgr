modules.exports = app => {
    // new
    app.post('/bpfs/create')

    // get
    app.get('/bpfs/get');

    // delete
    app.delete('/bpf/delete');
}