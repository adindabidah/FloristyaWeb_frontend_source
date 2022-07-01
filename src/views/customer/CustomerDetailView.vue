<template>
  <section class="hero is-small has-background-primary-light" style="box-shadow: 5px 10px grey">
    <div class="hero-body">
      <p class="title">
        DATA CUSTOMER
      </p>
      <p class="subtitle">
        Berikut detail  CUSTOMER Toko Bunga berdasarkan ID CUSTOMER nya:
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="customer">
      <div class="card" style="background: #FFFFFF;box-shadow: 5px 10px grey">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
            </div>
            <div class="media-content">
              <p class="title is-4">Biodata Customer</p>
              <p class="subtitle is-6">dengan ID {{id_customer}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>Nama Lengkap</dt>
              <dd><strong>{{customer.nama_lengkap}}</strong></dd>

              <dt>Alamat</dt>
              <dd><strong>{{customer.alamat}}</strong></dd>

              <dt>Nomor HP</dt>
              <dd><strong>{{customer.nomor_hp}}</strong></dd>

              <dt>Cashier</dt>
              <dd><strong>{{customer.cashier.nama_lengkap}}</strong></dd>

              <dt>Bunga</dt>
              <dd><strong>{{customer.bunga.nama_bunga}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/customer" class="button is-info">
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
          Maaf, customer dengan <strong>ID `{{id_customer}}` tidak ditemukan</strong>
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
  name: "CustomerDetailView",
  data() {
    return {
      customer: null,
      id_customer: this.$route.params.id_customer,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://floristya.000webhostapp.com/pages/customer/get.php?id_customer=${this.id_customer}`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.customer = json.data;
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