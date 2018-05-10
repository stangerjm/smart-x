<template>
    <section class="smart-accordion">
        <input :id="inputId" class="smart-accordion--toggle" name="accordion-1" type="checkbox" @click="toggleExpand">
        <label :for="inputId" class="smart-accordion--label">{{title}}</label>
        <article class="smart-accordion--content">
            <slot></slot>
        </article>
    </section>
</template>

<script>
  export default {
    name: "smart-accordion",
    props: {
      title: {
        type: String,
        default: "Click to expand"
      }
    },
    data() {
      return {
        isExpanded: false,
        inputId: 'ac-' + Math.random().toString(36).substr(2,9)
      }
    },
    methods: {
      toggleExpand: function() {
        if (!this.isExpanded) {
          this.expandData();
          this.isExpanded = true;
        } else {
          this.collapseData();
          this.isExpanded = false;
        }
      },
      expandData: function() {
        let contentContainer = this.$el.querySelector(".smart-accordion--content");
        let totalHeight = 0;

        for(let contentItem of contentContainer.childNodes) {
          let itemHeight = contentItem.offsetHeight;
          if(itemHeight) {
            totalHeight += itemHeight;
          }
        }

        contentContainer.style.height = totalHeight + 'px';
      },
      collapseData: function() {
        let contentContainer = this.$el.querySelector(".smart-accordion--content");
        contentContainer.style.height = 0 + 'px';
      },
      handleResize: function() {
        if (this.isExpanded) {
          this.expandData();
        }
      }
    },
    created: function() {
      window.addEventListener('resize', this.handleResize);
    }
  }
</script>

<style scoped lang="scss">
    @import "../../../sass/variables";

    %drop-arrow {
        content: '';
        position: absolute;
        width: 15px;
        height: 13px;
        right: 10px;
        top: 13px;
        background: transparent url(../../../source/images/sort.png) 0 -11px / 15px no-repeat;
    }

    .smart-accordion {
        width: 80%;
        margin: 10px auto;
    }

    .smart-accordion--label {
        padding: 5px 20px;
        position: relative;
        z-index: 20;
        display: block;
        cursor: pointer;
        line-height: 33px;
        background: $generic-grey;

        &:hover {
            background: lighten($generic-grey, 5%);

            &:after {
                @extend %drop-arrow;
            }
        }
    }

    .smart-accordion--toggle {
        display: none;

        &:checked + .smart-accordion--label {
            background: saturate($uniform-blue, 10%);

            &:hover {
                &:after {
                    @extend %drop-arrow;
                    background: url(../../../source/images/sort.png) 0 3px / 15px no-repeat;
                }
            }
        }
    }

    .smart-accordion--content {
        overflow: hidden;
        height: 0;
        position: relative;
        z-index: 10;
        transition: height 500ms ease-in-out;
        background: #E9E9E9;
        box-shadow: 0 0 2px 0 inset;

        > * {
            margin: 0;
        }
    }
</style>