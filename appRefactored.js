var model = {
	//Current cat showing on the catDetailView
	currentCat: null,
	currentCatIndex:null,

	//Cat class constructor
	/*
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
	*/

	CatList : [
	{name: "Cattie" , image: "images/cat.jpg" , count: 0},
	{name: "Chewie", image: "images/cat2.jpg" , count: 0},
	{name: "Zestie", image: "images/cat3.jpg" , count: 0},
	{name: "Grumpie" , image: "images/cat4.jpg" , count: 0},
	{name: "Cutie" , image: "images/cat5.jpg" , count: 0}
	]


};


var controller = {


	init: function(){
		
		catListView.init();
		catDetailView.init();
		adminPanelView.init();

	},

	setCurrentCat: function(cat){
		model.currentCat = cat;
		var index = controller.evaluateCurrentCatIndex(cat);
		controller.setCurrentCatIndex(index);

	},

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
		//return model.generateCats();
		return model.CatList;
	},

	incrementCounter:function(){
		model.currentCat.count++;
		catDetailView.render(model.currentCat);
		adminPanelView.render(model.currentCat);
	},

	adminView: false,

};


var catListView = {
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

		cancelButton.addEventListener('click', function(){
			adminArea.style.display = "none";
			controller.adminView = false;

		});

		saveButton.addEventListener('click', function(){
			var catName = imageCatName.value;
			var path = imageCatPath.value;
			var count = imageCatCount.value;
			controller.updateCurrentCat(catName, path, count);
			catListView.render();
		});

	},

	render: function(cat) {
		imageCatName.value = cat.name;
		imageCatPath.value = cat.image;
		imageCatCount.value = cat.count;

	}

};

controller.init();