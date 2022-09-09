import fs from 'fs';

const privateKey = fs.readFileSync('./src/private.key');

export default privateKey;