<template>
  <v-app>
    <v-content class="bg_blue">
    
      <div class="front card mx-auto mt-6 elevation-12" :style="{ backgroundColor : bank_bg }">
        <div class="logo_block">
          <img class="bank-logo" :src='bank_logo' />
          <img class="brand-logo" :src='brand' />
        </div>
        <div class="fields fields_wrap">
          <div class="field number">{{card_number}}</div>
        </div>
        <div class="fields fields_wrap">
          <div class="field font-weight-light">Card holder
            <div class="card-holder font-weight-bold">{{card_holder | uppercase}}</div>
          </div>
          <div class="field font-weight-light">Expires
            <div class="expires font-weight-bold">{{month_number(expires_m)}}/{{expires_y}}</div>
          </div>
        </div>
      </div>
    
      <v-card class="form_block mx-auto pa-md-8" 
      elevation="12">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" >
                <v-text-field
                  @keyup="numberFunc"
                  v-model="card_number"
                  :counter="19"
                  label="Card number"
                  required
                  v-mask="'#### #### #### ####'"
                ></v-text-field>
              </v-col>

              <v-col cols="12" >
                <v-text-field
                  v-model="card_holder"
                  label="Card name"
                  required
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" md="4">
                <v-select
                   v-model="expires_m"
                  :items="months"
                  label="Month"
                  required
                  ></v-select>

              </v-col>

              <v-col cols="12" md="4">
               <v-text-field
                  v-model="expires_y"
                  label="Year"
                  :counter="4"
                   v-mask="'####'"
                  required
                ></v-text-field>
              </v-col>


              <v-col cols="12" md="4">
                <v-text-field  
                label="CW" 
                required
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>
        </v-form>
        <v-btn color="primary">Submit</v-btn>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data: () => ({
    bank_logo: '',
    brand:'',
    bank_bg: "#6f6f6f",
    expires_m:'',
    expires_y:'',
    card_holder:'',
    card_number:null,
    months:[
      'January',
      'February	',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }),
  methods: {
   numberFunc: function () {
      this.axios
      .get(
        'https://api.cardinfo.online?input='+this.card_number.replace(/ /g, '').slice(0, 6)+'&apiKey=1f3561f330fc57fb70874450347d35bc'
      )
      .then(response => {
        this.bank_logo = response.data.bankLogoBigLightSvg
        this.bank_bg = response.data.formBackgroundColor
        this.brand = response.data.brandLogoLightSvg
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
    },
    month_number(el){
      var i = this.months.indexOf(el)+1
      if(i.toString().length == 1){
        return '0'+i
      }else{
        return i
      }
    } 
    
  },

  filters:{
    uppercase(value){
       return value.toUpperCase() 
    }
  }
}
</script>
<style>

body {
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

* {
  box-sizing: border-box;
  outline: none;
}

.card {
  width: 420px;
  height: 264px;
  border-radius: 15px;
  padding: 25px;
  margin-top: 25px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.card.front {
  border: 1px solid #bbb;
  background-color: #6f6f6f;
  top: 0;
  left: 0;
  z-index: 100;
  position: relative;
}
.bank-logo {
  max-width: 50%;
}
.brand-logo {
  width: 55px;
}
.logo_block{
  display: flex;
  justify-content: space-between;
}
.fields_wrap{
  display: flex;
  justify-content: space-between;
}
.field{
  font-size: 14px;
  color: #fff;
}
.number{
  width: 100%;
  font-size: 30px;
  text-align: center;
  color: #fff;
}
.number::placeholder {
  color: #fff;
}
.form_block {
  width: 558px;
  margin-top: -126px;
}
.form_block form{
  padding-top: 94px;
}
.bg_blue{
  background: #d5eafd;
}
</style>