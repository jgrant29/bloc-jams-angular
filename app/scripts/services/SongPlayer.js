(function () {
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;
    var currentBuzzObject = null;

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
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
          currentSong.playing = null;
        } else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            currentBuzzObject.play();
          }
        };
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
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