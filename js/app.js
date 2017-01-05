
var map;

// car owners store info
var owner = {
  name:null,
  img:null
};


// google map api
function initMap(){
  map = new google.maps.Map(document.getElementById("map"),{
    center:{lat:49, lng:-123},
    zoom:8,
  });

  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('add'));
  autocomplete.bindTo('bounds', map);
  autocomplete.addListener('place_changed', function(){
      var place = autocomplete.getPlace();
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          }else {
            map.setCenter(place.geometry.location);
            map.setZoom(7);
          }
      });

  document.getElementById("update").onclick = function(){
    var carimg_val = document.getElementById("carimg").value;
    var des_val = document.getElementById("description").value;
    var time_val = document.getElementById("time").value;
    var phone_val = document.getElementById("phone").value;
    var place = autocomplete.getPlace();

    if(place){
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();

      $.ajax({
        url:"create.php",
        dataType:"html",
        type:"POST",
        data:{
          name:owner.name,
          profile:owner.img,
          carimg:carimg_val,
          description:des_val,
          time:time_val,
          phone:phone_val,
          lat: latitude,
          lng: longitude
        },
        success:function(resp){
          alert(resp);
        }
      }) // end ajax
    } // end if(place) statement
  } // end onclick function
} // end initmap function



//call map
document.getElementById("search").onclick = function(){

  var key = $("#carinfo").val();
  $.ajax({
    url:"read.php",
    dataType:"json",
    success:function(resp){
      console.log(resp);

      var str = "";
      for(var i=0;i<resp.length;i++){
        str+= "<h3>"+resp[i].lat+":"+resp[i].lng+"</h3>";

        var ownerName = resp[i].name;
        var ownerImg = "<img style='width:80px;' src='"+resp[i].profile+"'/>";
        var imgcar = resp[i].carimg;
        var carDes = resp[i].description;
        var tel = resp[i].phone;
        var time = resp[i].time;
        var olat = parseFloat(resp[i].lat);
        var olng = parseFloat(resp[i].lng);
        var LatLng = {lat: olat, lng: olng};

        var marker = new google.maps.Marker({
          map: map, 
          position: LatLng
        });

        // info window
        var info = new google.maps.InfoWindow({
          content: "<h4 style='display:inline;'>Owner: </h4>"+ownerName+"<br>"
          +ownerImg+"<br>"
          +"<h4 style='display:inline;'>Brand: </h4>"+imgcar+"<br>"+
          "<h4 style='display:inline;'>Description: </h4>"+carDes+"<br>"+
          "<h4 style='display:inline;'>Available on: </h4>"+time+"<br>"+
          "<h4 style='display:inline;'>Contact: </h4>"+tel
        });

        info.open(map, marker);
      } // end for loop
    } // end success function
  }) // end ajax

}// end search click




// facebook api
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1342901692395527',
    xfbml      : true,
    version    : 'v2.8'
  });

  var login = document.getElementById('login');
  var logout = document.getElementById('logout');

  login.onclick = function(){

    FB.login(function(resp) {
      console.log(resp);
      if (resp.status =="connected") {
          console.log("login");

          FB.api("/me?fields=name,picture", function(resp2){
            console.log(resp2);

            // we grab fbs information and transfer to our object
            owner.name = resp2.name;
            owner.img = resp2.picture.data.url;
          });
        } // end if statement
    }); // end fb.login function

  }; // end login click

  logout.onclick = function(){
    FB.logout(function(response){
  });

  alert("You are logged out");
  location.relaod();
  };

}; // end window fb function



 

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));










