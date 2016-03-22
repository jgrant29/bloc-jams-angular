(function () {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**
    * @desc Active song object form list of songs
    * @type {Object}
    */

    var currentAlbum = Fixtures.getAlbum();
    var currentBuzzObject = null;

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    SongPlayer.currentSong = null;

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
      setSong(song);
      currentBuzzObject.play();
      song.playing = true;
      }
    };

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
         stopSong(song);
         SongPlayer.currentSong.playing = null;
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
    };

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex < 0) {
         stopSong(song);
         SongPlayer.currentSong.playing = null;
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
    };

    var setSong = function(song) {
      if (currentBuzzObject) {
          stopSong(song);
          SongPlayer.currentSong.playing = null;
        } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            currentBuzzObject.play();
          }
        };
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    return SongPlayer;
  }

  angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer)
})();