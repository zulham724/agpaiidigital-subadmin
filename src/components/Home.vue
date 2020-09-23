<template>
<div>
    <v-row>
        <v-col>
            <v-dialog v-model="dialog" width="700">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                        Filter Data
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title class="">
                        Filter data
                    </v-card-title>

                    <v-card-text>
                        <v-row>
                            <v-col cols="3">
                                Rentang umur
                            </v-col>
                            <v-col>
                                <v-range-slider dense :thumb-size="24" thumb-label="always" v-model="filter_options.age_range" min="0" max="100"></v-range-slider>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                Jenis kelamin
                            </v-col>
                            <v-col>

                                <v-radio-group dense v-model="filter_options.gender" row>
                                    <v-radio size="24px" label="Semua" value="-"></v-radio>
                                    <v-radio label="Laki-laki" value="L"></v-radio>
                                    <v-radio label="Perempuan" value="P"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                Status guru
                            </v-col>
                            <v-col>
                                <v-radio-group dense v-model="filter_options.is_pns" row>
                                    <v-radio dense label="Semua" value="-"></v-radio>
                                    <v-radio dense label="PNS" value=1></v-radio>
                                    <v-radio dense label="Non-PNS" value=0></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                Status sertifikasi
                            </v-col>
                            <v-col>
                                <v-radio-group dense v-model="filter_options.certified" row>
                                    <v-radio dense label="Semua" value="-"></v-radio>
                                    <v-radio dense label="Sudah sertifikasi" value=1></v-radio>
                                    <v-radio dense label="Belum sertifikasi" value=0></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                Status sekolah
                            </v-col>
                            <v-col>
                                <v-radio-group dense v-model="filter_options.school_status" row>
                                    <v-radio label="Semua" value="-"></v-radio>
                                    <v-radio label="Negeri" value="Negeri"></v-radio>
                                    <v-radio label="Swasta" value="Swasta"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                Jenjang yang diajar
                            </v-col>
                            <v-col>
                                <v-select v-model="filter_options.educational_level" item-text="name" item-value="id" :items="educational_level_options" label="Jenjang yang diajar" outlined dense></v-select>

                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                Hak akses
                            </v-col>
                            <v-col>
                                <v-select v-model="filter_options.role" item-text="display_name" item-value="id" :items="role_options" label="Hak akses" outlined dense></v-select>

                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                Provinsi
                            </v-col>
                            <v-col>
                                <v-select multiple v-model="filter_options.province" item-text="name" item-value="id" :items="province_options" label="Provinsi" outlined dense>
                                    <!--<template v-slot:append-outer>
                                       <v-btn>Pilih semua</v-btn>
                                     </template>-->
                                </v-select>
                            </v-col>
                        </v-row>

                    </v-card-text>
                    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="loading" text @click="filterData">
                            Filter data
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table :footer-props="{
        'items-per-page-options': [5, 10, 50, 100, 500, -1]
    }" :loading="loading" :server-items-length="totalData" :options.sync="options" :headers="headers" :items="items" class="elevation-1"></v-data-table>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    name: 'HelloWorld',
    methods: {
        filterData: function () {
            this.getDataFromApi();
        },
        getDataFromApi: function () {
            this.loading = true;

            this.$store.dispatch("User/getUsersListPagination", {
                options: this.options,
                filter_options: this.filter_options
            }).then(res => {
                const {
                    sortBy,
                    sortDesc,
                    // page,
                    // itemsPerPage
                } = this.options
                this.totalData = res.totalUser;
                this.items = res.data.data;

                if (sortBy.length === 1 && sortDesc.length === 1) {
                    this.items = this.items.sort((a, b) => {
                        const sortA = a[sortBy[0]]
                        const sortB = b[sortBy[0]]

                        if (sortDesc[0]) {
                            if (sortA < sortB) return 1
                            if (sortA > sortB) return -1
                            return 0
                        } else {
                            if (sortA < sortB) return -1
                            if (sortA > sortB) return 1
                            return 0
                        }
                    })
                }

                // if (itemsPerPage > 0) {
                //     this.items = this.items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                // }
            }).finally(() => {
                this.loading = false;
            });

        },
    },
    created() {
        this.getDataFromApi();
        this.$store.dispatch("EducationalLevel/index").then(res => {
            this.educational_level_options = [{
                name: 'Semua',
                id: -1
            }, ...res.data];
            this.filter_options.educational_level = -1

        })
        this.$store.dispatch("User/getUserRoles").then(res => {
            this.role_options = [{
                display_name: 'Semua',
                id: -1
            }, ...res.data];
            this.filter_options.role = -1

        })
        this.$store.dispatch("Province/index").then(res => {
            this.province_options = [{
                    name: 'Semua provinsi',
                    id: -1
                },
                ...res.data
            ];
            this.filter_options.province = [-1]

        })
    },
    watch: {
        options: {
            handler() {
                console.log(this.options)
                this.getDataFromApi();
                // this.getDataFromApi()
                //     .then(data => {
                //         this.desserts = data.items
                //         this.totalDesserts = data.total
                //     })
            },
            deep: true,
        },
        'filter_options.province': {
            handler(newVal, oldVal) {
                if (newVal.includes(-1) && !oldVal.includes(-1)) {
                    //alert('asu')
                    this.filter_options.province = [-1]
                }
                if (oldVal.includes(-1) && newVal.length > 1) {
                    //alert('asu')
                    const index = this.filter_options.province.findIndex(e => e == -1);
                    this.filter_options.province.splice(index, 1)
                }

                console.log('old')
                console.log(oldVal)
                console.log('new')
                console.log(newVal)
            },
            deep: true,
        }
    },
    data() {
        return {
            educational_level_options: [],
            role_options: [],
            province_options: [],
            filter_options: {
                age_range: [0, 100],
                gender: '-',
                is_pns: '-',
                certified: '-',
                school_status: '-',
                educational_level: '-',
                role: '-',
                province: []
            },
            select: null,
            dialog: false,
            totalData: 0,
            options: {},
            loading: false,
            items: [],
            headers: [{
                    text: 'Nama',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Nomor KTA',
                    value: 'kta_id'
                },
                {

                    text: 'Hak Akses',
                    value: 'role.display_name'
                },
                {
                    text: 'Point',
                    value: 'point'
                },
                {
                    text: 'Status member',
                    value: 'email_verified_at'
                },
                {
                    text: 'Action',
                    value: 'action'
                }
            ],
        }
    }
}
</script>
