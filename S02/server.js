import chalk from 'chalk';

import app from './src/app.js';

console.log(chalk.red('Bonjour'));

const PORT = 5000;

app.listen(PORT, err => {

    console.log(chalk.blue(`Server listening on port: ${PORT}`));
});