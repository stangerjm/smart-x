<template>
    <span :class="iconClass"></span>
</template>

<script>
    export default {
        name: "bit-icon",
        props: {
          iconType: {
            type: String,
            required: true
          }
        },
        data: function() {
            return {
                iconClass: this.getClass(this.iconType)
            }
        },
        methods: {
          getClass: function(type) {
            let allowedTypes = ['user', 'sort'];
            if (!type) {
              return 'error-icon';
            } else if (allowedTypes.includes(type)) {
              return type + '-icon';
            } else {
              return 'error-icon';
            }
          }
        }
    }
</script>

<style scoped lang="scss">
    @import "../sass/variables";
    @import "../sass/templates";

    /// Styles a user / profile icon.
    .user-icon {
        height: 18px;

        &:before {
            @extend %icon;
            @include icon-url('user.png', 12px);
            height: 18px;
        }
    }

    /// Icon that is added to a sortable table column to indicate the
    /// column is sortable.
    .sort-icon {
        display: inline-block;

        &:before {
            @extend %icon;
            @include icon-url('sort.png', 0.6em);
            height: 1em;
        }
    }

    .error-icon {
        &:before {
            @extend %icon;
            content: '!';
            color: red;
        }
    }
</style>