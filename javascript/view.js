/**
This object acts like a helper that lets agents see the world.
**/
function View(world, vector) {
    this.world = world;
    this.vector = vector;
}

/**
Will look into the given direction. Returns a char representing the object found there.
**/
View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if(this.world.grid.isInside(target)){
        return charFromElement(this.world.grid.get(target));
    }
    else {
        return "#";
    }
};

/**
Finds all the directions in which the given char is found.
**/
View.prototype.findAll = function(ch) {
    var found = [];
    for(var dir in directions){
        if(this.look(dir) == ch){
            found.push(dir);
        }

    }
    return found;
};

/**
Returns a random direction in which the given char is found. It returns null if no directions contains the given char.
**/
View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length == 0) {
        return null;
    }
    console.log(found);
    return randomElement(found);
}

/**
Returns a random direction in which the given char is found. It returns null if no directions contains the given char.
**/
View.prototype.findSeveral = function(list) {
    var all = [];
    console.log("incoming ");
    console.log(list);
    for(var i = 0; i < list.length; i++)
    {
        all = all.concat(this.findAll(list[i]));
    }
    if(all.length == 0) 
    {
        return null;
    }
    return randomElement(all);
}
