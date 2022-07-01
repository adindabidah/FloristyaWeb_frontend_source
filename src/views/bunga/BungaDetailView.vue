<template>
  <section class="hero is-small has-background-primary-light" style="box-shadow: 5px 10px grey">
    <div class="hero-body">
      <p class="title">
        Daftar Bunga
      </p>
      <p class="subtitle">
        Berikut detail Bunga dari Toko Bunga Floristya
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="bunga">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
            </div>
            <div class="media-content">
              <p class="title is-4">Bunga</p>
              <p class="subtitle is-6">dengan Kode {{kode_bunga}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>Kode Bunga</dt>
              <dd><strong>{{bunga.kode_bunga}}</strong></dd>
              <dt>Nama Bunga</dt>
              <dd><strong>{{bunga.nama_bunga}}</strong></dd>
              <dt>Jenis Bunga</dt>
              <dd><strong>{{bunga.jenis_bunga}}</strong></dd>
              <dt>Warna Bunga</dt>
              <dd><strong>{{bunga.warna_bunga}}</strong></dd>
              <dt>Kategori Bunga</dt>
              <dd><strong>{{bunga.kategori_bunga}}</strong></dd>
              <dt>Deskripsi Bunga</dt>
              <dd><strong>{{bunga.deskripsi_bunga}}</strong></dd>
              <dt>Harga Bunga</dt>
              <dd><strong>{{bunga.harga_bunga}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/service" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, bunga dengan <strong>Kode Bunga`{{kode_bunga}}` tidak ditemukan</strong>
        </div>
      </div>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "BungaDetailView",
  data() {
    return {
      bunga: null,
      kode_bunga: this.$route.params.kode_bunga,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://floristya.000webhostapp.com/pages/bunga/get.php?kode_bunga=${this.kode_bunga}`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.bunga = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
</style>