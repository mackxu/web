
	root  = window ? global

	class Dot
		constructor: (@ctx, @pos, @dotR) ->
		render: -> 
			@ctx.beginPath()
			@ctx.arc(@pos[0], @pos[1], @dotR, 0, 2 * Math.PI)
			@ctx.closePath()
			@ctx.fill()
			return
		@dots: (ctx, aPos, dotR) ->
			new Dot(ctx, pos, dotR).render() for pos in aPos

	class Dice
		constructor: (ctx, diceX, diceY) ->
			@ctx = ctx
			@diceX = diceX
			@diceY = diceY

			@diceW = 100
			@diceH = 100
			@dotR = 6
			@dots = []
			@dotp = @dotR * 3

		draw: -> 
			@ctx.beginPath()
			@ctx.lineWidth = 5
			@ctx.strokeStyle = '#000'
			@ctx.clearRect(@diceX, @diceY, @diceW, @diceH)
			@ctx.strokeRect(@diceX, @diceY, @diceW, @diceH)
			@ctx.fillStyle = '#f00'
			Dot.dots(@ctx, @dots, @dotR)		
		getDots: ->
			@dots

	class root.Dice1 extends Dice
		# 重载了基类的构造函数
		constructor: (ctx, diceX, diceY) ->
			super
			@dots = [[@diceX + 0.5 * @diceW, @diceY + 0.5 * @diceH]]

	class root.Dice2 extends Dice
		constructor: (ctx, diceX, diceY) ->
			super
			@dots = [
				[@diceX + @dotp, @diceY + @dotp],
				[@diceX + @diceW - @dotp, @diceY + @diceH - @dotp]
			]
	class root.Dice3 extends Dice
		constructor: (ctx, diceX, diceY) ->
			super
			@dice1 = new root.Dice1(ctx, diceX, diceY)
			@dice2 = new root.Dice2(ctx, diceX, diceY)
			@dots = @dice1.getDots().concat(@dice2.getDots())

	class root.Dice4 extends Dice
		constructor: (ctx, diceX, diceY) ->
			super
			@dots = [
				[@diceX + @dotp, @diceY + @dotp],
				[@diceX - @dotp + @diceW, @diceY + @dotp],
				[@diceX + @dotp, @diceY - @dotp + @diceH],
				[@diceX - @dotp + @diceW, @diceY - @dotp + @diceH]
			]
	class root.Dice5 extends Dice
		constructor: (ctx, diceX, diceY) ->
			super
			@dice1 = new root.Dice1(ctx, diceX, diceY)
			@dice4 = new root.Dice4(ctx, diceX, diceY)
			@dots = @dice1.getDots().concat(@dice4.getDots())
	
	class root.Dice6 extends Dice
		constructor: (ctx, diceX, diceY) ->
			super
			@dice4 = new root.Dice4(ctx, diceX, diceY)
			@dots = [
				[@diceX + @dotp, @diceY + 0.5 * @diceH],
				[@diceX - @dotp + @diceW, @diceY + 0.5 * @diceH]
			].concat(@dice4.getDots()) 

	
	# 对象工厂, 根据参数生成一类对象
	DiceFactory = {
		draw: (ctx, pos, i) ->
			new root['Dice' + i](ctx, pos[0], pos[1]).draw()
			return
	}

	class Craps
		constructor: ->
			ctx = $('#craps').get(0).getContext?('2d')
			@stage = $('#stage')
			@point = $('#point')
			@outCome = $('#outCome')
			
			# 从数据库中查出余额，并显示给用户。假设存款为100
			@money = 100
			@bank = $('#bank').text(@money)
			# 两个骰子的位置
			pos1 = [10, 10]
			pos2 = [130, 10]
			ch = 0
			@prevThrow = false			
			$('#throw').click(=>
				return alert ('你的余额不足了！') if @money < 10
				@money -= 10
				@sum = 0
				ch = Craps.getRandom()
				DiceFactory.draw(ctx, pos1, ch)
				@sum += ch;
				ch = Craps.getRandom()
				DiceFactory.draw(ctx, pos2, ch)
				@sum += ch
				@output()
				return
			)
		output: ->
			if @prevThrow == false 							# 本局第一次投掷
				switch @sum
					when 7, 11 then @finish(true, 1)		# win
					when 2, 3, 12 then @finish(true, 0)		# fail
					else @finish(false, 2)					# next			
			else
				switch @sum
					when @prevThrow then @finish(true, 1)	# win
					when 7 then @finish(true, 0)			# fail
					else @finish(false, 2)					# next
			
		finish: (stage, outcome)->
			outcome_html = ''
			if stage
				@prevThrow = false
				stage_text = '本局结束！'
			else 
				@prevThrow = @sum
				stage_text = '再投一次'

			switch outcome
				when 1  
					outcome_html = '你赢了'
					@money += 20
				when 0 then outcome_html = '哈哈哈, 你输了！'
			@stage.text(stage_text)
			@point.text(@sum)	
			@outCome.text(outcome_html)
			@bank.text(@money)
		# 类方法与原型方法的区别
		@getRandom: ->
			1 + Math.random() * 6 | 0

	# 游戏开始
	new Craps




	

			

			