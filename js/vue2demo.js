// Required JS libraries can be put here

//Components

//Basic routing with two pages : page 1, Page 2; to be mounted at #route
Vue.component('page', {
    props: ['title'],
    template: '<h3>Page Title : {{title}}</h3>'
})


// Register a component with props-titel and an HTML template to be called using 'blob-post'

Vue.component('blog-post', {
    props: ['id', 'author', 'title'],
    template: '<h3>Blog {{id}}: A blogpost called {{name}} by {{ author }}</h3>'
})

Vue.component('blog-post2', {
    props: ['post'],
    template: '<div class="blob"><h3>Blog {{post.id}}: A blogpost called {{post.name}} by {{ post.author }}</h3><p>{{post.content}}</p><p>{{post.imageurl}}</p></div>'
})

Vue.component('module', {
    props: ['post'],
    template: '<div class="blob"><b-card  bg-variant="dark" text-variant="white" :title ="post.name" img-src="images/module.jpeg" class="mb-2" style="max-width: 30rem;" img-left><b-card-text>Instuctor:{{ post.author }} <p>Description:{{post.content}} URL:{{post.imageurl}}</b></b-card-text><b-button href="#" variant="primary">Learn More</b-button><b-button @click="$emit(`enlarge`)">Big Text</b-button><b-button @click="$emit(`smaller`)">Smaller Text</b-button></b-card></div>'
})

Vue.component('modules2', {
    props: ['post'],
    template: '<div class="blob"><b-card  bg-variant="dark" text-variant="white" :title ="post.Module_Name" img-src="images/module.jpeg" class="mb-2" style="max-width: 60rem;" img-left><b-card-text>Mobule Number : {{post.Module_ID}} Instructor : {{ post.Instructor_ID }} <p><i>{{post.Module_Description}}</i><br> Languages : {{post.Languages}}<br></b></b-card-text><b-button :href="post.Webinar_URL" variant="primary">Learn More</b-button><b-button @click="$emit(`gdmenlarge`)">Big Text</b-button><b-button @click="$emit(`gdmsmaller`)">Smaller Text</b-button></b-card></div>'
})
Vue.component('navbar', {
    template: '<div class="blob"><b-card  bg-variant="dark" text-variant="white" title = "MODULE" img-src="images/module.jpeg" class="mb-2" style="max-width: 30rem;" img-left><b-card-text> {{ post.author }} leads the module {{ post.name }} about {{post.content}} {{post.imageurl}}</b-card-text><b-button href="#" variant="primary">Learn More</b-button></b-card></div>'
})

Vue.component('button-count', {
    props: ['owner'],
    data: function() {
        return {
            clicks: 1
        }
    },
    // Define the template that can be inserted in HTML
    template: '<b-button variant="success" @click="clicks++"> Button State={{this.buttons}} {{owner}}:You clicked  {{ clicks }} times.</b-button>'
})

// Render a post with ID, title and Content
Vue.component('ajax-render', {
    props: ['post'],
    data: function() {
        return {
            clicks: 1
        }
    },
    // Define the template that can be inserted in HTML
    template: '<h3>AJAX " {{post.id}}: A blogpost called {{post.title}} with Content <p>{{post.body}}</p></div>'
})

// Template includes call back events
Vue.component('listmoduleslong', {
        props: ['post'],
        template: '<div class="blob"><b-card  bg-variant="dark" text-variant="white" :title ="post.Module_Name" img-src="images/module.jpeg" class="mb-2" style="max-width: 60rem;" img-left><b-card-text>Mobule Number : {{post.Module_ID}} Instructor : {{ post.Instructor_ID }} <p><i>{{post.Module_Description}}</i><br> Languages : {{post.Languages}}<br></b></b-card-text><b-button :href="post.Webinar_URL" variant="primary">Learn More</b-button><b-button @click="$emit(`gdmenlarge`)">Big Text</b-button><b-button @click="$emit(`gdmsmaller`)">Smaller Text</b-button></b-card></div>'
    })
    // Template includes call back events
Vue.component('listprogrammeslong', {
    props: ['post'],
    template: '<div class="blob"><b-card  bg-variant="white" text-variant="dark" :title ="post.Programme_Name" img-src="images/module.jpeg" class="mb-2" style="max-width: 60rem;" img-left><b-card-text>Programme ID : {{post.Programme_ID}} <p><i>{{post.Progamme_Description}}</i><br> Languages : {{post.Languages}}<br></b></b-card-text><b-button variant="primary" @click="$emit(`listmodules`)">View Modules</b-button><b-button @click="$emit(`gdmenlarge`)">Big Text</b-button><b-button @click="$emit(`gdmsmaller`)">Smaller Text</b-button></b-card></div>'
})

Vue.component('listmodulesshort', {
        props: ['post'],
        template: '<div class="blob"><b-card  bg-variant="dark" text-variant="white" :title ="post.Module_Name" img-src="images/module.jpeg" class="mb-2" style="max-width: 60rem;" img-left><b-card-text>Mobule Number : {{post.Module_ID}} Languages : {{post.Languages}}<br></b></b-card-text><b-button :href="post.Webinar_URL" variant="primary">Learn More</b-button></div>'
    })
    // Template includes call back events
