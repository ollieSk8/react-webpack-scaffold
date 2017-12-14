/**
 * Created by ollie on 2017/12/14.
 */
const fs = require('fs-extra');
fs.emptyDir('./public', err => {
    if (err) return console.error(err)
    console.log('clean public dir success!');
})