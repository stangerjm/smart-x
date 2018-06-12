<template>
    <!--
        TODO: Implement
    -->
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
    @import "../sass/global/mixins";
    @import "../sass/global/variables";

    .form-section--footer {
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