// arquivo que executas os processos.

import fs from 'fs';
import chalk from 'chalk';
import pegaArquivo from './index.js';
import listaValidada from './httpValidacao.js';
import executaRequisicaoGithub from './request.js';

const caminho = process.argv;

async function imprimeLista(valida, nomeDeArquivo = '', resultado) {
    if (valida) {
        const listaLinksValidados = await listaValidada(resultado);
        // console.log(
        //     chalk.yellow('Lista Validada'),
        //     chalk.black.bgGreen(nomeDeArquivo),
        //     listaLinksValidados);
        
        let links = extraiLinks(listaLinksValidados);
        const informacaoUsuario = await executaRequisicaoGithub(links);
        console.log('informacaoUsuario', informacaoUsuario);
    } else {
        const listaLinksValidados = resultado;
        // console.log(
        //     chalk.yellow('Lista de links do Arquivo:'),
        //     chalk.black.bgGreen(nomeDeArquivo),
        //     listaLinksValidados);
        
        let links = extraiLinks(listaLinksValidados);
        const informacaoUsuario = await executaRequisicaoGithub(links);
        console.log('informacaoUsuario', informacaoUsuario);
    }   
}

function extraiLinks(arrDeLinks) {
    return arrDeLinks.map((objetoLink) => objetoLink.Github)
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try {
        fs.lstatSync(caminho);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red("Arquivo/diretório não encontrado."));
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        const nomeDeArquivo = caminho;
        imprimeLista(valida, nomeDeArquivo, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach( async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
            imprimeLista(valida, nomeDeArquivo, lista);
        })
    }
}

processaTexto(caminho)