<template>
    <section class="smart-accordion">
        <input :id="inputId" class="smart-accordion--toggle" name="accordion-1" type="checkbox" @click="toggleExpand">
        <label :for="inputId" class="smart-accordion--label">{{title}}</label>
        <article class="smart-accordion--content">
            <!-- @slot Allows content to be passed into the expanded portion. -->
            <slot></slot>
        </article>
    </section>
</template>

<script>
  /**
   * A component that renders a responsive accordion that can contain any HTML content.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "smart-accordion",
    props: {
      /**
       * The title that will display before the accordion.
       */
      title: {
        type: String,
        default: "Click to expand"
      }
    },
    data() {
      return {
        isExpanded: false,
        inputId: 'ac-' + Math.random().toString(36).substr(2, 9)
      }
    },
    methods: {
      /**
       * Toggles the accordion to expand or collapse.
       */
      toggleExpand: function () {
        if (!this.isExpanded) {
          this.expandData();
          this.isExpanded = true;
        } else {
          this.collapseData();
          this.isExpanded = false;
        }
      },
      /**
       * Expands the accordion relative to the combined height of each of its children.
       */
      expandData: function () {
        let contentContainer = this.$el.querySelector(".smart-accordion--content");
        let totalHeight = 0;

        //loop through each child and add the height of each
        for (let contentItem of contentContainer.childNodes) {
          let itemHeight = contentItem.offsetHeight;
          if (itemHeight) {
            totalHeight += itemHeight;
          }
        }

        contentContainer.style.height = totalHeight + 'px';
      },
      /**
       * Collapses the accordion by setting the container to have no height.
       */
      collapseData: function () {
        let contentContainer = this.$el.querySelector(".smart-accordion--content");
        contentContainer.style.height = 0 + 'px';
      },
      /**
       * Event handler that will continually resize the container if it is expanded.
       */
      handleResize: function () {
        if (this.isExpanded) {
          this.expandData();
        }
      }
    },
    /**
     * Setup an event listener on window resize to resize the UI if needed.
     */
    created: function () {
      window.addEventListener('resize', this.handleResize);
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/smart-accordion";
</style>