
    # 从这里开始
    ###
        自古华山一条路 
    ### 
    fill = (container, liquid = 'coffee') ->
        # 此处只能用双引号
        "Filling the #{container} width #{liquid}"
    # console.log(fill('div'))

    kids = 
        brother:
            name: 'Max'
            age: 11
        sister:
            name: 'Ida'
            age: 9
    changeNumbers = ->
        inner = -1
        outer = 10 + inner
    # console.log(changeNumbers())

    exports = exports ? this

    # if/else
    mood = 3 if true

    if mood == 3 and true
        #console.log(mood)
    else
        console.log('good work')

    date = if mood > 2 then 2 else 4
    # console.log date

    plus = (a = 2, b = 3) -> a + b

    # console.log plus()

    sum = (nums...) ->
        result = 0
        nums.forEach (num) -> result += num
        result
    # console.log sum(1, 4, 8)

    trigger = (events...) ->
        events.splice(2, 0, 'a')
        events

    # console.log trigger(1, 2, 3, 4)

    fill = (container, liquid='conffee') ->
        console.log 'Filling the ' + container + ' width ' + liquid

    fill('zhangsan')

    class Tribble
        constructor: ->
            @isAlive = true
            Tribble.count++

        # 原型对象的属性
        breed: -> new Tribble if @isAlive
        die: -> 
            Tribble.count-- if @isAlive
            @isAlive = false

        # Class-level properties
        @count: 0
        @makeTrouble: -> console.log ('Trouble!' for i in [0...@count]).join(' ')

    t1 = new Tribble()
    t2 = new Tribble()
    Tribble.makeTrouble()
    t1.die()
    Tribble.makeTrouble()
    t2.breed().breed().breed()
    Tribble.makeTrouble()

    class Pet
        constructor: (@sex) -> 
            @isHungry = true
        eat: ->
            @isHungry = false

    class Dog extends Pet
        constructor: (sex, @age) ->
            # super(@sex)
            super           # 传递子类所有参赛到父类
            console.log 'constructor'
        eat: ->
            console.log '*crunch crunch*'
            super()
        fetch: ->
            console.log 'Yip Yip'
            @isHungry = true




