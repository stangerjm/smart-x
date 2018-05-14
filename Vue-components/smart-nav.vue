<template>
    <nav class="smart-nav">
        <header class="smart-nav--header">
            <main>
                <a href="/"><img src="/images/wspLogo.png" class="smart-nav--logo" alt="Logo" width="100" height="50"></a>
                <h5>{{navTitle}}</h5>
            </main>
            <aside>
                <bit-icon icon-type="user"></bit-icon> <span>{{usr}} - {{currentDateTime}}</span>
            </aside>
        </header>
        <main class="smart-nav--list">
            <block-nav-list
                    :type="tabType"
                    :items="navItems">
            </block-nav-list>
        </main>
    </nav>
</template>

<script>
    import bitIcon from './bit-icon'
    import blockNavList from './block-navList'
    export default {
        name: "smart-nav",
        props: {
          navTitle: {
            required: true,
            type: String
          },
          usr: {
            required: true,
            type: String
          },
          navItems: {
            required: true,
            type: Array
          },
          tabType: {
            type: String
          }
        },
        components: {
            bitIcon,
            blockNavList
        },
        data() {
            return {
                currentDateTime: null
            }
        },
        methods: {
            getTime: function(fromDate = null) {
              let currentTime = fromDate ? fromDate : new Date();
              let year = currentTime.getFullYear().toString().slice(-2);
              let day = this.formatTime(currentTime.getDate());
              let month = this.formatTime(currentTime.getMonth() + 1);
              let hours = this.formatTime(currentTime.getHours());
              let minutes = this.formatTime(currentTime.getMinutes());
              let seconds = this.formatTime(currentTime.getSeconds());

              //format hours to reflect 12hr time
              if(hours > 12) {
                hours = this.formatTime(hours - 12);
              } else if(hours == 0) {
                hours = this.formatTime(12);
              }

              return month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
            },
            startClock: function() {
              this.currentDateTime = this.getTime();
              setTimeout(this.startClock, 1000);
            },
            formatTime: function(value) {
                return (value < 10 ? '0' : '') + value;
            }
        },
        mounted: function() {
            this.startClock()
        }
    }
</script>

<style scoped lang="scss">
    @import "../sass/templates";
    @import "../sass/variables";

    /// Sets layout and basic styles for a navigation
    .smart-nav {
        border-bottom: 1px solid $patch-orange--deep;
        background-color: $uniform-blue;

        &--header {
            @include format-responsive(row, space-between, null) {
                grid-template-columns: 1fr 1fr 1fr;
            };

            align-items: center;

            > main {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;

                @media screen and (min-width: $break-med) {
                    /* Force width on Flexbox version to guarantee width */
                    width: 350px;

                    /* override above width rule on Grid version */
                    @supports (display: grid) {
                        width: auto;
                    }
                }
            }

            > aside {
                @supports (display: grid) {
                    grid-column: 3;
                    justify-self: center;
                }
            }

            @media screen and (max-width: $break-med) {
                display: block;

                > aside {
                    margin-left: 20px;
                }

                > main {
                    justify-content: flex-start;
                }
            }
        }

        &--list {
            @media screen and (max-width: $break-med) {
                margin-left: 20px;
            }
        }

        &--logo {
            margin: 10px 20px;
        }
    }
</style>