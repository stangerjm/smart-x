<template>
    <div class="form-section--heading">
        <div class="heading-segment">
            <h2 class="form-title">{{formTitle}}</h2>
            <bit-btn btn-style="add" :is-link="true" href="#">Add</bit-btn>
        </div>
        <div class="heading-segment">
            <div class="toggle-container">
                <div :class="searchContainerClass">
                    <bit-input input-type="text" label-text="Find by ID/Name"></bit-input>
                    <bit-input input-type="number" label-text="Number of Results Per Page"></bit-input>
                    <bit-btn type="submit" btn-style="search">Search</bit-btn>
                </div>
            </div>
            <bit-btn btn-style="search" v-show="isSearchBtn" @click.native="toggle()"></bit-btn>
            <bit-btn btn-style="exit" v-show="!isSearchBtn" @click.native="toggle()"></bit-btn>
        </div>
    </div>
</template>

<script>
  import bitBtn from './bit-btn'
  import bitInput from './bit-input'
  export default {
    name: "block-form-heading",
    props: {
      formTitle: {
        type: String,
        required: true
      }
    },
    components: {
      bitInput,
      bitBtn
    },
    data() {
      return {
        isSearchBtn: true,
        searchContainerClass: "search-container is-hidden"
      }
    },
    methods: {
      toggle: function() {
        this.isSearchBtn = !this.isSearchBtn;
        if(this.isSearchBtn) {
          this.searchContainerClass = "search-container is-hidden";
        } else {
          this.searchContainerClass = "search-container";
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/templates";
    @import "../sass/variables";

    .form-section--heading {
        @extend %form-segment;
        border-radius: 10px 10px 0 0;
        align-items: center;
        @include format-responsive(row, space-between, wrap) {
            grid-auto-flow: column;
        }
    }

    .form-title {
        margin: 0 10px;
    }

    .heading-segment {
        display: flex;
        align-items: center;
    }

    .toggle-container {
        overflow: hidden;
    }

    .search-container {
        display: flex;
        align-items: center;
        transition: transform 700ms ease-in-out;
        right: 75px;
        top: 0;

        &.is-hidden {
            transform: translateX(1000px);
        }
    }

    @media screen and (max-width: 950px) {
        .form-section--heading {
            position: relative;
        }

        .search-container {
            flex-direction: column;
            align-items: start;
        }

        .toggle-container {
            position: absolute;
            left: 0;
            top: 50px;
        }
    }

</style>