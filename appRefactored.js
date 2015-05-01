var model = {
	//Current cat showing on the catDetailView
	currentCat: null,

	//Cat class constructor
	Cat : function(name, image){
			this.name = name;
			this.image = image;
			this.count = 0;

			this.incrementCount = function incrementCount(){
				this.count++;
			}
	},


	
	generateCats: function(){
		var cat1, cat2, cat3, cat4, cat5;
		cat1 = new model.Cat("Cattie", "images/cat.jpg");
		cat2 = new model.Cat ("Chewie", "images/cat2.jpg");
		cat3 = new model.Cat ("Zestie", "images/cat3.jpg");
		cat4 = new model.Cat ("Grumpie", "images/cat4.jpg");
		cat5 = new model.Cat ("Cutie", "images/cat5.jpg");

		var catList = [cat1, cat2, cat3, cat4, cat5];

		return catList;
	},
	
	
};


var controller = {


	init: function(){
		
		catListView.init();
		catDetailView.init();
		adminPanelView.init();

	},

	setCurrentCat: function(cat){
		model.currentCat = cat;
	},

	getCurrentCat:function(){
		return model.currentCat;
	},

	updateCurrentCat: function(name, path, count){
		model.currentCat.name = name;
		model.currentCat.image = path;
		model.currentCat.count = count;

		
		catDetailView.render(model.currentCat);
		adminPanelView.render(model.currentCat);

	},

	getCats: function(){
		return model.generateCats();
	},

	incrementCounter:function(){
		model.currentCat.incrementCount();
		catDetailView.render(model.currentCat);
		adminPanelView.render(model.currentCat);
	},

	adminView: false,

};


var catListView = {
	init: function(){
		catListView.render();
	},	

	render: function(){
		var catList = controller.getCats();
		controller.setCurrentCat(catList[0]);
		catList.forEach(function(cat){
			var listElement = document.createElement("li");
			var node = document.createTextNode(cat.name);
			listElement.appendChild(node);

			var element = document.getElementById("cat_list");
			element.appendChild(listElement);

			listElement.addEventListener("click", (function(cat){

				return function(){
					controller.setCurrentCat(cat);
					catDetailView.render(cat);
				};
				
			})(cat));
		});
	}
};

var catDetailView = {
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

	render: function(cat){
		//var cat = controller.getCurrentCat();
		this.catPicElem.src = cat.image;
		this.catNameElem.innerHTML = cat.name;
		this.countElem.innerHTML = cat.count;

	}

};


var adminPanelView = {

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


		var cat = controller.getCurrentCat();	
		
		
		adminButton.addEventListener('click', function(){
			if (controller.adminView == false){
				adminArea.style.display = "block";
				adminPanelView.render(cat);
				controller.adminView = true;
			}else{
				adminArea.style.display = "none";
				controller.adminView = false;
			
			}
		});

		cancelButton.addEventListener('click', function(){
			adminArea.style.display = "none";
			controller.adminView = false;

		});

		saveButton.addEventListener('click', function(){
			var catName = imageCatName.value;
			var path = imageCatPath.value;
			var count = imageCatCount.value;
			controller.updateCurrentCat(catName, path, count);

		});

	},

	render: function(cat) {
		imageCatName.value = cat.name;
		imageCatPath.value = cat.image;
		imageCatCount.value = cat.count;

	}

};

controller.init();