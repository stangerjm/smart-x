<template>
    <table class="smart-table">
        <tr class="record table-heading">
            <th class="sortable" v-for="heading in Object.keys(tableData[0])" v-if="isDisplayHeading(heading)">
                <template v-if="!unsearchableHeadings.includes(heading)">
                    <a class="wsp-link" :href="'/' + defaultContext + '?sortOrder=' + heading">
                        {{formatFromCamelCase(heading)}}
                    </a>
                    <bit-icon icon-type="sort"></bit-icon>
                </template>
                <template v-else>
                    {{formatFromCamelCase(heading)}}
                </template>
            </th>
            <th>Actions</th>
        </tr>
        <tr class="record" v-for="item in tableData">
            <td v-for="(key, index) in Object.keys(item)" v-if="isDisplayHeading(key)" :class="{'record-key': index < 2}">{{item[key]}}</td>
            <td>
                <block-action-container
                        :default-ctx="defaultContext"
                        :item-id="item.id"
                        :details-btn="allowDetails"
                        :details-ctx="item.detailsContext"
                        :edit-btn="allowEdit"
                        :edit-ctx="item.editContext"
                        :delete-btn="allowDelete"
                        :delete-ctx="item.deleteContext">
                </block-action-container>
            </td>
            <bit-btn btn-style="expand" @click.native="expandRecord"></bit-btn>
        </tr>
    </table>
</template>

<script>
    import blockActionContainer from './block-actionContainer'
    import bitBtn from './bit-btn'
    import bitIcon from './bit-icon'
    export default {
        name: "smart-table",
        components: {
          blockActionContainer,
          bitBtn,
          bitIcon
        },
        props: {
            tableData: {
                type: Array,
                required: true
            },
            defaultContext: {
                type: String,
                required: true
            },
            unsearchableHeadings: {
                type: Array,
                default: () => []
            },
            allowDelete: {
                type: Boolean,
                default: true
            },
            allowEdit: {
              type: Boolean,
              default: true
            },
            allowDetails: {
              type: Boolean,
              default: true
            },
        },
        methods: {
            expandRecord: function(event) {
                let row = event.target.parentNode;
                if (row.classList.contains("record-is-expanded")) {
                    row.classList.remove("record-is-expanded");
                } else {
                    row.classList.add("record-is-expanded");
                }

                //emit to parent that a record has been expanded so parent can resize appropriately
                this.$emit('recordExpanded');
            },
            isDisplayHeading: function(heading) {
              switch(heading) {
                case 'detailsContext':
                case 'editContext':
                case 'deleteContext':
                  return false;
                default:
                  return true;
              }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../sass/templates";
    @import "../sass/variables";

    ////
    /// @group Tables
    /// @author James Stanger
    ////

    /// Sets base styles for tables.
    /// @example scss - Basic use
    ///    .my-table {
    ///      @extend %table;
    ///    }
    %table {
        width: 100%;
        border-spacing: 0;
        border-collapse: separate;

        .record:nth-child(even) {
            background: $uniform-blue--light;
        }

        .table-heading {
            text-align: center;
            background: #cecece;

            @media screen and (max-width: $break-med) {
                font-size: 0.75em;
            }
        }

        .wsp-link {
            color: black;

            &:hover {
                text-decoration: underline;
            }
        }

        .heading-cell {
            text-align: center;
        }

        .bit-btn-expand {
            @include hide();
        }

        @media screen and (max-width: $break-sml) {
            td:not(.record-key), th {
                @include hide();
            }

            td:empty {
                border: none;
            }

            tr:not(.table-heading) {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 10px 0;
            }

            .bit-btn-expand {
                display: inherit;
                display: unset;
            }
        }
    }


    /// Set each record to fill container and be center aligned.
    .record {
        width: 100%;
        text-align: center;
    }

    /// Expand record into vertical view. Set expand button to indicate record is expanded.
    /// @example javascript - Apply onclick (jQuery)
    ///     $('<button class="bit-btn--expand"></button>')
    ///         .click(function() {
    ///             $(this).parent().toggleClass("record-is-expanded");
    ///     });
    .record-is-expanded {
        @media screen and (max-width: $break-sml) {
            @include alter-responsive(column, null, null);
            position: relative;

            .record-key {
                max-width: none;
            }

            td:last-of-type {
                border-bottom: none;
            }

            td:not(.record-key) {
                display: inline-block;
            }

            td {
                text-align: left;
                border-bottom: 1px solid black;
                border-collapse: collapse;
                margin: 5px 0;

                //for IE. Has no effect on Chrome or Firefox
                float: right;
            }

            td:first-child {
                padding-bottom: 10px;
            }

            .bit-btn-expand {
                max-width: 50px;
                position: absolute;
                right: 0;
                top: 5px;

                &:after {
                    content: "-" !important;
                }
            }
        }
    }

    /// Sets responsive styling on an HTML table.
    /// @example markup - Basic use
    ///     <table class="smart-table">
    ///         <!-- TABLE -->
    ///     </table>
    .smart-table {
        @extend %table;

        @media screen and (min-width: $break-sml + 1) {
            &, th, td {
                border: 1px solid black;
            }

            td {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        @media screen and (max-width: $break-med) {
            table-layout: fixed;
        }

        &--no-border {
            @extend %table;
        }
    }

    /// Class indicating that a part of the record is key information
    /// and should be displayed even when the record is expanded.
    /// @example markup - HTML Use
    ///     <td class="record-key">
    ///         {{recordId}}
    ///     </td>
    .record-key {
        max-width: 200px;
    }

    /// Applied to a sortable table column heading to disable select
    /// so user does not accidentally select text when trying to sort.
    .sortable {
        @include disable-select();
    }
</style>