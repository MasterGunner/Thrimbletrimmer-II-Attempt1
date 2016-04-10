app.controller('EditorController', ['$scope', '$filter', 'wubs', '$routeParams', '$mdDialog', function($scope, $filter, wubs, $routeParams, $mdDialog) {
  window.scope = $scope;
  window.filter = $filter;
  
  $scope.icons = {
      play: 'img/ic_play_arrow_white_24px.svg',
      pause: 'img/ic_pause_white_24px.svg',
      volume: 'img/ic_volume_up_white_24px.svg',
      mute: 'img/ic_volume_off_white_24px.svg',  //img/.svg
      goToStart:'img/ic_skip_previous_white_24px.svg',
      endReplay:'img/ic_replay_10_white_24px.svg'
  }
  
  $scope.video = {}
  $scope.wubsPlayer = document.getElementById("wubPlayer");
  $scope.player = {
      sliderRange: [0,0],
      stopAtEdit:false,
      playButtonIcon: $scope.icons.play,
      volumeButtonIcon: $scope.icons.volume,
      volumeDisplay:false,
      goToStartIcon: $scope.icons.goToStart,
      endReplayIcon: $scope.icons.endReplay,
      
      muteVideo: function() {
        $scope.wubsPlayer.muted = !$scope.wubsPlayer.muted
      },
      playVideo: function() {
        if(!$scope.wubsPlayer.paused) { 
          $scope.wubsPlayer.pause();
          $scope.player.playButtonIcon = $scope.icons.play;
        }
        else { 
          $scope.wubsPlayer.play();
          $scope.player.playButtonIcon = $scope.icons.pause; 
        }
      },
      setStart: function() {
        $scope.video.start = $scope.wubsPlayer.currentTime;
      },
      setEnd: function() {
        $scope.video.end = $scope.wubsPlayer.currentTime;
      },
      goToCutStart: function() {
        $scope.wubsPlayer.currentTime = $scope.video.start;
      },
      goToCutEndMinus10: function() {
        $scope.wubsPlayer.currentTime = $scope.video.end - 10;
      },
      editorStart: function(newTime) {
          if(arguments.length && /^\d*:?\d*:?\d*\.?\d*$/.test(newTime)) { //Validate
              return $scope.video.start = $filter('Reverse-Timestamp')(newTime);
          } else {
              return $filter('Timestamp')($scope.video.start,true);
          }
      },
      editorEnd: function(newTime) {
          if(arguments.length && /^\d*:?\d*:?\d*\.?\d*$/.test(newTime)) { //Validate
              return $scope.video.end = $filter('Reverse-Timestamp')(newTime);
          } else {
              return $filter('Timestamp')($scope.video.end,true);
          }
      }
          
  };
  
  $scope.form = {
      showEditPane = 0,
      submitVideo: function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
        $mdDialog.alert()
            .parent(angular.element(document.querySelector('body')))
            .clickOutsideToClose(true)
            .title('Successfully Submitted Video')
            .textContent($scope.video)
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
      }
  };
  wubs.success(function(data) {
    $scope.video = data[$routeParams.id];
    $scope.wubsPlayer.currentTime = $scope.video.start;
  });
  
  $scope.$watch('wubsPlayer.volume', function(volume) {
    if(volume == 0) { $scope.wubsPlayer.muted = true; }
    else { $scope.wubsPlayer.muted = false; }
  });
  $scope.$watch('wubsPlayer.muted', function(muted) {
      if(muted) { $scope.player.volumeButtonIcon = $scope.icons.mute; }
      else { $scope.player.volumeButtonIcon = $scope.icons.volume; }
  });
  $scope.$watch('wubsPlayer.currentTime', function(currentTime) {
      if($scope.player.stopAtEdit && currentTime >= $scope.video.end) { 
          $scope.wubsPlayer.pause();
          $scope.wubsPlayer.currentTime = $scope.video.end;
          $scope.player.playButtonIcon = $scope.icons.play;
      }
  });
  $scope.$watch('video.start', function(start) {
          $scope.player.sliderRange[0] = start;
  });
  $scope.$watch('video.end', function(end) {
          $scope.player.sliderRange[1] = end;
  });
  $scope.$watch('player.sliderRange', function(range) {
      $scope.video.start = range[0];
      $scope.video.end = range[1];
  });
}]);