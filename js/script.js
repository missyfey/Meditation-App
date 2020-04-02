const app = () =>{
    const playPause = document.querySelector('.play-pause');
    const songPickBtns = document.querySelectorAll('.song-pick button');
    const timePicker = document.querySelectorAll('.time-pick button');
    const elapsedTimeHolder = document.querySelector('.elapsed-time');
    const vid = document.querySelector('.bgVideo');
    const audio = new Audio;
    audio.src = 'sounds/beach.mp3';
    var fakeTime = 120;

    //pick the time duration
    timePicker.forEach(btn=>{
        btn.addEventListener('click',()=>{
            fakeTime = btn.getAttribute('data-time');
            showElapsed(fakeTime);
        })
    })
    
    //show Elapsed time
    const showElapsed = (time) =>{
        audio.ontimeupdate = ()=>{
            var current = audio.currentTime;
            if(current<=time){
                var seconds = Math.floor(current % 60);
                if(seconds<10){
                    seconds = '0'+seconds;
                }
                var minutes = Math.floor(current / 60);
                if(minutes<10){
                    minutes = '0'+minutes;
                }
                elapsedTimeHolder.innerHTML = `${minutes} : ${seconds}`;
            }
            else{
                //song should paused - time is up
                audio.pause();
                playPause.src = 'svg/play.svg';
                playPause.alt = 'play-btn';
            }            
       }
    }

    //select the song and play
    songPickBtns.forEach(btn => {
        btn.addEventListener('click',()=>{
            const song = btn.getAttribute('data-sound');
            const video = btn.getAttribute('data-video');
            vid.src = video;
            checkforPlay(song);
            showElapsed(fakeTime);  
            vid.play();          
        })
    });
    //change the song function
    const checkforPlay = (song) =>{
        if(!audio.paused){
            audio.pause();
        }
        audio.src = song;
        audio.play();
        playPause.src = 'svg/pause.svg';
        playPause.alt = 'pause-btn';
    }
    //control over play and pause of the song
    playPause.addEventListener('click',(e)=>{
        var iconSrc = e.target.src;
        var icon = iconSrc.substring(iconSrc.length - 9);
        var iconName = icon.substring(icon,5);
        if(iconName != 'pause'){
            //should change the icon to pause and play song
            playPause.src = 'svg/pause.svg';
            playPause.alt = 'pause-btn';
            audio.play();
            vid.play();
        }else{
            //should change the icon to play and pause song
            playPause.src = 'svg/play.svg';
            playPause.alt = 'play-btn';
            audio.pause();
            vid.pause();
        }
    })
}

app();