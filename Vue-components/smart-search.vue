<template>
    <form :action="action" :method="method" class="smart-search">
        <div class="smart-search--heading">
            <div class="smart-search--headingSegment">
                <h2 class="smart-search--title">{{formTitle}}</h2>
                <bit-btn btn-style="add" :is-link="true" :href="action + '/Create'">Add</bit-btn>
            </div>
            <div class="smart-search--headingSegment">
                <div class="smart-search--toggleContainer">
                    <div :class="['smart-search--fieldContainer', isSearchBtn ? 'is-hidden' : '']">
                        <bit-input
                                :is-disabled="isSearchBtn"
                                input-type="text"
                                label-text="Find by ID/Name"
                                input-name="search-field">
                        </bit-input>
                        <bit-input
                                :is-disabled="isSearchBtn"
                                input-type="number"
                                label-text="Number of Results Per Page"
                                input-name="page-number">
                        </bit-input>
                        <bit-btn :disabled="isSearchBtn" type="submit" btn-style="search">Search</bit-btn>
                    </div>
                </div>
                <bit-btn class="smart-search--btnSearch" :btn-style="searchStyle" v-show="isSearchBtn" @click.native="toggle()"></bit-btn>
                <bit-btn class="smart-search--btnExit" :btn-style="exitStyle" v-show="!isSearchBtn" @click.native="toggle()"></bit-btn>
            </div>
        </div>
    </form>
</template>

<script>
  import bitBtn from './bit-btn'
  import bitInput from './bit-input'
    export default {
      name: "smart-search",
      components: {
        bitBtn,
        bitInput
      },
      data() {
        return {
          isSearchBtn: true,
          searchContainerClass: "smart-search--fieldContainer is-hidden",
          searchStyle: 'plainSearch',
          exitStyle: 'plainExit'
        }
      },
      props: {
          action: {
            type: String,
            required: true
          },
          method: {
            type: String,
            required: true
          },
          formTitle: {
            type: String,
            required: true
          }
      },
      methods: {
        toggle: function() {
          if (this.isSearchBtn) {
            this.isSearchBtn = false;
            this.resize();
          } else {
            this.isSearchBtn = true;
            let self = this;
            setTimeout(function() {
              self.$el.querySelector('.smart-search--heading').style.minHeight = 0;
            }, 200);
          }
        },
        resize: function() {
          if (!this.isSearchBtn) {
            let heading = this.$el.querySelector('.smart-search--heading');
            let search = heading.querySelector('.smart-search--fieldContainer');
            let titleSegment = heading.querySelector('.smart-search--headingSegment');

            //do not add search height if screen is less than breakpoint
            let searchHeight = document.body.clientWidth < 950 ? search.offsetHeight : 0;

            heading.style.minHeight = searchHeight + titleSegment.offsetHeight + 'px';
          }

          let searchBtn = this.$el.querySelector('.smart-search--btnSearch');
          let exitBtn = this.$el.querySelector('.smart-search--btnExit');
          if (document.body.clientWidth < 768) {
            searchBtn.classList.remove('bit-btn-plainSearch');
            searchBtn.classList.add('bit-btn-search');

            exitBtn.classList.remove('bit-btn-plainExit');
            exitBtn.classList.add('bit-btn-exit');
          } else {
            searchBtn.classList.remove('bit-btn-search');
            searchBtn.classList.add('bit-btn-plainSearch');

            exitBtn.classList.remove('bit-btn-exit');
            exitBtn.classList.add('bit-btn-plainExit');
          }
        }
      },
      created: function() {
        window.addEventListener('resize', this.resize);
      }
    }
</script>

<style scoped lang="scss">
    @import "../sass/templates";
    @import "../sass/variables";

    /// Defines a flexible, responsive form. Allows for a "fancy"
    /// option that includes a drop-shadow.
    /// @example markup - Basic use
    ///     <form class="smart-form">
    ///       <!-- FORM SECTION, FIELDS, ETC. -->
    ///     </form>
    ///
    /// @example markup - Fancy Form
    ///     <form class="smart-form--fancy">
    ///       <!-- FORM SECTIONS, FIELDS, ETC. -->
    ///     </form>
    .smart-search {
        @include format-responsive(column, flex-start, null) {
            grid-template-columns: 100%;
            grid-auto-flow: row;
        };

        background: #d9d9d9;
        align-items: flex-end;
    }

    .smart-search--heading {
        transition: min-height 500ms;
        @extend %form-segment;
        border-radius: 10px 10px 0 0;
        align-items: center;
        @include format-responsive(row, space-between, wrap) {
            grid-auto-flow: column;
        }
    }

    .smart-search--title {
        margin: 0 10px;
    }

    .smart-search--headingSegment {
        display: flex;
        align-items: center;
    }

    .smart-search--toggleContainer {
        overflow: hidden;
    }

    .smart-search--fieldContainer {
        display: flex;
        align-items: center;
        transition: transform 700ms ease-in-out;
        right: 75px;
        top: 0;
        padding-right: 10px;

        @media screen and (min-width: 950px) {
            box-shadow: -1px 1px 4px 0 inset;
        }

        &.is-hidden {
            transform: translateX(1000px);
        }
    }

    /// Break down into mobile view.
    ///    Set transition on min-height and cause search to appear from top
    ///    Hide search by positioning absolutely and placing off screen
    ///    Ensure all elements line up to the left
    @media screen and (max-width: 950px) {
        .smart-search--heading {
            position: relative;
            align-content: start;
        }

        .smart-search--toggleContainer {
            position: absolute;
            left: 0;
            top: 45px;
        }

        .smart-search--fieldContainer {
            @include alter-responsive(column, null, null);
            align-items: flex-start;
            margin-left: 20px;
            width: 100%;
        }
    }
</style>