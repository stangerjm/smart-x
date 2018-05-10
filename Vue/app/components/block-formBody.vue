<template>
    <!--<div class="form-section">-->
        <!--<label for="search">Find by ID/Name</label>-->
        <!--<bit-input id="search"></bit-input>-->
    <!--</div>-->
</template>

<script>
  import bitInput from './bit-input'
  import bitBtn from './bit-btn'
  export default {
    name: "block-form-body",
    components: {
      bitInput,
      bitBtn
    }
  }
</script>

<style scoped lang="scss">
    @import "../../../sass/variables";
    @import "../../../sass/templates";

    /// Styles a section of the form. Allows a body to be styled using
    /// .form-section, a heading to be styled using .form-section--heading
    /// , and a footer to be styled using .form-section--footer.
    .form-section {
        @extend %form-segment;
        align-items: center;
        @include format-responsive(row, null, null) {
            grid-template-columns: 125px 1fr;
            justify-content: start;
            @media screen and (max-width: $break-sml) {
                grid-template-columns: auto auto;
            }
        }
    }
</style>