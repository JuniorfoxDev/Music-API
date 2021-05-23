var preloader  = document.getElementById('loader');
function myFunction(){
preloader.style.display='none';
}

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".play-pause-btn");
let nxt_btn = document.querySelector(".next-track");
let previous_btn = document.querySelector(".previous-track");
let container_seek = document.querySelector(".container-seek");
let current_Time= document.querySelector(".current-time");
let total_time = document.querySelector(".total-time");
let track_index = 0 ;
let isPlaying = false;
let updateTime;
let current_track = document.createElement('audio');
dir = "Music/";
let Songtrack_list = [
    {
        name: "Hold On", 
        artist: "Justin Bieber", 
        image: "Image URL", 
        path: "https://firebasestorage.googleapis.com/v0/b/elevated-bonito-286813.appspot.com/o/yt1s.com%20-%20Justin%20Bieber%20%20Hold%20On.mp3?alt=media&token=959d231f-7c8c-4d18-986f-60149dab82ee",
        favorited : true,
        url:"https://www.plus2net.com/html_tutorial/button-linking.php"
    },
    {
        name: "Alone Pt. II", 
        artist: "Alan Walker & Ava Max ", 
        image: "https://firebasestorage.googleapis.com/v0/b/my-project-43089.appspot.com/o/218a34c1d7a1bb9d76ac02385773e502.jpg?alt=media&token=d5ecaad0-f02f-4d00-a2bf-442465e6dcfd", 
        path: "https://firebasestorage.googleapis.com/v0/b/elevated-bonito-286813.appspot.com/o/yt1s.com%20-%20Alan%20Walker%20%20Ava%20Max%20%20Alone%20Pt%20II.mp3?alt=media&token=2ba3218d-b487-42ab-b563-d82d5ce45ba2",
        favorited : false
    },
    {
        name: " Takeaway ", 
        artist: "The Chainsmokers, ILLENIUM  ", 
        image: "https://firebasestorage.googleapis.com/v0/b/my-project-43089.appspot.com/o/The-Chainsmokers-ILLENIUM-Takeaway-song-Ringtones.jpeg?alt=media&token=d6032623-620b-4a80-af82-3012eed0ab09", 
        path: "https://firebasestorage.googleapis.com/v0/b/elevated-bonito-286813.appspot.com/o/yt1s.com%20-%20The%20Chainsmokers%20ILLENIUM%20%20Takeaway%20Official%20Video%20ft%20Lennon%20Stella.mp3?alt=media&token=6a673430-317f-47fa-97a2-d28ca3443923"
    },
    {
        name: "Darkside ", 
        artist: "Alan Walker  ", 
        image: "https://firebasestorage.googleapis.com/v0/b/my-project-43089.appspot.com/o/alanwalkerdarkside.jpg?alt=media&token=d082fa2d-6725-4698-b677-2cdc8ce7eb14", 
        path: "https://firebasestorage.googleapis.com/v0/b/elevated-bonito-286813.appspot.com/o/yt1s.com%20-%20Alan%20Walker%20%20Darkside%20feat%20AuRa%20and%20Tomine%20Harket.mp3?alt=media&token=9e5921c6-67bd-4d03-b851-c35dc503678f"
    },
    {
        name: "Ignite ", 
        artist: "Alan Walker & K-391  ", 
        image: "https://firebasestorage.googleapis.com/v0/b/my-project-43089.appspot.com/o/a89eb8ffd31a14984e910b31d060be2c.1000x1000x1.jpg?alt=media&token=d9ea09bf-fb2a-4280-b1ca-e2f9cb7de360", 
        path: "https://firebasestorage.googleapis.com/v0/b/elevated-bonito-286813.appspot.com/o/yt1s.com%20-%20K391%20%20Alan%20Walker%20%20Ignite%20feat%20Julie%20Bergan%20%20Seungri.mp3?alt=media&token=80cdda4c-12e4-4950-bfa9-c298e0dddd9f"
    },
    {
        name: "Legends Never Die  ", 
        artist: "Against The Current ", 
        image: "https://firebasestorage.googleapis.com/v0/b/my-project-43089.appspot.com/o/previewfile_1135570608.jpg?alt=media&token=5c9f46a9-aef3-4327-9047-0b4e484c6de0", 
        path: "https://firebasestorage.googleapis.com/v0/b/elevated-bonito-286813.appspot.com/o/yt1s.com%20-%20Legends%20Never%20Die%20ft%20Against%20The%20Current%20%20Worlds%202017%20%20League%20of%20Legends.mp3?alt=media&token=f7ae41f6-6918-475d-8149-4881a6df4532"
    },
    {
        name: "Sunflower   ", 
        artist: "Post Malone, Swae Lee  ", 
        image: "https://firebasestorage.googleapis.com/v0/b/my-project-43089.appspot.com/o/metalocus_music-video_spider-man_02.jpg?alt=media&token=e480c98c-2f37-4407-8277-0b4049ef931a", 
        path: "https://firebasestorage.googleapis.com/v0/b/elevated-bonito-286813.appspot.com/o/yt1s.com%20-%20Post%20Malone%20Swae%20Lee%20%20Sunflower%20SpiderMan%20Into%20the%20SpiderVerse.mp3?alt=media&token=02c50775-1bae-4371-bcd1-504cd1a6d3ef"
    },
];
ext = ".mp3";
function loadTrack(track_index){
    clearInterval(updateTime);
    resetValues();
                current_track.src = Songtrack_list[track_index].path;
                current_track.load();
                track_art.style.backgroundImage = "url(" + Songtrack_list[track_index].image + ")"; 
                track_name.textContent = Songtrack_list[track_index].name;
                track_artist.textContent = Songtrack_list[track_index].artist;
                now_playing.textContent  = "Playing" +  (track_index + 1 ) +"Of" + Songtrack_list.length;
                updateTime = setInterval(seekUpdate,1000);
    current_track.addEventListener("ended",nextTrack);
}
function resetValues() {
    current_Time.textContent = "00:00";
    total_time.textContent = "00:00";
    container_seek.value = 0 ;
}
function playpauseTrack(){
    if(!isPlaying) playTrack();
    else pauseTrack();
}
function playTrack(){
    current_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}
