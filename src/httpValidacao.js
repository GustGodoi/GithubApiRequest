// Efetua toda a parte de validação dos links http.

import chalk from "chalk";

function extraiLinks(arrDeLinks) {
    return arrDeLinks.map((objetoLink) => Object.values(objetoLink).join())
}

async function validaStatus(ListaURLs) {
    const arrStatus = await Promise
        .all(
            ListaURLs.map(async (url) => {
                try {
                    const response = await fetch(url, { method: 'HEAD'});
                    return `${response.status} - ${response.statusText}`;
                } catch (error) {
                    return manejaErros(error);
                }
        })
    )  
    return arrStatus;
}

function manejaErros(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return 'link não encontrado.';
    } else {
        return 'Ocorreu algum erro na chamada.';
    }
}

export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await validaStatus(links);

    return listaDeLinks.map((objeto, index) => ({
        ...objeto, 
        status: status[index]
    }))
}