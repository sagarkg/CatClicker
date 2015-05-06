/*MVC in pure Javascript without using any frameworks */

//Model 
var model = {
	//Current cat showing in the catDetailView
	currentCat: null,
	
	//Index(from catList array) of the currently displayed cat
	currentCatIndex:null;

	//Collection of cat objects.
	CatList : [
	{name: "Cattie" , image: "images/cat.jpg" , count: 0},
	{name: "Chewie", image: "images/cat2.jpg" , count: 0},
	{name: "Zestie", image: "images/cat3.jpg" , count: 0},
	{name: "Grumpie" , image: "images/cat4.jpg" , count: 0},
	{name: "Cutie" , image: "images/cat5.jpg" , count: 0}
	]


};

//Controller
var controller = {

	//Initialize initial state of app for catlistView, catDetailView and adminPanelView
	init: function(){
		
		catListView.init();
		catDetailView.init();
		adminPanelView.init();

	},

	//Manipulate model view to set currentCat object
	setCurrentCat: function(cat){
		model.currentCat = cat;
		var index = controller.evaluateCurrentCatIndex(cat);
		controller.setCurrentCatIndex(index);

	},

	//Get the cat object this is currently set
	getCurrentCat:function(){
		return model.currentCat;
	},


	setCurrentCatIndex:function(index){
		model.currentCatIndex = index;
	},

	getCurrentCatIndex: function(){
		return model.currentCatIndex;
	},

	evaluateCurrentCatIndex: function(cat){
		for (var i=0; i< model.CatList.length; i++){
			if (cat.name == model.CatList[i].name && cat.image == model.CatList[i].image){
				return i;
				break;
			}
		}
	},

	//Update the details of the current cat in catDetailView as well cat Data Model
	updateCurrentCat: function(name, path, count){
		var index = controller.getCurrentCatIndex();

		model.currentCat.name = name;
		model.currentCat.image = path;
		model.currentCat.count = count;

		controller.updateCurrentCatList(index, model.currentCat);
		
		catDetailView.render(model.currentCat);
		adminPanelView.render(model.currentCat);
		
	},

	updateCurrentCatList:function(index, cat){
		model.CatList[index].name = cat.name;
		model.CatList[index].image = cat.image;
		model.CatList[index].count = cat.count;
	},

	getCats: function(){
		return model.CatList;
	},

	incrementCounter:function(){
		model.currentCat.count++;
		catDetailView.render(model.currentCat);
		adminPanelView.render(model.currentCat);
	},

	adminView: false,

};



//Views

//View extreme left of the page that shows the list of cats
var catListView = {
	//Initial state of catList View
	init: function(){
		var catList = controller.getCats();
		controller.setCurrentCat(catList[0]);
		for (var i=0; i< catList.length; i++){
			var listElement = document.createElement("li");
			
			var element = document.getElementById("cat_list");
			element.appendChild(listElement);


		}

		catListView.render();
	},	

	//Render catListView 
	render: function(){
		var catList = controller.getCats();
		var listElements = document.getElementsByTagName("li");
		for(var i=0; i<listElements.length; i++){
			
			//var node = document.createTextNode(catList[i].name);
			listElements[i].innerHTML = catList[i].name;

			listElements[i].addEventListener("click", (function(i){

				return function(){
					
					controller.setCurrentCat(catList[i]);
					catDetailView.render(catList[i]);
					adminPanelView.render(catList[i])

				};
				
			})(i));
			
		}


		
	}
};

//View that shows the details of the cat viz: image, name, clickCount
var catDetailView = {
	//initialize the catDetail view	
	init: function(){
		this.catPicElem = document.getElementById("catPic");
		this.catNameElem = document.getElementById("catName");
		this.countElem = document.getElementById("count");


		this.catPicElem.addEventListener('click', function(){
			
			controller.incrementCounter();
						
		});
		var cat = controller.getCurrentCat();
		this.render(cat);
	},

	//render view
	render: function(cat){
		//var cat = controller.getCurrentCat();
		this.catPicElem.src = cat.image;
		this.catNameElem.innerHTML = cat.name;
		this.countElem.innerHTML = cat.count;

	}

};

//Admin anel Views lets you change the data for each cat. 
var adminPanelView = {
	//Initialize initial admin View
	init: function(){
		//Admin Fields
		imageCatName = document.getElementById("admin_cat_name");
		imageCatPath= document.getElementById("admin_path");
		imageCatCount= document.getElementById("admin_count");

		//Admin Buttons
		adminButton = document.getElementById("admin_button");
		adminArea = document.getElementById("admin_area");
		saveButton = document.getElementById("save"); 
		cancelButton = document.getElementById("cancel"); 


			
		
		//add Event Listeners to toggle admin View state onclick
		adminButton.addEventListener('click', function(){
			var cat = controller.getCurrentCat();
			if (controller.adminView == false){
				adminArea.style.display = "block";
				adminPanelView.render(cat);
				controller.adminView = true;
			}else{
				adminArea.style.display = "none";
				controller.adminView = false;
			
			}
		});

		//Discards data in inputs(if changed) and hides Admin Panel
		cancelButton.addEventListener('click', function(){
			adminArea.style.display = "none";
			controller.adminView = false;

		});

		//Applies changes to the cat list view and cat detail view
		saveButton.addEventListener('click', function(){
			var catName = imageCatName.value;
			var path = imageCatPath.value;
			var count = imageCatCount.value;
			controller.updateCurrentCat(catName, path, count);
			catListView.render();
		});

	},

	//render Admin View
	render: function(cat) {
		imageCatName.value = cat.name;
		imageCatPath.value = cat.image;
		imageCatCount.value = cat.count;

	}

};

//Start the execution of the app
controller.init();