var dog,dogImg,happyDogImg,database,foodS,foodStock;
var feed,addFood;
var lastFed,fedTime;
var foodObj;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(1000,500);
  database = firebase.database();
 
  foodObj = new Food();

 
  dog = createSprite(800,200,150,150);
  dog.addImage("dog",dogImg);
  dog.scale = 0.15;

feed = createButton("FEED THE DOG");
feed.position(700,95);
feed.mousepressed(dogImg);

addFood = createButton("ADD FOOD");
addFood.position(800,95);
addFood.mousepressed(addFoods);
}


function draw() {  
background(46, 139, 87);

foodStock = database.ref('Food');
foodStock.on("value",function (data){
  lastFed = data.val();
});

fill(255);
textSize(20);
if (lastFed >= 12){
  text("Last Feed :"+ lastFed%12 + "PM",350,30);
}

else if(lastFed === 0) {
text("Last Feed : 12 AM",350,30);
}

else{
  text("Last Feed : "+ lastFed + "AM",250,30);
}

if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
  textSize(20);
  text("FOOD REMAINING",20,30);
}
foodObj.display();
  drawSprites();
}

function readStock(data){
foodS=data.val();
}

function writeStock(x){
if (x<=0){
  x = 0;
}
else{
  x = x-1;
}
database.ref('/').update({
  Food:x
});
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}