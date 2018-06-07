var store = {
    save(key, value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key, value){
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}

/* var list = [
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
]; */

var list = store.fetch("my-new-class");

var filter = {
    all:function(list){
        return list;
    },
    finished:function(list){
        return list.filter(function(item){
            return item.isChecked;
        });
    },
    unfinished:function(list){
        return list.filter(function(item){
            return !item.isChecked;
        });
    }
}

var vm = new Vue({
    el: '#tasklist',
    data: {
        list: list,
        todo: '',
        edtorTodos: '',
        beforeTitle: '',
        visibility: "all"
    },
    watch: {
        list: {
            handler:function(){
                store.save("my-new-class", this.list);
            },
            deep: true
        }
    },
    computed: {
        noCheckeLength:function(){
            return this.list.filter(function(item){
                return !item.isChecked;
            }).length;
        },
        filteredList:function(){
            return filter[this.visibility] ? filter[this.visibility](list) : list;
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

function watchHashChange(){
	var hash = window.location.hash.slice(1);

	vm.visibility = hash;

	console.log(hash);
}

watchHashChange();

window.addEventListener("hashchange", watchHashChange);