function Visit(){
    location.href = "https://www.youtube.com/playlist?list=PLi1o_YYO3gK0OiSXiFlaJTkiH74XxLcXc"
}
function pauseTrack(){
    current_track.pause();
    isPlaying = false ;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}
function nextTrack(){
    if  (track_index < Songtrack_list.length - 1){
    track_index += 1 ;
    }
    else {
     track_index = Songtrack_list.length;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack() {
    if(track_index > 0){
        track_index -= 1;
    } else {track_index = Songtrack_list.length;}
    loadTrack(track_index);
    playTrack();
}
function seekTo() {
    seekto = current_track.duration * (container_seek.value / 100 );
    current_track.currentTime= seekto;
}
function seekUpdate(){
 let seekPosition =  0 ;
 if(!isNaN(current_track.duration)){
    seekPosition = current_track.currentTime * ( 100 / current_track.duration); 
    container_seek.value = seekPosition; 
 
    let currentMinutes = Math.floor(current_track.currentTime/ 60); 
    let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60); 
    let durationMinutes = Math.floor(current_track.duration / 60); 
    let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60); 
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
    current_Time.textContent = currentMinutes + ":" + currentSeconds; 
    total_time.textContent = durationMinutes + ":" + durationSeconds; 
 }
}
// heart Effect 
const redHeart = "\u2764";
const whiteHeart = '\u2661';
const btn02 = document.querySelector('.favorited');
btn02.addEventListener('click', toggle);
function toggle(){
    const like  = btn02.textContent;
    if(like === whiteHeart){
        btn02.textContent = redHeart;
    }
    else{
        btn02.textContent = whiteHeart;
    }
}
loadTrack(track_index);
