// Generated by CoffeeScript 1.7.1

/*
    自古华山一条路
 */
var Animal, Dog, Horse, Person, Pet, Snake, Tribble, a, aStudents, b, changeNumbers, clearArray, courses, date, dish, eat, eldest, evens, exports, fill, food, hi, i, id, kids, list, menu, mood, name, numbers, opa, plus, sam, showA, students, sum, t1, t2, tim, tom, trigger, x, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

fill = function(container, liquid) {
  if (liquid == null) {
    liquid = 'coffee';
  }
  return "Filling the " + container + " width " + liquid;
};

kids = {
  brother: {
    name: 'Max',
    age: 11
  },
  sister: {
    name: 'Ida',
    age: 9
  }
};

changeNumbers = function() {
  var inner, outer;
  inner = -1;
  return outer = 10 + inner;
};

exports = exports != null ? exports : this;

if (true) {
  mood = 3;
}

if (mood === 3 && true) {

} else {
  console.log('good work');
}

date = mood > 2 ? 2 : 4;

plus = function(a, b) {
  if (a == null) {
    a = 2;
  }
  if (b == null) {
    b = 3;
  }
  return a + b;
};

sum = function() {
  var nums, result;
  nums = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  result = 0;
  nums.forEach(function(num) {
    return result += num;
  });
  return result;
};

trigger = function() {
  var events;
  events = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  events.splice(2, 0, 'a');
  return events;
};

fill = function(container, liquid) {
  if (liquid == null) {
    liquid = 'conffee';
  }
  return console.log('Filling the ' + container + ' width ' + liquid);
};

fill('zhangsan');

Tribble = (function() {
  function Tribble() {
    this.isAlive = true;
    Tribble.count++;
  }

  Tribble.prototype.breed = function() {
    if (this.isAlive) {
      return new Tribble;
    }
  };

  Tribble.prototype.die = function() {
    if (this.isAlive) {
      Tribble.count--;
    }
    return this.isAlive = false;
  };

  Tribble.count = 0;

  Tribble.makeTrouble = function() {
    var i;
    return console.log(((function() {
      var _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.count; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push('Trouble!');
      }
      return _results;
    }).call(this)).join(' '));
  };

  return Tribble;

})();

t1 = new Tribble();

t2 = new Tribble();

Tribble.makeTrouble();

t1.die();

Tribble.makeTrouble();

t2.breed().breed().breed();

Tribble.makeTrouble();

Pet = (function() {
  function Pet(sex) {
    this.sex = sex;
    this.isHungry = true;
  }

  Pet.prototype.eat = function() {
    return this.isHungry = false;
  };

  return Pet;

})();

Dog = (function(_super) {
  __extends(Dog, _super);

  function Dog(sex, age) {
    this.age = age;
    Dog.__super__.constructor.apply(this, arguments);
    console.log('constructor');
  }

  Dog.prototype.eat = function() {
    console.log('*crunch crunch*');
    return Dog.__super__.eat.call(this);
  };

  Dog.prototype.fetch = function() {
    console.log('Yip Yip');
    return this.isHungry = true;
  };

  return Dog;

})(Pet);

console.log((function() {
  return 'hello function';
})());

eat = function(food) {};

list = function(food) {};

menu = function(food) {};

_ref = ['toast', 'cheese', 'wine'];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  food = _ref[_i];
  eat(food);
}

courses = ['greens', 'caviar', 'truffles', 'roast', 'cake'];

for (i = _j = 0, _len1 = courses.length; _j < _len1; i = ++_j) {
  dish = courses[i];
  menu(i + 1, dish);
}

_ref1 = ['toast', 'cheese', 'wine'];
for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
  food = _ref1[_k];
  if (food !== 'cheese') {
    eat(food);
  }
}

evens = (function() {
  var _l, _results;
  _results = [];
  for (x = _l = 0; _l <= 10; x = _l += 2) {
    _results.push(x);
  }
  return _results;
})();

students = {
  '001': 'zhangsan',
  '002': 'lisi'
};

aStudents = (function() {
  var _results;
  _results = [];
  for (id in students) {
    if (!__hasProp.call(students, id)) continue;
    name = students[id];
    _results.push("" + id + ": " + name);
  }
  return _results;
})();

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

[].splice.apply(numbers, [3, 4].concat(_ref2 = [-3, -4, -5, -6])), _ref2;

console.log(numbers);

eldest = 27 > 25 ? 'zhangsan' : 'lisi';

console.log(eldest);

opa = {
  add: function(a, b) {},
  plus: function(a, b) {}
};

if (opa != null) {
  if (typeof opa.add === "function") {
    opa.add(1, 3);
  }
}

Animal = (function() {
  function Animal(name) {
    this.name = name;
  }

  Animal.prototype.move = function(meters) {
    return console.log(this.name + ("move " + meters + " m"));
  };

  return Animal;

})();

Snake = (function(_super) {
  __extends(Snake, _super);

  function Snake() {
    return Snake.__super__.constructor.apply(this, arguments);
  }

  Snake.prototype.move = function() {
    console.log('aaa');
    return Snake.__super__.move.call(this, 5);
  };

  return Snake;

})(Animal);

Horse = (function(_super) {
  __extends(Horse, _super);

  function Horse() {
    return Horse.__super__.constructor.apply(this, arguments);
  }

  Horse.prototype.move = function() {
    console.log('bbb');
    return Horse.__super__.move.call(this, 6);
  };

  return Horse;

})(Animal);

sam = new Snake('zhangsan');

tom = new Horse('lisi');

sam.move();

tom.move();

_ref3 = [1, 2], a = _ref3[0], b = _ref3[1];

console.log(a, b);

Person = (function() {
  function Person(options) {
    this.name = options.name, this.age = options.age, this.height = options.height;
  }

  return Person;

})();

tim = new Person({
  age: 25
});

(function() {
  return 'good work';
});

(function() {
  return 'good work';
})();

hi = function() {
  return 'hello world';
};

clearArray = function(arr) {
  arr.splice(0, arr.length);
};

console.log('test' + 5);

clearArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

x = true;

showA = function(x) {
  if (x == null) {
    x = x;
  }
  console.log(x ? 'good work' : 'nope');
};

showA();
