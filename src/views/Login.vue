<template>
<div>
    <div class="form-body">
        <!--<div class="website-logo">
            <a href="index.html">
                <div class="logo">
                    <img class="logo-size" src="./../assets/images/logo-light.svg" alt="">
                </div>
            </a>
        </div>-->
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">

                </div>
            </div>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Masuk ke Akun AGPAII Digital</h3>
                        <p>Dapatkan akses kedalam sistem kartu tanda anggota dengan baragam fitur</p>
                        <div class="page-links">
                            <a href="login1.html" class="active">Login</a>
                            <!--<a href="register1.html">Register</a>-->
                        </div>
                        <v-form ref="formLogin" v-model="valid">
                            <input class="form-control" type="email" v-model="credential.username" name="username" placeholder="E-mail Address" required>
                            <input class="form-control" type="password" v-model="credential.password" name="password" placeholder="Password" required>
                            <div class="form-button">
                                <button :disabled="loading" id="button" @click="onSubmit()" type="button" class="ibtn">Login</button> <a href="https://agpaiidigital.org/password/reset">Forget password?</a>
                            </div>
                        </v-form>
                        <!--<div class="other-links">
                            <span>Or login with</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'

export default {
    data() {
        return {
            valid: false,
            credential: {},
            loading: false,
        }
    },
    computed: {
        ...mapState(['Auth'])
    },
    mounted() {
        //alert(process.env.NODE_ENV)
    },

    methods: {
        onSubmit() {
            //alert()
            //console.log(this.$refs.formLogin.validate());
            if (this.$refs.formLogin.validate()) {
                this.loading = true
                this.$swal.showLoading()
                // this.loading = true
                this.$store.dispatch('Auth/login', this.credential).then(() => {
                    this.$swal.close();
                    this.$router.push('/home')
                    //window.(history).pushState(null, null, window.location.href)
                }).catch(() => {
                    //this.$q.notify('Email atau Password salah')
                    this.$swal.fire(
                        'Error',
                        'Email atau password salah',
                        'error'
                    )
                }).finally(() => {
                    this.loading = false
                    this.$swal.hideLoading()
                    //this.$swal.close();
                })

            }
            // return;
            // this.$refs.formLogin.validate().then(success => {
            //     alert('cok')
            //     if (success) {
            //         this.loading = true
            //         this.$store.dispatch('Auth/login', this.credential).then(() => {
            //             this.$router.push('/')
            //             //window.history.pushState(null, null, window.location.href)
            //         }).catch(() => {
            //             alert('Email atau Password salah')
            //         }).finally(() => {
            //             this.loading = false
            //         })
            //     }
            // })
        }
    }
}
</script>

<style scoped>
@import "./../assets/css/bootstrap.min.css";
@import "./../assets/css/fontawesome-all.min.css";
@import "./../assets/css/iofrm-style.css";
@import "./../assets/css/iofrm-theme1.css";
</style>
