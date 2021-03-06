// Generated by CoffeeScript 1.7.1
(function() {
  var Craps, Dice, DiceFactory, Dot, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = typeof window !== "undefined" && window !== null ? window : global;

  Dot = (function() {
    function Dot(ctx, pos, dotR) {
      this.ctx = ctx;
      this.pos = pos;
      this.dotR = dotR;
    }

    Dot.prototype.render = function() {
      this.ctx.beginPath();
      this.ctx.arc(this.pos[0], this.pos[1], this.dotR, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
    };

    Dot.dots = function(ctx, aPos, dotR) {
      var pos, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = aPos.length; _i < _len; _i++) {
        pos = aPos[_i];
        _results.push(new Dot(ctx, pos, dotR).render());
      }
      return _results;
    };

    return Dot;

  })();

  Dice = (function() {
    function Dice(ctx, diceX, diceY) {
      this.ctx = ctx;
      this.diceX = diceX;
      this.diceY = diceY;
      this.diceW = 100;
      this.diceH = 100;
      this.dotR = 6;
      this.dots = [];
      this.dotp = this.dotR * 3;
    }

    Dice.prototype.draw = function() {
      this.ctx.beginPath();
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = '#000';
      this.ctx.clearRect(this.diceX, this.diceY, this.diceW, this.diceH);
      this.ctx.strokeRect(this.diceX, this.diceY, this.diceW, this.diceH);
      this.ctx.fillStyle = '#f00';
      return Dot.dots(this.ctx, this.dots, this.dotR);
    };

    Dice.prototype.getDots = function() {
      return this.dots;
    };

    return Dice;

  })();

  root.Dice1 = (function(_super) {
    __extends(Dice1, _super);

    function Dice1(ctx, diceX, diceY) {
      Dice1.__super__.constructor.apply(this, arguments);
      this.dots = [[this.diceX + 0.5 * this.diceW, this.diceY + 0.5 * this.diceH]];
    }

    return Dice1;

  })(Dice);

  root.Dice2 = (function(_super) {
    __extends(Dice2, _super);

    function Dice2(ctx, diceX, diceY) {
      Dice2.__super__.constructor.apply(this, arguments);
      this.dots = [[this.diceX + this.dotp, this.diceY + this.dotp], [this.diceX + this.diceW - this.dotp, this.diceY + this.diceH - this.dotp]];
    }

    return Dice2;

  })(Dice);

  root.Dice3 = (function(_super) {
    __extends(Dice3, _super);

    function Dice3(ctx, diceX, diceY) {
      Dice3.__super__.constructor.apply(this, arguments);
      this.dice1 = new root.Dice1(ctx, diceX, diceY);
      this.dice2 = new root.Dice2(ctx, diceX, diceY);
      this.dots = this.dice1.getDots().concat(this.dice2.getDots());
    }

    return Dice3;

  })(Dice);

  root.Dice4 = (function(_super) {
    __extends(Dice4, _super);

    function Dice4(ctx, diceX, diceY) {
      Dice4.__super__.constructor.apply(this, arguments);
      this.dots = [[this.diceX + this.dotp, this.diceY + this.dotp], [this.diceX - this.dotp + this.diceW, this.diceY + this.dotp], [this.diceX + this.dotp, this.diceY - this.dotp + this.diceH], [this.diceX - this.dotp + this.diceW, this.diceY - this.dotp + this.diceH]];
    }

    return Dice4;

  })(Dice);

  root.Dice5 = (function(_super) {
    __extends(Dice5, _super);

    function Dice5(ctx, diceX, diceY) {
      Dice5.__super__.constructor.apply(this, arguments);
      this.dice1 = new root.Dice1(ctx, diceX, diceY);
      this.dice4 = new root.Dice4(ctx, diceX, diceY);
      this.dots = this.dice1.getDots().concat(this.dice4.getDots());
    }

    return Dice5;

  })(Dice);

  root.Dice6 = (function(_super) {
    __extends(Dice6, _super);

    function Dice6(ctx, diceX, diceY) {
      Dice6.__super__.constructor.apply(this, arguments);
      this.dice4 = new root.Dice4(ctx, diceX, diceY);
      this.dots = [[this.diceX + this.dotp, this.diceY + 0.5 * this.diceH], [this.diceX - this.dotp + this.diceW, this.diceY + 0.5 * this.diceH]].concat(this.dice4.getDots());
    }

    return Dice6;

  })(Dice);

  DiceFactory = {
    draw: function(ctx, pos, i) {
      new root['Dice' + i](ctx, pos[0], pos[1]).draw();
    }
  };

  Craps = (function() {
    function Craps() {
      var ch, ctx, pos1, pos2, _base;
      ctx = typeof (_base = $('#craps').get(0)).getContext === "function" ? _base.getContext('2d') : void 0;
      this.stage = $('#stage');
      this.point = $('#point');
      this.outCome = $('#outCome');
      this.money = 100;
      this.bank = $('#bank').text(this.money);
      pos1 = [10, 10];
      pos2 = [130, 10];
      ch = 0;
      this.prevThrow = false;
      $('#throw').click((function(_this) {
        return function() {
          if (_this.money < 10) {
            return alert('你的余额不足了！');
          }
          _this.money -= 10;
          _this.sum = 0;
          ch = Craps.getRandom();
          DiceFactory.draw(ctx, pos1, ch);
          _this.sum += ch;
          ch = Craps.getRandom();
          DiceFactory.draw(ctx, pos2, ch);
          _this.sum += ch;
          _this.output();
        };
      })(this));
    }

    Craps.prototype.output = function() {
      if (this.prevThrow === false) {
        switch (this.sum) {
          case 7:
          case 11:
            return this.finish(true, 1);
          case 2:
          case 3:
          case 12:
            return this.finish(true, 0);
          default:
            return this.finish(false, 2);
        }
      } else {
        switch (this.sum) {
          case this.prevThrow:
            return this.finish(true, 1);
          case 7:
            return this.finish(true, 0);
          default:
            return this.finish(false, 2);
        }
      }
    };

    Craps.prototype.finish = function(stage, outcome) {
      var outcome_html, stage_text;
      outcome_html = '';
      if (stage) {
        this.prevThrow = false;
        stage_text = '本局结束！';
      } else {
        this.prevThrow = this.sum;
        stage_text = '再投一次';
      }
      switch (outcome) {
        case 1:
          outcome_html = '你赢了';
          this.money += 20;
          break;
        case 0:
          outcome_html = '哈哈哈, 你输了！';
      }
      this.stage.text(stage_text);
      this.point.text(this.sum);
      this.outCome.text(outcome_html);
      return this.bank.text(this.money);
    };

    Craps.getRandom = function() {
      return 1 + Math.random() * 6 | 0;
    };

    return Craps;

  })();

  new Craps;

}).call(this);
