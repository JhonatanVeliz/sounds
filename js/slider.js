(() => {
    // Valores del slider
    const imagenes = [...document.querySelectorAll('.img')];

    let contador = 0;

    setInterval(() => {
        imagenes[contador].classList.add('mover');

        contador++;
        if (contador === 3) {
            contador = 0;
            imagenes.forEach((e) => {
                e.classList.remove('mover');
            })
        }
    }, 5000)
})();
