

 var config = {
    apiKey: "AIzaSyALhmV1O7I2U7UYCtAKpwLNfdxoTJHs_-s",
    authDomain: "admin-21d2a.firebaseapp.com",
    databaseURL: "https://admin-21d2a.firebaseio.com",
    projectId: "admin-21d2a",
    storageBucket: "admin-21d2a.appspot.com",
    messagingSenderId: "66519554701"
  };
  firebase.initializeApp(config);

var database = firebase.database();


function formFunc() {
	var nombre = document.getElementById("nombre").value;
	var description = document.getElementById("descripcion").value;
	var precio = document.getElementById("precio").value;
	var imagen = document.getElementById("imgDir").value;

	saveDish(nombre, description, precio, imagen);
}

var printDishes = function(){
	var query = database.ref('dishes/');
query.on('value', function(snapshot){
	snapshot.forEach(function(childSnapshot)){
		console.log(childSnapshot.key);
		console.log(childSnapshot.val();
	}
});
}


var saveDish = function(pName, pDesc, pPrice, pPath){
	database.ref('dishes/').push({name: pName,
		description: pDesc,
		precio: pPrice,
		path: pPath,
		quantity: 0});
}

var storage = firebase.storage();
var storageRef = storage.ref();

function uploadImage(){
	var preview = document.querySelector('img');
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();

	reader.onloaded = function(){
		preview.src = reader.result;
	}

	if(file){
		reader.readAsDataURL(file);
		var upload = storageRef.child('dishes/' + file.name).put(file);

		upload.on('state_changed', function(snapshot){

		}, function(error){
			console.log("error " + error)
		}, function(){
			console.log(upload.snapshot.downloadURL);
			document.getElementById("imgDir").value = upload.snapshot.downloadURL;
		})
	}else{
		preview.src = "";
	}
}






