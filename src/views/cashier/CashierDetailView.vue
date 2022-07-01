<template>
  <section className="hero is-small has-background-primary-light" style="box-shadow: 5px 10px #808080">
    <div className="hero-body">
      <p className="title">
        DATA Cashier
      </p>
      <p className="subtitle">
      Data Detail Cashier Toko Bunga Floristya
      </p>
    </div>
  </section>
  <section className="content">
    <div v-if="cashier">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
            </div>
            <div className="media-content">
              <p className="title is-4">Biodata Cashier</p>
              <p className="subtitle is-6">dengan ID {{ id_cashier }}</p>
            </div>
          </div>
          <div className="content">
            <dl>
              <dt>Nama Lengkap</dt>
              <dd><strong>{{ cashier.nama_lengkap }}</strong></dd>

              <dt>Alamat</dt>
              <dd><strong>{{ cashier.alamat }}</strong></dd>

              <dt>Nomor HP</dt>
              <dd><strong>{{ cashier.nomor_hp }} item</strong></dd>

              <dt>Jenis Kelamin</dt>
              <dd><strong>{{ cashier.jenis_kelamin.gender }}</strong></dd>

              <dt>Nomor Kassa</dt>
              <dd><strong>{{ cashier.no_kassa }}</strong></dd>
            </dl>
            <hr>
            <div className="columns">
              <div className="column">
                <RouterLink to="/cashier" class="button is-info">
                  <span className="icon is-small">
                    <i className="fas fa-arrow-left"></i>
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
      <div className="container">
        <div className="notification is-danger">
          Maaf, teknisi dengan <strong>ID `{{ id_cashier }}` tidak ditemukan</strong>
        </div>
      </div>
    </div>
    <div className="has-text-centered" v-if="isLoading">
      <i className="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "CashierDetailView",
  data() {
    return {
      cashier: null,
      id_cashier: this.$route.params.id_cashier,
      isLoading: false
    }
  },
  methods: {
    load() {
      this.isLoading = true;
      fetch(`https://floristya.000webhostapp.com/pages/cashier/get.php?id_cashier=${this.id_cashier}`, {
        method: 'GET',
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(json => {
          this.cashier = json.data;
        })
        .catch(() => {
          alert('Terjadi error')
        })
        .finally(() => {
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