function Muppet(age, hobby) {
  this.age   = age; // Muppet.age = arg1
  this.hobby = hobby; // Muppet.hobby = arg2
  
  this.answerNanny = function(){ //Muppent.answerNanny = "Everything's cool!"
	return "Everything's cool!";
  }
}

function SwedishChef(age, hobby, mood) {
  Muppet.call(this, age, hobby); // calls Muppet(), but replaces "Muppet" with "SwedishChef"
  this.mood = mood; // SwedishChef.mood = arg3
  
  this.cook = function() { //SwedishChef.cook = "Mmmm soup!"
    return "Mmmm soup!";
  }
}

SwedishChef.prototype = new Muppet(); // 

describe("About inheritance", function() {
  beforeEach(function(){
    this.muppet      = new Muppet(2, "coding"); // assigns coding to hobby
  	this.swedishChef = new SwedishChef(2, "cooking", "chillin"); // re-assignes cooking to hobby
  });
  
  it("should be able to call a method on the derived object", function() {
    expect(this.swedishChef.cook()).toEqual("Mmmm soup!");
  });
  
  it("should be able to call a method on the base object", function() {
    expect(this.swedishChef.answerNanny()).toEqual("Everything's cool!");
  });
  
  it("should set constructor parameters on the base object", function() {
    expect(this.swedishChef.age).toEqual(2);
    expect(this.swedishChef.hobby).toEqual("cooking");
  });
  
  it("should set constructor parameters on the derived object", function() {
    expect(this.swedishChef.mood).toEqual("chillin");
  });
});

// http://javascript.crockford.com/prototypal.html
Object.prototype.beget = function () {
  function F() {}
  F.prototype = this;
  return new F();
}

function Gonzo(age, hobby, trick) {
  Muppet.call(this, age, hobby);
  this.trick = trick; // Gonzo gets a trick property that SwedishChef does not
  
  this.doTrick = function() { // Gonzo gets a doTrick method that SwedishChef does not
    return this.trick;
  }
}

// no longer need to call the Muppet (base type) constructor
Gonzo.prototype = Muppet.prototype.beget();
// note: if you're wondering how this line affects the below tests, the answer is that it doesn't.
// however, it does do something interesting -- it makes this work:
// var g = new Gonzo(...);  
  // ex: var joeMuppet = new anyOtherMuppet will inherit everything from the original "Muppet" object
  // this is thanks to the beget property added to the prototype object (allowing ALL object constructors access)
// g instanceOf Muppet // true

describe("About Crockford's inheritance improvement", function() {
  beforeEach(function(){
    this.gonzo = new Gonzo(3, "daredevil performer", "eat a tire");
  });
  
  it("should be able to call a method on the derived object", function() {
    expect(this.gonzo.doTrick()).toEqual("eat a tire");
  });
  
  it("should be able to call a method on the base object", function() {
    expect(this.gonzo.answerNanny()).toEqual("Everything's cool!");
  });
  
  it("should set constructor parameters on the base object", function() {
    expect(this.gonzo.age).toEqual(3);
    expect(this.gonzo.hobby).toEqual("daredevil performer");
  });
  
  it("should set constructor parameters on the derived object", function() {
    expect(this.gonzo.trick).toEqual("eat a tire");
  });
});
