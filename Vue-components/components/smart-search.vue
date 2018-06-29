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
                                class="smart-search--field"
                                :disabled="isHidden"
                                input-type="text"
                                label-text="Find by ID/Name"
                                input-name="searchField">
                        </bit-input>
                        <bit-input
                                class="smart-search--field"
                                :disabled="isHidden"
                                input-type="number"
                                label-text="Number of Results Per Page"
                                input-name="pageNumber">
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
  /**
   * A component that renders a mobile oriented search bar.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "smart-search",
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

          //do not add search height if screen is less than breakpoint
          let searchHeight = search.offsetHeight + 30;
          let segmentHeight = titleSegment.offsetHeight;

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
    @import "../../sass/global/mixins";
    @import "../../sass/global/variables";
    @import "../../sass/components/smart/search/smart-search";
</style>