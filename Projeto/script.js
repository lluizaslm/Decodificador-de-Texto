document.addEventListener('DOMContentLoaded', () => {
    const encryptButton = document.querySelector('.btn-1');
    const decryptButton = document.querySelector('.btn-2');
    const copyButton = document.getElementById('copy');
    const texto1 = document.getElementById('texto1');
    const texto2 = document.getElementById('texto2');
    const msgElement = document.getElementById('msg');
    const statusElement = document.getElementById('status');

    const encryptionDict = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    function encrypt(text) {
        return text.split('')
            .map(char => encryptionDict[char] || char)
            .join('');
    }

    function decrypt(text) {
        const decryptionDict = Object.fromEntries(
            Object.entries(encryptionDict).map(([key, value]) => [value, key])
        );

        return Object.entries(decryptionDict).reduce((acc, [encoded, original]) => {
            const regex = new RegExp(encoded, 'g');
            return acc.replace(regex, original);
        }, text);
    }

    encryptButton.addEventListener('click', () => {
        const text = texto1.value;
        if (text) {
            texto2.value = encrypt(text);
            statusElement.textContent = 'Texto criptografado!';
            copyButton.style.display = 'block';
        } else {
            statusElement.textContent = 'Nenhuma mensagem encontrada';
            copyButton.style.display = 'none';
        }
    });

    decryptButton.addEventListener('click', () => {
        const text = texto1.value;
        if (text) {
            texto2.value = decrypt(text);
            statusElement.textContent = 'Texto descriptografado!';
            copyButton.style.display = 'block';
        } else {
            statusElement.textContent = 'Nenhuma mensagem encontrada';
            copyButton.style.display = 'none';
        }
    });

    copyButton.addEventListener('click', () => {
        const text = texto2.value || texto1.value;
        navigator.clipboard.writeText(text).then(() => {
            msgElement.textContent = 'Texto copiado para a área de transferência!';
        }).catch(err => {
            msgElement.textContent = 'Falha ao copiar o texto.';
        });
    });
});
