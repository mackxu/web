
    # 从这里开始
    ###
        自古华山一条路 
    ### 
    fill = (container, liquid = 'coffee') ->
        # 此处只能用双引号
        "Filling the #{container} width #{liquid}"
    console.log(fill('div'))

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
    console.log(changeNumbers())

    exports = exports ? this

    # if/else
    mood = 3 if true

    if mood == 3 and true
        console.log(mood)
    else
        console.log('good work')

    date = if mood > 2 then 2 else 4
    console.log date

    plus = (a = 2, b = 3) -> a + b

    console.log plus()

    sum = (nums...) ->
        result = 0
        nums.forEach (num) -> result += num
        result
    console.log sum(1, 4, 8)

    trigger = (events...) ->
        events.splice(2, 0, 'a')
        events

    console.log trigger(1, 2, 3, 4)

    console.log do -> 'hello function'

    eat = (food) -> 
    list = (food) -> 
    menu = (food) -> 

    eat food for food in ['toast', 'cheese', 'wine']

    courses = ['greens', 'caviar', 'truffles', 'roast', 'cake'];
    menu i+1, dish for dish, i in courses

    eat food for food in ['toast', 'cheese', 'wine'] when food isnt 'cheese'


    # 增量为2
    evens = (x for x in [0..10] by 2)
    # 遍历对象
    students = 
        '001': 'zhangsan'
        '002': 'lisi'
    aStudents = for own id, name of students
        "#{id}: #{name}"

    # for filename in list
    #     do (filename) -> 
    #         fs.readFile filename, (err, result) ->
    #             compile filename, result.toString()

    # splice
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    numbers[3..6] = [-3, -4, -5, -6]

    console.log numbers

    eldest = if 27 > 25 then 'zhangsan' else 'lisi'
    console.log eldest

    opa = 
        add: (a, b)->
        plus: (a, b) ->

    #调用对象的方法
    opa?.add?(1, 3)

    class Animal
        constructor: (@name) ->
        move: (meters) ->
            console.log @name + "move #{meters} m"

    # inhert
    class Snake extends Animal
        move: ->
            console.log 'aaa'
            super 5
    # inhert
    class Horse extends Animal
        move: ->
            console.log 'bbb'
            super 6

    sam = new Snake('zhangsan')
    tom = new Horse('lisi')
    sam.move()
    tom.move()

    # 交换数组中的两个值
    # [a, b] = [b, a]
    # 多个变量赋值
    [a, b] = [1, 2]
    console.log a, b

    class Person
        constructor: (options) ->
            { @name, @age, @height } = options

    tim = new Person(age: 25)

    # $('h1').click -> $(this).html($(this).html() + '!')

    # $('#logo')
    #     .css(fontSize: 16)
    #     .hover(-> $(this).css(fontWeight: 'bold', color: 'red'))
    #     .click(-> console.log 'good work')

    # $.ajax '/',
    #     type: 'GET'
    #     dataType: 'html'
    #     error: (jqXHR, textStatus, errorThrown) ->
    #         $('body').append "AJAX Error: #{textStatus}"
    #     success: (data, textStatus, jqXHR) ->
    #         $('body').append "Successful AJAX call: #{data}"

    -> 'good work'
    do -> 'good work'       # 立即执行函数
    hi = -> 'hello world'

    clearArray = (arr) ->
        arr.splice 0, arr.length
        return;
    console.log 'test' +5
    clearArray ([1..10])

    x = true
    showA = (x = x) ->
        console.log if x then 'good work' else 'nope'
        return
    showA();

    doAndUntil user.name, -> user.sayName
    

        




