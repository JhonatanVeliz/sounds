(()=>{
    // Valores de las canciones
    const audios = [
        {
            title : 'Pad en C',
            file : './music/C.mp3',
        },
        {
            title : 'Pad en D',
            file : './music/D.mp3',
        },
        {
            title : 'Pad en E',
            file : './music/E.mp3',
        },
        {
            title : 'Pad en F',
            file : './music/F.mp3',
        },
        {
            title : 'Pad en G',
            file : './music/G.mp3',
        },
        {
            title : 'Pad en A',
            file : './music/A.mp3',
        },
        {
            title : 'Pad en B',
            file : './music/B.mp3',
        },
        {
            title : 'Pad en C#',
            file : './music/Csos.mp3',
        },
        {
            title : 'Pad en D#',
            file : './music/Dsos.mp3',
        },
        {
            title : 'Pad en F#',
            file : './music/Fsos.mp3',
        },
        {
            title : 'Pad en G#',
            file : './music/Gsos.mp3',
        },
        {
            title : 'Pad en A#',
            file : './music/Asos.mp3',
        }
    ]

    // Valores del reproductor
    const escuchar    = document.querySelectorAll('.escuchar'),
          reproductor = document.querySelectorAll('.reproductor'),
          btnCerrar   = document.querySelectorAll('.cerrar'),
          audio       = document.querySelectorAll('.audio');  

    // Valores de los botones que manipulan el reproductor
    const btnPlay   = document.querySelectorAll('.play'),
          plus      = document.querySelectorAll('.left'),
          back      = document.querySelectorAll('.right'),
          sonido    = document.querySelectorAll('.sonido');

    // valor del boton descargar
    const btnDescargar = document.querySelectorAll('.descargar');

    // barra de carga del audio
    const barraDeCarga = document.querySelectorAll('.barra'),
          changeBar    = document.querySelectorAll('.change-bar');

    // Valor del indicador de tiempo del audio
    const indicadorDeAudio = document.querySelectorAll('.change__text');

    // Funcion que al ejecutarse se descarge la cancion con el FILE indicado
    btnDescargar.forEach( (element, index)=>{
        element.addEventListener('click', ()=>{
            element.download = audios[index].title;
            element.href = audios[index].file;
        })
    })

    // ForEach de los botones escuchar que traera el reproductor a la vista al ser clikeado
    escuchar.forEach( (element, index)=>{

        element.addEventListener('click', ()=>{
            reproductor[index].classList.add('reproductor--active');
        })

        btnCerrar[index].addEventListener('click', ()=>{
            reproductor[index].classList.remove('reproductor--active');
            pausarAudio(index);
            reiniciarElAudio(index);
            btnPlay[index].alt = 'play';
            btnPlay[index].src = './img/icons/play.png';
        })

        // width de la barra de progreso
        barraDeCarga[index].addEventListener('mousemove', ()=>{
            changeBar[index].style.width = `${barraDeCarga[index].value}%`;
        })

        // barra de progreso modifica el audio si es modificada
        barraDeCarga[index].addEventListener('change', ()=>{
            audio[index].currentTime = audio[index].duration * barraDeCarga[index].value / 100; 
            indicadorDeAudio[index].textContent = `${Math.round(audio[index].currentTime  / 60 )}:${Math.round(audio[index].currentTime  % 60 )}`;
        })

        // PISTA FILE DEL AUDIO SELECCIONADO -------------------------------------------------------
        audio[index].src = audios[index].file;

        // CONTADOR DE LA BARRA DE TIEMPO DEL AUDIO
        audio[index].addEventListener('timeupdate', (e)=> {
            const {currentTime} = e.target;

            indicadorDeAudio[index].textContent = `${Math.round(currentTime  / 60 )}:${Math.round(currentTime  % 60 )}`;

            barraDeCarga[index].value = (currentTime / audio[index].duration) * 100;
        })
    } )

    // ForEach de los botones mute para cambiar el icono
    sonido.forEach( (element, index)=>{
        element.addEventListener('click', ()=>{
            if(element.alt === 'sonar'){
                sonido[index].src = './img/icons/mute.png';
                element.alt = 'mute';
                audio[index].volume = 0;
            }else if(element.alt === 'mute'){
                sonido[index].src = './img/icons/audio.png';
                element.alt = 'sonar';
                audio[index].volume = 1;
            }
        } )
    })

    btnPlay.forEach( (element, index)=>{
        element.addEventListener('click', ()=>{
            if(element.alt === 'play'){
                audioPlay(index);
                element.src = './img/icons/pause.png';
                element.alt = 'pause';
            }else if(element.alt === 'pause'){
                pausarAudio(index);
                element.src = './img/icons/play.png';
                element.alt = 'play';
            }
        })
    })

    // Funcion que da play al audio
    const audioPlay = (index)=>{
        audio[index].play();
    };

    // Funcion que quita el audio
    const pausarAudio = (index)=>{
        audio[index].pause();
    };

    // Funcion que pone el tiempo de el audio en 0
    const reiniciarElAudio = (index)=>{
        audio[index].currentTime = 0;
    };

    // -------------------------------- Adelantar y atrasar ------------------------------------
    plus.forEach( (element, index)=>{
        element.addEventListener('click', ()=>{
            audio[index].currentTime += 10;
        })
    })

    back.forEach( (element, index)=>{
        element.addEventListener('click', ()=>{
            audio[index].currentTime -= 10;
        })
    })
    
})();