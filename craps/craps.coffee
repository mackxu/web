
	PI = Math.PI
	ctx = $('#craps').get(0).getContext('2d')
	ctx.beginPath()
	ctx.arc(60, 60, 50, 0, PI * 2)
	ctx.fillStyle = "#000000"
	ctx.fill()

	ctx.beginPath()
	ctx.arc(180, 60, 50, 0, PI * 2)
	ctx.lineWidth = 1.0
	ctx.strokeStyle = '#000'
	ctx.stroke()

	ctx.beginPath()
	ctx.fillStyle = '#ff0'
	ctx.fillRect(10, 120, 100, 100)

	# 空心矩形
	ctx.beginPath()
	ctx.lineWidth = 2.0
	ctx.strokeStyle = '#000'
	ctx.strokeRect(130, 120, 100, 100)

	

	class Dot
		constructor: (@ctx, @pos, @dotR) ->
		render: -> 
			@ctx.arc(@pos[0], @pos[1], @dotR, 0, 2 * Math.PI)
			return
		@dots: (ctx, aPos, dotR) ->
			new Dot(ctx, pos, dotR).render() for pos in aPos

	class Dice
		constructor: (@ctx, @diceX, @diceY) ->
			@diceW = 100
			@diceH = 100
			@dotR = 6
			@dots = []

			# 画出骰子区域
			@ctx.beginPath()
			@ctx.lineWidth = 5
			@ctx.strokeStyle = '#000'
			@ctx.clearRect(@diceX, @diceY, @diceW, @diceH)
			@ctx.strokeRect(@diceX, @diceY, @diceW, @diceH)
			@ctx.fillStyle = '#000'

		draw: -> 
			@ctx.beginPath()
			Dot.dots(@ctx, @dots, @dotR)
			@ctx.closePath()
			@ctx.fill()

	class Dice1 extends Dice
		constructor: ->
			super
			@dots = [[@diceX + 0.5 * @diceW, @diceY + 0.5 * @diceH]]

	class Dice2 extends Dice
		constructor: ->
			super
			@dots = [
				[@diceX + 3 * @dotR, @diceY + 3 * @dotR],
				[@diceX + @diceW - 3 * @dotR, @diceY + @diceH - 3 * @dotR]
			]

	new Dice1(ctx, 300, 120).draw()
	new Dice2(ctx, 300, 10).draw()

	

			

			