<template>
    <nav class="smart-nav">
        <header class="smart-nav--header">
            <main class="smart-nav--headerMain">
                <a href="/"><img src="/images/wspLogo.png" class="smart-nav--logo" alt="Logo" width="100"
                                 height="50"></a>
                <h5>{{navTitle}}</h5>
            </main>
            <aside class="smart-nav--headerAside">
                <bit-icon icon-type="user"></bit-icon>
                <span class="smart-nav--userTime">{{usr}} - {{currentDateTime}}</span>
            </aside>
        </header>
        <main class="smart-nav--list">
            <block-nav-list
                    :list-items="navItems">
            </block-nav-list>
        </main>
    </nav>
</template>

<script>
  /**
   * A component that renders a responsive navigation.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "smart-nav",
    components: {
      blockNavList: () => import('./block-navList')
    },
    props: {
      /**
       * Title to display at the top of the navigation.
       */
      navTitle: {
        required: true,
        type: String
      },
      /**
       * The current user's username.
       */
      usr: {
        required: true,
        type: String
      },
      /**
       * List of items to render in the navigation.
       */
      navItems: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        currentDateTime: null
      }
    },
    methods: {
      /**
       * Gets the current date and time in the format: "MM/DD/YY HH:MM:SS"
       * @param fromDate
       * @returns {string}
       */
      getTime: function (fromDate = null) {
        let currentTime = fromDate ? fromDate : new Date();
        let year = currentTime.getFullYear().toString().slice(-2);
        let day = this.formatTime(currentTime.getDate());
        let month = this.formatTime(currentTime.getMonth() + 1);
        let hours = this.formatTime(currentTime.getHours());
        let minutes = this.formatTime(currentTime.getMinutes());
        let seconds = this.formatTime(currentTime.getSeconds());

        //format hours to reflect 12hr time
        if (hours > 12) {
          hours = this.formatTime(hours - 12);
        } else if (hours == 0) {
          hours = this.formatTime(12);
        }

        return month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
      },
      /**
       * Starts the clock that will update every second.
       */
      startClock: function () {
        this.currentDateTime = this.getTime();
        setTimeout(this.startClock, 1000);
      },
      /**
       * Formats the passed in value to have a leading 0 if needed.
       * @param value
       * @returns {string}
       */
      formatTime: function (value) {
        return (value < 10 ? '0' : '') + value;
      }
    },
    /**
     * Start the clock when mounted.
     */
    mounted: function () {
      this.startClock()
    }
  }
</script>

<style scoped lang="scss">
    @import "../../sass/global/mixins";
    @import "../../sass/global/variables";
    @import "../../sass/components/smart/nav/smart-nav";
</style>