Vue.component('listprogrammesshort', {
        props: ['post'],
        template: '<div class="blob"><b-card  bg-variant="white" text-variant="dark" :title ="post.Programme_Name" img-src="images/module.jpeg" class="mb-2" style="max-width: 60rem;" img-left><b-card-text>Programme ID : {{post.Programme_ID}} <br> Languages : {{post.Languages}}<br></b></b-card-text><b-button variant="primary" @click="$emit(`listmodules`)">View Modules</b-button><b-button @click="$emit(`gdmenlarge`)">Big Text</b-button><b-button @click="$emit(`gdmsmaller`)">Smaller Text</b-button></b-card></div>'
    })
    //Demo Apps

var app9 = new Vue({
    el: '#app',
    data: {
        message: 'You loaded this page on ' + new Date().toLocaleString()
    }
})

var app3 = new Vue({
    el: '#app3',
    data: {
        seen: true
    }
})

new Vue({
    el: '#demo',
    data: {
        show: true
    }
})

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' },
            { text: 'A new one' }
        ]
    }
})

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello david!',
        count: 0
    },
    methods: {
        messup: function() {
            this.message = this.message.split('').reverse().join('-')
        },
        reverse: function() {
            this.message = this.message.split('')
        },
        other: function() {
            this.count++
                this.message = this.message.concat(' poo')
            console.log(this.count)
        }

    }
})

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue!'
    }
})

// Create a ROOT app and render to #blog-post; demo; the app has 3 posts as its data; now we want to render using the blog-post component
var gdma = new Vue({
    el: '#gdma-demo',
    data: {
        school: 'Global Digital MOJO Academy - Online',
        posts: [
            { id: 1, name: 'Psychology', author: 'David', content: 'ipso factum', imageurl: 'http://a.png' },
            { id: 2, name: 'Marketing', author: 'Chris', content: 'ipso factum', imageurl: 'http://b.png' },
            { id: 3, name: 'UX', author: 'Peter', content: 'ipso factum', imageurl: 'http://c.png' },
            { id: 4, name: 'Smart Cities', author: 'Lisa', content: 'ipso factum', imageurl: 'http://c.png' },
            { id: 5, name: 'AI', author: 'David', content: 'ipso factum', imageurl: 'http://c.png' },
            { id: 6, name: 'Apps', author: 'Jo', content: 'ipso factum', imageurl: 'http://c.png' },
            { id: 7, name: 'Mobility', author: 'Jo', content: 'ipso factum', imageurl: 'http://c.png' },
            { id: 8, name: 'Leadership', author: 'Jo', content: 'ipso factum', imageurl: 'http://c.png' }
        ],
        size: 1
    }
})

var route = new Vue({
    el: '#routes',
    data: {
        title: "david",
    }
})

// Define a new component called button-counter (Data is define as a function and is the STATE of the instance); prop is just data that is passed


// Create an instance of the comoponent at the div
new Vue({ el: '#components-demo' })

// Define an app with 3 projects and iterate through them using v-for template for posts in databas



//api calling with axios wrapper - dummy data

var app10 = new Vue({
    el: '#ajax2',
    created() {
        this.fetchData();
    },
    data: {
        posts: []
    },
    methods: {
        fetchData() {
            axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
                this.posts = response.data;
                console.log(response.data);
            });
        }
    },
});

var paydemo = new Vue({
    el: '#paydemo',
    data: {

        listlimit: 0,
        results: ''
    },
    methods: {
        listcustomers() {
            console.log('Enter List Customers')
            console.log('List Limit', this.listlimit)


            const options = {
                method: 'post',
                //Call process on same machine (CORS enabled)
                url: 'http://localhost:8010/listcustomers',
                //AXIOS data must be in JSON format to be sent correctly
                data: this.listlimit
            }
            axios(options).then(response => {
                this.results = response.data;
                console.log('response', this.results);
                //reset the search string
            });
        }
    }
})

