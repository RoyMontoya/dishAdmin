

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


function formFunc(event) {
	event.preventDefault();
	var nombre = document.getElementById("nombre").value;
	var description = document.getElementById("descripcion").value;
	var precio = document.getElementById("precio").value;
	var imagen = document.getElementById("imgDir").value;

	saveDish(nombre, description, precio, imagen);
	return false;
}

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		console.log("autorized");
	} else {
		console.log("not autorized")
		if(window.location.pathname !== "/index.html"){
			window.location = "index.html"	
		}

	}
});

var signOut = function(){
	firebase.auth().signOut().then(function() {
		console.log("sesion terminada");
		window.location = "index.html"
	}).catch(function(error) {
		console.log("Error at signOut "+ error);
	});
}

var printDishes = function(){
	var query = database.ref('dishes/');
	

	query.on('value', function(snapshot){
		var list = document.getElementById("list");
		snapshot.forEach(function(childSnapshot){
			console.log(childSnapshot.key);
			console.log(childSnapshot.val());
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();

			var li = document.createElement("li");
			var div = document.createElement("div");
			var img = document.createElement("img");
			var button = document.createElement("button")

			button.setAttribute("id", childKey);
			button.setAttribute("class", "btn btn-danger");
			button.setAttribute("onclick", "deleteDish(this.id)");
			button.appendChild(document.createTextNode("DeleteDish"));

			img.src = childData.path;
			img.height = 60;
			img.alt = "Dish Image";

			div.appendChild(img);
			div.style.float = "right"
			li.setAttribute("class", "list-group-item");
			li.appendChild(div);
			li.appendChild(document.createTextNode("Nombre: " + childData.name));
			li.appendChild(document.createElement("br"))
			li.appendChild(document.createTextNode("Description: " + childData.description));
			li.appendChild(document.createElement("br"))
			li.appendChild(document.createTextNode("Price: " + childData.precio));
			li.appendChild(document.createElement("br"))
			li.appendChild(button)
			list.appendChild(li);
		})
	});
}

var deleteDish = function(id){
	database.ref('dishes/' + id).remove()
	.then(function(){
		alert("dish deleted");
		console.log("dish deleted");
	})
	.catch(function(error){
		console.log("failed to delte dish: "+error)
	})
}

var saveDish = function(pName, pDesc, pPrice, pPath){
	database.ref('dishes/').push({name: pName,
		description: pDesc,
		precio: pPrice,
		path: pPath,
		quantity: 0})
	.then(function(){
		alert("dish added");
		window.location = addDish.html
	})
	.catch(function(error){
		alert("could not add dish " + error);
	});
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


var accessar = function(){
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(){
		console.log("signedin");
		window.location = "addDish.html"
	})
	.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage + " " + errorCode);
  // ...
});

}






