// Requisita o Github

import fs from 'fs';
import chalk from 'chalk';
import pegaArquivo from './index.js';
import fs, { lstat, lstatSync } from 'fs';

const caminho = process.argv;

// function trataErro(error) {
//     throw new Error(chalk.red(error.code, 'Erro da requisição.'));
// }

// async function executaRequisicaoGithub(linkRequest) {
//     dadosUsuarioFormatados = await fetch(linkRequest)
//      .then((res) => res.json())
//      .catch((error) => trataErro(error));

//     console.log(chalk.green(dadosUsuarioFormatados));
// }

// executaRequisicaoGithub(linkRequest);