//api calling with a keyword that must be converted to a JSON MongdoDB query axios wrapper - local process - make sure CORS is cleared
var gdma_list = new Vue({
    el: '#gdma_list',
    data: {
        posts: [],
        result: [],
        gdmsize: 1,
        //Query should be a JSON object
        query: '',
        history: [],
        selected: '',
        filter: '',
        pn: 1,
        view_modules: 0,
        view_progs: 1,
        pi: 1
    },
    //note the syntax for life-cycle call-backs mount() not mount : 
    mounted() {
        //load the programme list when the element is mounted - so we can populate a droplist
        this.fetchaAllProgrammes()
            //put all programmes into a datastructure or they will be overwritten by other searchers
            //display the data structure in the view

    },
    methods: {
        getindex(event) {
            //There may be times when you want to listen directly to a native event on the root element of a component. In these cases, you can use the .native modifier for v-on:
            this.pn = event.target.selectedIndex
            console.log('pn', this.pn)
        },
        fetchList() {
            this.view_modules = 1
            this.view_progs = 0
            console.log('Enter Axios FetchList')
            console.log('Query String', this.filter)
            console.log('Query String', this.pn)

            this.history.push(this.pn)
            console.log('Search History', this.history)
                //create query string
            this.query = '{"Programme_ID":"' + this.pn + '"}'
            console.log('MongDB String', this.pn)
                //convert the text string to json so that mongodb shell can process
            this.query = JSON.parse(this.query)
            console.log('Query JSON', this.query)
            const options = {
                method: 'post',
                //Call process on same machine (CORS enabled)
                url: 'http://127.0.0.1:8020/mongolistmodules',
                //AXIOS data must be in JSON format to be sent correctly
                data: this.query
            }
            axios(options).then(response => {
                this.posts = response.data;
                console.log('this.posts[1]', this.posts[1]);
                //reset the search string
            });
        },
        fetchaProgramme() {
            this.view_modules = 0
            this.view_progs = 1
            console.log('Enter Axios FetchList')
            console.log('Query String', this.filter)
            console.log('Query String', this.pn)

            this.history.push(this.pn)
            console.log('Search History', this.history)
                //create query string
            this.query = '{"Programme_ID":"' + this.pn + '"}'
            console.log('MongDB String', this.query)
                //convert the text string to json so that mongodb shell can process
            this.query = JSON.parse(this.query)
            console.log('Query JSON', this.query)
            const options = {
                method: 'post',
                //Call process on same machine (CORS enabled)
                url: 'http://127.0.0.1:8020/mongoquery',
                //AXIOS data must be in JSON format to be sent correctly
                data: this.query
            }
            axios(options).then(response => {
                this.posts = response.data;
                console.log(response.data);
                //reset the search string
            });

        },
        fetchaAllProgrammes() {
            this.view_progs = 1
            this.view_modules = 0
            console.log('Enter Axios FetchList')
            console.log('Query String', this.filter)
            console.log('Query String', this.pn)

            this.history.push(this.pn)
            console.log('Search History', this.history)
                //create query string
            this.query = '{"Type":"Programme"}'
            console.log('MongDB String', this.query)
                //convert the text string to json so that mongodb shell can process
            this.query = JSON.parse(this.query)
            console.log('Query JSON', this.query)
            const options = {
                method: 'post',
                //Call process on same machine (CORS enabled)
                url: 'http://127.0.0.1:8020/mongoquery',
                //AXIOS data must be in JSON format to be sent correctly
                data: this.query
            }
            axios(options).then(response => {
                this.posts = response.data;
                console.log(response.data);
                //reset the search string
            });
        },
        fetchaAllModules() {
            this.view_progs = 0
            this.view_modules = 1
            console.log('Enter Axios FetchList')
            console.log('Query String', this.filter)
            console.log('Query String', this.pn)

            this.history.push(this.pn)
            console.log('Search History', this.history)
                //create query string
            this.query = '{"Type":"Module"}'
            console.log('MongDB String', this.query)
                //convert the text string to json so that mongodb shell can process
            this.query = JSON.parse(this.query)
            console.log('Query JSON', this.query)
            const options = {
                method: 'post',
                //Call process on same machine (CORS enabled)
                url: 'http://127.0.0.1:8020/mongoquery',
                //AXIOS data must be in JSON format to be sent correctly
                data: this.query
            }
            axios(options).then(response => {
                this.posts = response.data;
                console.log(response.data);
                //reset the search string
            });
        }
    },
});
var gdma_search = new Vue({
    el: '#gdma_search',
    data: {
        posts: [],
        result: [],
        gdmsize: 1,
        //Query should be a JSON object
        query: '',
        history: [],
        selected: '',
        filter: '',
        pn: 1
    },
    methods: {
        fetchData() {
            console.log('Enter Axios')
            console.log('Query String', this.filter)
            console.log('Query String', this.query)

            this.history.push(this.query)
            console.log('Search History', this.history)

            this.query = '{"$or":[{"Module_Name":{"$regex":".*' + this.query + '"}},{"Programme_Name":{"$regex":".*' + this.query + '"}}]}'
            console.log('MongDB String', this.query)
                //convert the text string to json so that mongodb shell can process
            this.query = JSON.parse(this.query)
            console.log('Query JSON', this.query)
            const options = {
                method: 'post',
                //Call process on same machine (CORS enabled)
                url: 'http://127.0.0.1:8020/mongoquery',
                //AXIOS data must be in JSON format to be sent correctly
                data: this.query
            }
            axios(options).then(response => {
                this.posts = response.data;
                console.log(response.data);
                console.log(this.posts);
                //reset the search string
                this.query = '';
            });
        },
    },
});
// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const NotFound = { template: '<h1>Page not found - sucks</h1><p>Ive got more to say</p>' }
const Home = { template: '<p>This is the HOME PAGE - a good place to start</p><p>This is the HOME PAGE - a good place to start</p>' }
const About = { template: '<h1>This is the ABOUT PAGE</h1><p>Ive got more to say</p>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/NotFound', component: NotFound },
    { path: '/Home', component: Home },
    { path: '/About', component: About }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
    router
}).$mount('#route3')

// Now the app has started!