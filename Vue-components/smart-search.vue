<template>
    <form :action="action" :method="method" class="smart-search">
        <div class="smart-search--heading">
            <div class="smart-search--headingSegment">
                <h2 class="smart-search--title">{{formTitle}}</h2>
                <bit-btn btn-style="add" :is-link="true" :href="action + '/Create'">Add</bit-btn>
            </div>
            <div class="smart-search--headingSegment">
                <div class="smart-search--toggleContainer">
                    <div :class="['smart-search--fieldContainer', isHidden ? 'is-hidden' : '']">
                        <bit-input
                                :is-disabled="isHidden"
                                input-type="text"
                                label-text="Find by ID/Name"
                                input-name="search-field">
                        </bit-input>
                        <bit-input
                                :is-disabled="isHidden"
                                input-type="number"
                                label-text="Number of Results Per Page"
                                input-name="page-number">
                        </bit-input>
                        <bit-btn :disabled="isHidden" type="submit" btn-style="search">Search</bit-btn>
                    </div>
                </div>
                <bit-btn class="smart-search--btnSearch" btn-style="plainSearch" v-show="isHidden"
                         @click.native="toggle()"></bit-btn>
                <bit-btn class="smart-search--btnExit" btn-style="plainExit" v-show="!isHidden"
                         @click.native="toggle()"></bit-btn>
            </div>
        </div>
    </form>
</template>

<script>
  import bitBtn from './bit-btn'
  import bitInput from './bit-input'

  /**
   * A component that renders a mobile oriented search bar.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "smart-search",
    components: {
      bitBtn,
      bitInput
    },
    data() {
      return {
        /**
         * Flag indicating that the search is hidden.
         */
        isHidden: true,
        /**
         * Class for the search container.
         */
        searchContainerClass: "smart-search--fieldContainer is-hidden"
      }
    },
    props: {
      /**
       * Corresponds to the native HTML form attribute "action"
       */
      action: {
        type: String,
        required: true
      },
      /**
       * Corresponds to the native HTML form attribute "method"
       */
      method: {
        type: String,
        required: true
      },
      /**
       * The title that will display to the right of the search.
       */
      formTitle: {
        type: String,
        required: true
      }
    },
    methods: {
      /**
       * Toggles the search bar visibility.
       */
      toggle: function () {
        if (this.isHidden) {
          this.isHidden = false;
          this.resize();
        } else {
          this.isHidden = true;
          let self = this;
          setTimeout(function () {
            self.$el.querySelector('.smart-search--heading').style.minHeight = 0;
          }, 400);
        }
      },
      /**
       * Event handler for the resize event. Dynamically set the height of the search container, and change
       * the style of the toggle buttons on smaller screens.
       */
      resize: function () {
        if (!this.isHidden) {
          let heading = this.$el.querySelector('.smart-search--heading');
          let search = heading.querySelector('.smart-search--fieldContainer');
          let titleSegment = heading.querySelector('.smart-search--headingSegment');
          let documentWidth = document.body.clientWidth + 15;

          //do not add search height if screen is less than breakpoint
          let searchHeight = documentWidth < 1000 ? search.offsetHeight + 30 : 0;
          let segmentHeight = documentWidth < 1000 ? titleSegment.offsetHeight : 0;

          console.log('Search height is: ' + searchHeight);
          console.log('Segment height is: ' + segmentHeight);

          heading.style.minHeight = searchHeight + segmentHeight + 'px';
        }
      }
    },
    /**
     * Sets up an event listener and the above handler for the "resize" event
     */
    created: function () {
      window.addEventListener('resize', this.resize);
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/base";
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
        }
    ;

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

        &.is-hidden {
            transform: translateX(1000px);
        }
    }

    /// Break down into mobile view.
    ///    Set transition on min-height and cause search to appear from top
    ///    Hide search by positioning absolutely and placing off screen
    ///    Ensure all elements line up to the left
    @media screen and (max-width: 1000px) {
        .smart-search--heading {
            position: relative;
            align-content: start;
        }

        .smart-search--toggleContainer {
            position: absolute;
            left: 0;
            top: 60px;
        }

        .smart-search--fieldContainer {
            @include alter-responsive(column, null, null);
            align-items: flex-start;
            width: 100%;
        }
    }
</style>