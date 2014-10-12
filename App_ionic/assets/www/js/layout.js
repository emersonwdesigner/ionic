function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
                hash[1] = unescape(hash[1]);
                vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}

angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "home.html"
        }
      }
    })
    .state('eventmenu.adicionar', {
      url: "/adicionar",
      views: {
        'menuContent' :{
          templateUrl: "adicionar.html",
          controller: "AdicionarCtrl"
        }
      }
    })
    .state('eventmenu.attendees', {
      url: "/attendees",
      views: {
        'menuContent' :{
          templateUrl: "attendees.html",
          controller: "AttendeesCtrl"
        }
      }
    })
    .state('eventmenu.bancada', {
      url: "/bancada",
      views: {
        'menuContent' :{
          templateUrl: "bancada.html",
          controller: "BancadaCtrl"
        }
      }
    })
    .state('eventmenu.aguardando', {
      url: "/aguardando",
      views: {
        'menuContent' :{
          templateUrl: "aguardando.html",
          controller: "AguardandoCtrl"
        }
      }
    })
    .state('eventmenu.entregue', {
      url: "/entregue",
      views: {
        'menuContent' :{
          templateUrl: "entregue.html",
          controller: "EntregueCtrl"
        }
      }
    })
     .state('eventmenu.pronto', {
      url: "/pronto",
      views: {
        'menuContent' :{
          templateUrl: "pronto.html",
          controller: "ProntoCtrl"
        }
      }
    })
    .state('eventmenu.single', {
      url: "/single",
      views: {
        'menuContent' :{
          templateUrl: "single.html",
          controller: "singleCtrl"
        }
      }
    })


  $urlRouterProvider.otherwise("/event/home");
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  
  
  
})

.controller('AdicionarCtrl', function($scope, $ionicSideMenuDelegate) {

document.addEventListener("deviceready", onDeviceReady, false);
                var pictureSource;   // picture source
                var destinationType; // sets the format of returned value


                function onDeviceReady() {
                //fotos
                   pictureSource = navigator.camera.PictureSourceType;
                   destinationType = navigator.camera.DestinationType;
                          }

  $scope.showForm = true;

  $scope.attendee = {};
  $scope.submit = function() {
    if(document.getElementById('numero').value.length == 0) {
      alert('Número é necessário!');
      return;
    }
    if(document.getElementById('cliente').value.length == 0) {
      alert('Cliente é necessário!');
      return;
    }
    if(document.getElementById('descricao').value.length == 0) {
      alert('Descrição é necessário!');
      return; 
    }
    $scope.showForm = false;
    salvar();
   // $scope.attendees.push($scope.attendee);
  };
 $ionicSideMenuDelegate.toggleLeft();
})

.controller('AttendeesCtrl', function($scope) {

  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };

})
.controller('BancadaCtrl', function($scope, $ionicSideMenuDelegate) {

lista('bancada');
$ionicSideMenuDelegate.toggleLeft();
})
.controller('AguardandoCtrl', function($scope, $ionicSideMenuDelegate) {
lista('aguardando');
$ionicSideMenuDelegate.toggleLeft();
})
.controller('ProntoCtrl', function($scope, $ionicSideMenuDelegate) {
lista('pronto');
$ionicSideMenuDelegate.toggleLeft();
})
.controller('EntregueCtrl', function($scope, $ionicSideMenuDelegate) {
lista('entregue');
$ionicSideMenuDelegate.toggleLeft();
})
.controller('singleCtrl', function($scope, $ionicActionSheet) {

var pedaco = getUrlVars();


singleDB(pedaco['id']);
//document.getElementById('idsingle').value = pedaco['id'];

//opçoes single
   $scope.showActionsheet = function() {
    
    if(pedaco['tipo'] == 'bancada'){
    $ionicActionSheet.show({
      titleText: 'Opções',
      buttons: [
        
        { text: 'Aguardando <i class="icon ion-archive"></i>' },
        { text: 'Pronto <i class="icon ion-checkmark-round"></i>' },
        { text: 'Devolver <i class="icon ion-paper-airplane"></i>' },
        { text: 'Editar <i class="icon ion-composer"></i>' },
      ],
      destructiveText: 'Deletar <i class="icon ion-trash-a"></i>',
      cancelText: 'Cancelar',
      cancel: function() {
        console.log('CANCELLED');
       
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        alert(index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        
        exclui(pedaco['id']);
        alert('item excuido');
       
        return true;
      }
    });
    
    }
    
    
    
  };
  
 
});
