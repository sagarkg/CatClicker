var Cat = function(name, image){
			this.name = name;
			this.image = image;
			this.count = 0;

			this.incrementCount = function incrementCount(){
				this.count++;
			}
}

		

cat1 = new Cat("Cattie", "images/cat.jpg");
cat2 = new Cat ("Chewie", "images/cat2.jpg");
cat3 = new Cat ("Zestie", "images/cat3.jpg");
cat4 = new Cat ("Grumpie", "images/cat4.jpg");
cat5 = new Cat ("Cutie", "images/cat5.jpg");

catList = [cat1, cat2, cat3, cat4, cat5];

//Pic Area
var imageCatName = document.getElementById("catName");
var imageCatPath= document.getElementById("catPic");
var imageCatCount= document.getElementById("count");

//Admin Area Buttons
var adminButton = document.getElementById("admin_button");
var adminArea = document.getElementById("admin_area");
var saveButton = document.getElementById("save"); 
var cancelButton = document.getElementById("cancel"); 

//Admin Area Fields
var adminCatName = document.getElementById("admin_cat_name");
var adminPath = document.getElementById("admin_path");
var adminCount = document.getElementById("admin_count");


var showAdminArea = function(){
	adminArea.style.display = "block";
};
var hideAdminArea = function(){
	adminArea.style.display = "none";
};	



catList.forEach(function(cat){
	var listElement = document.createElement("li");
	var node = document.createTextNode(cat.name);
	listElement.appendChild(node);

	var element = document.getElementById("cat_list");
	element.appendChild(listElement);

	listElement.addEventListener("click", function(){
		imageCatPath.src = cat.image;
		imageCatName.innerHTML = cat.name;
		imageCatCount.innerHTML = cat.count;
		adminCatName.value = cat.name;
		adminPath.value = cat.image;
		adminCount.value = cat.count;
	});
});

function getClickedCat(){
	var catName = document.getElementById("catName").innerHTML;
	//alert(catName);
	for(var i = 0; i < catList.length; i++) {
		//alert(cat.name);
		if(catList[i].name == catName){
			return catList[i];
			alert(catList[i].name);
		}
	}
}

document.getElementById("catPic").addEventListener("click", function(){
		var currentCat = getClickedCat();
		currentCat.incrementCount();
		document.getElementById('count').innerHTML = currentCat.count;
	
});



adminButton.addEventListener('click', function(){
	if (adminArea.style.display == "none"){
		showAdminArea();
	}else{
		hideAdminArea();
	}	

});

cancelButton.addEventListener('click', function(){
	adminCatName.value="";
	adminPath.value="";
	adminCount.value="";
	hideAdminArea();

});


