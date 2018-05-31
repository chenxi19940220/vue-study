var list = [
    {
        title: '1',
        isChecked: false
    },
    {
        title: '2',
        isChecked: true
    },
    {
        title: '3',
        isChecked: false
    },
    {
        title: '4',
        isChecked: true
    },
    {
        title: '5',
        isChecked: false
    }
];

new Vue({
    el: '#tasklist',
    data: {
        list: list,
        todo: '',
        edtorTodos: '',
        beforeTitle: ''
    },
    computed: {
        noCheckeLength:function(){
            return this.list.filter(function(item){
                return !item.isChecked;
            }).length;
        }
    },
    methods: {
        addTodo(){
            this.list.push({
                title: this.todo,
                isChecked: false
            });

            this.todo = '';
        },
        deleteTodo(todo){
            var index = this.list.indexOf(todo);
            this.list.splice(index, 1);
        },
        edtorTodo(todo){
            this.beforeTitle  = todo.title;
            this.edtorTodos = todo;
        },
        edtorTodoed(todo){
            this.edtorTodos = '';
        },
        cancelTodo(todo){
            todo.title  = this.beforeTitle;
            this.edtorTodos = '';
        }
    },
    directives: {
        "focus": {
            update(el, bingding){
                if(bingding.value){
                    el.focus();
                }
            }
        }
    }
});

