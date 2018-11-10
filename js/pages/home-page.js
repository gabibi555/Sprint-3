

export default {
    template: `
        <section class="home-page" >
            <h1 class="home-title">Welcome to AppSus!</h1>
          <div class="big-btns-container">
              <div @click="goEmail" class="go-to-email">
                  <div class="go-to-emailtxt">
                      To emailVile
                  </div>
              </div>
              <div @click="goNote" class="go-to-note">
                  <div class="go-to-emailtxt">
                      To noteVile
                  </div>
              </div>
              
          </div>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        goEmail() {
            this.$router.push('/emailville');
        },
        goNote() {
            this.$router.push('/noteville');
        }
    },
    created() {

    },
    computed: {

    }

};