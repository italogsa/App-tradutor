// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão de tradução
    const translateButton = document.querySelector('.btn-primary');
    // Seleciona o campo de entrada onde o usuário digita o texto a ser traduzido
    const inputMessage = document.getElementById('inputMessage');
    // Seleciona o campo de saída onde será exibido o texto traduzido
    const outputMessage = document.getElementById('outputMessage');
    // Seleciona o elemento <select> para escolher o idioma de tradução
    const languageSelect = document.querySelector('select');

    // Adiciona um evento de clique ao botão de tradução
    translateButton.addEventListener('click', async (event) => {
        // Previne o comportamento padrão do botão (envio do formulário)
        event.preventDefault();

        // Obtém o texto digitado pelo usuário e remove espaços extras
        const textToTranslate = inputMessage.value.trim();
        // Obtém o idioma selecionado no <select> e converte para letras minúsculas
        const selectedLanguage = languageSelect.value.toLowerCase();

        // Verifica se o campo de entrada está vazio
        if (!textToTranslate) {
            alert('Please enter text to translate.'); // Exibe um alerta se o campo estiver vazio
            return; // Interrompe a execução
        }

        // Verifica se o usuário escolheu um idioma válido
        if (selectedLanguage === 'choose language') {
            alert('Please choose a language to translate.'); // Exibe um alerta se nenhum idioma for selecionado
            return; // Interrompe a execução
        }

        // Monta o endpoint da API com o idioma selecionado e o texto a ser traduzido
        const apiUrl = `https://api.funtranslations.com/translate/${selectedLanguage}.json?text=${encodeURIComponent(textToTranslate)}`;

        try {
            // Faz uma requisição à API usando o método fetch
            const response = await fetch(apiUrl);

            // Verifica se a resposta da API não foi bem-sucedida
            if (!response.ok) {
                throw new Error('Error accessing API. Check request limit or text entered.'); // Lança um erro
            }

            // Converte a resposta da API para JSON
            const data = await response.json();

            // Exibe o texto traduzido no campo de saída
            outputMessage.value = data.contents.translated;
        } catch (error) {
            // Exibe um alerta com a mensagem de erro, caso ocorra algum problema
            alert(`Erro: ${error.message}`);
        }
    });
});