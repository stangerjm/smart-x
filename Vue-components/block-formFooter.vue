<template>
    <div class="form-section--footer">
        <div class="footer-segment">
            <bit-btn btn-style="add" is-link="true" href="#">Add</bit-btn>
        </div>
    </div>
</template>

<script>
  import bitBtn from './bit-btn'
  export default {
    name: "block-form-footer",
    components: {
      bitBtn
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/templates";
    @import "../sass/variables";
    @import "../sass/misc";

    .form-section--footer {
        @extend %form-segment;
        border-radius: 0 0 10px 10px;

        @include format-responsive(row, space-between, wrap) {
            grid-auto-flow: column;
            @media screen and (max-width: $break-med) {
                grid-auto-flow: row;
            }
        }
    }

    /// Styles a footer segment to allow a footer to be broken up into
    /// multiple flexible sections. Ensures correct layout.
    .footer-segment {
        @media screen and (max-width: $break-med) {
            @include format-responsive(column, null, null) {
                grid-auto-flow: row;
            }
        }
    }
</style>