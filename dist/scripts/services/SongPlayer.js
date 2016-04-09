(function () {
  function SongPlayer($rootScope, Fixtures) {
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

    SongPlayer.currentTime = null;

    SongPlayer.volume = null;

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
          setSong(song);
          currentBuzzObject.play();
          song.playing = true;
        } else if (SongPlayer.currentSong === song) {
           if (currentBuzzObject.isPaused()) {
               playSong(song);
            }
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

    SongPlayer.setVolume = function(volume){
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }

    };

    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
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

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
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
      .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();