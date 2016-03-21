(function () {
  function SongPlayer() {
    var SongPlayer = {};

    var currentBuzzObject = null;
    SongPlayer.currentSong.play = null;

    SongPlayer.play = function(song) {
      if (songplayer.play !== song) {
      setSong(song);
      currentBuzzObject.play();
      song.playing = true;
      }
    };

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

    var setSong = function(song) {
      if (currentBuzzObject) {
          currentBuzzObject.stop();
          songplayer.play.playing = null;
        } else if (songplayer.play === song) {
          if (currentBuzzObject.isPaused()) {
            currentBuzzObject.play();
          }
        };
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      songplayer.play = song;
    }

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

    return SongPlayer;
  }

  angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer)
})();