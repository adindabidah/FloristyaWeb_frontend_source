<template>
  <section class="isi">
    <section class="hero is-small">
      <div class="judul">
        <p class="title has-text-black">
          Customer
        </p>
        <p class="subtitle has-text-black">
          Data Customer yang datang ke Toko Bunga:
        </p>
      </div>
    </section>

    <section class="content">
      <div class="container">
        <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
          <span>Data baru</span>
        </button>
        <table class="table has-background-success-light">
          <thead>
          <tr>
            <th>#</th>
            <th>ID Customer</th>
            <th>Nama Lengkap</th>
            <th>Cashier</th>
            <th>Bunga</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="customer.length" v-for="(value, index) in customer">
            <td>{{index + 1}}</td>
            <td>{{value.id_customer}}</td>
            <td>{{value.nama_lengkap}}</td>
            <td>{{value.cashier.nama_lengkap}}</td>
            <td>{{value.bunga.nama_bunga}}</td>
            <td>{{value.created_at}}</td>
            <td>
              <div class="field has-addons">
                <p class="control">
                  <RouterLink class="button is-success" :to="{ name: 'customer-detail', params: { id_customer:  value.id_customer}}">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                    <span>Detail</span>
                  </RouterLink>
                </p>
                <p class="control">
                  <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                    <span>Edit</span>
                  </button>
                </p>
                <p class="control">
                  <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                    <span>Delete</span>
                  </button>
                </p>
              </div>
            </td>
          </tr>
          <tr v-else>
            <td colspan="9">
              <div class="notification is-warning">
                Tidak ada data
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="has-text-centered" v-if="isLoading">
        <i class="fa-solid fa-spinner fa-pulse"></i>
      </div>
    </section>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>ID CUSTOMER <strong>{{customer[selectedIndex].id_customer}}</strong></li>
            <li>NAMA LENGKAP <strong>{{customer[selectedIndex].nama_lengkap}}</strong></li>
            <li>bunga <strong>{{customer[selectedIndex].bunga}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Form Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex >= 0">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="nama_lengkap_update">Nama Lengkap</label>
              <div class="control">
                <input class="input" type="text" id="nama_lengkap_update" placeholder="Nama Lengkap" required v-model="formEdit.nama_lengkap">
              </div>
            </div>
            <div class="field">
              <label class="label" for="alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_update" placeholder="Alamat" required v-model="formEdit.alamat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="nomor_hp_update">Nomor HP</label>
              <div class="control">
                <input class="input" type="number" id="nomor_hp_update" placeholder="Nomor HP" required v-model="formEdit.nomor_hp">
              </div>
            </div>
            <div class="field">
              <label class="label" for="cashier_update">Cashier</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="cashier_update" id="cashier_update" v-model="formEdit.cashier">
                    <option v-for="val in cashier" :value="val.id_cashier">{{val.nama_lengkap}}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label" for="bunga_update">Bunga</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="bunga_update" id="bunga_update" v-model="formEdit.bunga">
                    <option v-for="val in bunga" :value="val.kode_bunga">{{val.nama_bunga}}</option>
                  </select>
                </div>
              </div>
            </div>
          </form>

        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body" style="background: #d8f2fb">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="id_customer_insert">ID Customer</label>
            <div class="control">
              <input class="input" type="number" id="id_customer_insert" placeholder="ID Customer" required v-model="formAdd.id_customer">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_lengkap_insert">Nama Lengkap</label>
            <div class="control">
              <input class="input" type="text" id="nama_lengkap_insert" placeholder="Nama Lengkap" required v-model="formAdd.nama_lengkap">
            </div>
          </div>
          <div class="field">
            <label class="label" for="alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="alamat_insert" placeholder="Alamat" required v-model="formAdd.alamat">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nomor_hp_insert">Nomor HP</label>
            <div class="control">
              <input class="input" type="number" id="nomor_hp_insert" placeholder="Nomor HP" required v-model="formAdd.nomor_hp">
            </div>
          </div>
          <div class="field">
            <label class="label" for="cashier_insert">Cashier</label>
            <div class="control">
              <div class="select is-primary">
                <select name="cashier_insert" id="cashier_insert" v-model="formAdd.cashier">
                  <option v-for="val in cashier" :value="val.id_cashier">{{val.nama_lengkap}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="bunga_insert">Bunga</label>
            <div class="control">
              <div class="select is-primary">
                <select name="bunga_insert" id="bunga_insert" v-model="formAdd.bunga">
                  <option v-for="val in bunga" :value="val.kode_bunga">{{val.nama_bunga}}</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";
export default {
  name: "CustomerListView",
  data(){
    return{
      customer: [],
      cashier: [],
      bunga: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id_customer: '',
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        cashier: '',
        bunga: '',
        kode_bunga: '',
        id_cashier: '',
        nama_bunga: '',
      },
      formEdit: {
        id_customer: '',
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        cashier: '',
        bunga: '',
        kode_bunga: '',
        id_cashier: '',
        nama_bunga: '',
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://floristya.000webhostapp.com/pages/customer/index.php`,{
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
    },
    loadCashier(){
      this.isLoading = true;
      fetch(`https://floristya.000webhostapp.com/pages/cashier/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.cashier = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    loadBunga(){
      this.isLoading = true;
      fetch(`https://floristya.000webhostapp.com/pages/bunga/index.php`,{
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
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const selectedData = this.customer[this.selectedIndex];
        const payload = new URLSearchParams({
          'id_customer': selectedData.id_customer
        });
        fetch(`https://floristya.000webhostapp.com/pages/customer/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.customer.splice(this.selectedIndex, 1);
            }
            return response.json();
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }
          })
          .catch(()=>{
            alert('Terjadi error')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        const payload = new URLSearchParams({
          id_customer: this.formEdit.id_customer,
          nama_lengkap: this.formEdit.nama_lengkap,
          alamat: this.formEdit.alamat,
          nomor_hp: this.formEdit.nomor_hp,
          cashier: this.formEdit.cashier,
          bunga: this.formEdit.bunga,
        });
        fetch(`https://floristya.000webhostapp.com/pages/customer/update.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              /*
              Update data pada kolom yg diupdate
               */
              this.customer[this.selectedIndex] = json.data;
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.selectedIndex = -1;
          })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.customer[index];
      this.formEdit = {
        id_customer: selectedData.id_customer,
        nama_lengkap: selectedData.nama_lengkap,
        alamat: selectedData.alamat,
        nomor_hp: selectedData.nomor_hp,
        cashier: selectedData.cashier,
        bunga: selectedData.bunga,
      }
      nextTick(()=>{
        document.getElementById('nama_lengkap_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('id_customer_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        id_customer: this.formAdd.id_customer,
        nama_lengkap: this.formAdd.nama_lengkap,
        alamat: this.formAdd.alamat,
        nomor_hp: this.formAdd.nomor_hp,
        cashier: this.formAdd.cashier,
        bunga: this.formAdd.bunga,
      });
      fetch(`https://floristya.000webhostapp.com/pages/customer/create.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })
        .then(response => {
          return response.json()
        })
        .then(json =>{
          if(!json.status){
            alert(json.error);
          }else{
            this.customer.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama_lengkap = '';
        })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        cashier: '',
        bunga: ''
      }
    }
  },
  mounted() {
    this.load();
    this.loadCashier();
    this.loadBunga();
  }
}
</script>

<style scoped>
</style>