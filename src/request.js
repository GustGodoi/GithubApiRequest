// Requisita o Github
export default async function executaRequisicaoGithub(linkRequest) {

    console.log('linkRequest', linkRequest)
    const resultadoRequest = await Promise
        .all(
            linkRequest.map(async (url) => {
                try {
                    const response = await fetch(url);
                    return response.json();
                } catch (error) {
                    return manejaErros(error);
                }
        })
    )
    return resultadoRequest;
}

function manejaErros(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return 'link não encontrado.';
    } else {
        return 'Ocorreu algum erro na chamada.';
    }
}