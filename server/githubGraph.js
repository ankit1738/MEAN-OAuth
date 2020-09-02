const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';
const DATE = moment().subtract(1, 'months').format("YYYY-MM-DD hh:mm:ss");
console.log(DATE);
const data = {
    data:DATE
};

jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit().add([FILE_PATH]).commit([DATE, {'--date':DATE}]).push();
});