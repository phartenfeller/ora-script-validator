import readAndPrepareFile from '../src/util/readAndPrepareFile';

const data = readAndPrepareFile('./db_objects/ddl/install_scratch.sql');
console.log(data);
