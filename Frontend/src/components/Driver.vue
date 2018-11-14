<template>
  <div class="driver">
    <div class="header">
      <div class="img">
        <img src="../assets/car.png"/>
      </div>
      <div class="titleDiv">
        <label>Driver App</label>
      </div>
    </div>

    <div class="status">
      <div class="content_status">
        <p class="textStt">Status: </p>
      </div>
      <div class="content_status">
        <p class="textStt" id="content" v-bind:style= "{ color: ColorStatus }">{{ Status }}</p>
      </div>
      <div class="content_status">
        <label class="switch">
          <input type="checkbox" @click="changeStt" id="check">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Driver',
  data () {
    return {
      Status: 'STANDBY',
      ColorStatus: 'red'
    }
  },
  methods: {
    changeStt () {
      let check = document.getElementById('check').checked
      if (check) {
        this.Status = 'READY'
        this.ColorStatus = 'blue'
      } else {
        this.Status = 'STANDBY'
        this.ColorStatus = 'red'
      }
    }
  }
}
</script>

<style scoped>
  .header {
    height: 4rem;
    width: 100%;
    background-color: rgb(162, 235, 186);
  }
  .img {
    float: left;
    width: 20%;
  }
  img {
    height: 3.8rem;
    width: 3.5rem;
    margin-left: 1rem;
  }
  .titleDiv {
    float: left;
    width: 65%;
    text-align: center;
    line-height: 4rem;
  }
  label {
    vertical-align: middle;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 2rem;
  }
  .status {
    margin-top: 2rem;
    height: 3rem;
  }
  .content_status {
    float: left;
    width: 25%;
    margin-left: 1rem;
  }
  .textStt {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 6rem;
    height: 2rem;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.8rem;
    width: 1.8rem;
    left: .1rem;
    bottom: .105rem;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(4rem);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 3.5rem;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
