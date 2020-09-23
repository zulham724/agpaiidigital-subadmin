<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
            <v-list-item-group v-model="item" color="primary">

                <v-list-item active link @click="$route.name!='Home'?$router.push({name:'Home'}):''">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-email</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Contact</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item link @click="logout">
                    <v-list-item-action>
                        <v-icon>mdi-account-arrow-right</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{appTitle}}</v-toolbar-title>
    </v-app-bar>

    <v-main>
        <v-container fluid>
            <v-row align="center" justify="center">
                <v-col>
                    <router-view></router-view>

                </v-col>
            </v-row>

            <!--<v-row align="center" justify="center">
                <v-col class="text-center">
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-btn :href="source" icon large target="_blank" v-on="on">
                                <v-icon large>mdi-code-tags</v-icon>
                            </v-btn>
                        </template>
                        <span>Source</span>
                    </v-tooltip>
                </v-col>
            </v-row>-->
        </v-container>
    </v-main>
    <v-footer color="indigo" app>
        <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
</v-app>
</template>

<script>
export default {
    props: {
        source: String,
    },
    data: () => ({
        drawer: null,
        item: 0
    }),
    methods: {
        logout: function () {
            this.$store.commit("Auth/logout");
            this.$router.push({
                name: 'Login'
            })
        }
    },
    mounted() {
        this.$router.push({
            name: 'Home'
        })
        //console.log(process.ENV.VUE_APP_TITLE);
        // this.$swal.fire(
        //     'Good job!',
        //     'You clicked the button!',
        //     'success'
        // )
    },
    created: function () {

        // this.$store.dispatch("User/getUsersList").then(res => {
        //     console.log(res)
        // })
    },
    computed: {
        appTitle: function () {
            return process.env.VUE_APP_TITLE
        }
    }
}
</script>

<style lang="scss">
// #app {
//     font-family: Avenir, Helvetica, Arial, sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     text-align: center;
//     color: #2c3e50;
// }

// #nav {
//     padding: 30px;

//     a {
//         font-weight: bold;
//         color: #2c3e50;

//         &.router-link-exact-active {
//             color: #42b983;
//         }
//     }
// }
// 
</style>
