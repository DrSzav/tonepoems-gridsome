<template>
      <div :class="keyboardClass"></div>
</template>

<script>

import Keyboard from "simple-keyboard";


export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String
    }
  },
  data: () => ({
    keyboard: null
  }),
  mounted() {

  //  const Keyboard = require("simple-keyboard").default;
//    require("simple-keyboard/build/css/index.css")

    this.keyboard = new Keyboard({
      //onChange: input => onChange(input),
      //onKeyPress: button => onKeyPress(button),
      mergeDisplay: true,
      layoutName: "default",
      layout: {
        default: [
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "{shift} z x c v b n m {backspace}",
          "{numbers} {space} {ent}"
        ],
        shift: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "{shift} Z X C V B N M {backspace}",
          "{numbers} {space} {ent}"
        ],
        numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
      },
      display: {
        "{numbers}": "123",
        "{ent}": "return",
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "⌫",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{abc}": "ABC"
      },
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    });
  },
  methods: {
    onChange(input) {
    //  this.$emit("onChange", input);
    },
    onKeyPress(button) {

      this.$emit("onKeyPress", button);
        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}"){
          this.handleShift();
          return;
        }
        if (button === "{numbers}" || button === "{abc}"){
          this.handleNumbers();
          return;
        }

        console.log("Button pressed", button);
        //thi
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    },
    handleNumbers() {
      let currentLayout = this.keyboard.options.layoutName;
      let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

      this.keyboard.setOptions({
        layoutName: numbersToggle
      });
    }
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  body,html{margin:0;padding:0}.simple-keyboard{font-family:HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;box-sizing:border-box;overflow:hidden;touch-action:manipulation}.simple-keyboard .hg-row{display:flex}.simple-keyboard .hg-row:not(:last-child){margin-bottom:5px}.simple-keyboard .hg-row .hg-button-container,.simple-keyboard .hg-row .hg-button:not(:last-child){margin-right:5px}.simple-keyboard .hg-row>div:last-child{margin-right:0}.simple-keyboard .hg-row .hg-button-container{display:flex}.simple-keyboard .hg-button{display:inline-block;flex-grow:1;cursor:pointer}.simple-keyboard .hg-button span{pointer-events:none}.simple-keyboard.hg-theme-default{background-color:rgba(0,0,0,.1);padding:5px;border-radius:5px}.simple-keyboard.hg-theme-default .hg-button{box-shadow:0 0 3px -1px rgba(0,0,0,.3);height:40px;border-radius:5px;box-sizing:border-box;padding:5px;background:#fff;border-bottom:1px solid #b5b5b5;cursor:pointer;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.simple-keyboard.hg-theme-default .hg-button.hg-activeButton{background:#efefef}.simple-keyboard button.hg-button{border-width:0;outline:0;font-size:inherit}.simple-keyboard.hg-theme-default.hg-layout-numeric .hg-button{width:33.3%;height:60px;align-items:center;display:flex;justify-content:center}.simple-keyboard.hg-theme-default .hg-button.hg-button-numpadadd,.simple-keyboard.hg-theme-default .hg-button.hg-button-numpadenter{height:85px}.simple-keyboard.hg-theme-default .hg-button.hg-button-numpad0{width:105px}.simple-keyboard.hg-theme-default .hg-button.hg-button-com{max-width:85px}.simple-keyboard.hg-theme-default .hg-button.hg-standardBtn.hg-button-at{max-width:45px}.simple-keyboard.hg-theme-default .hg-button.hg-selectedButton{background:rgba(5,25,70,.53);color:#fff}.simple-keyboard.hg-theme-default .hg-button.hg-standardBtn[data-skbtn=".com"]{max-width:82px}.simple-keyboard.hg-theme-default .hg-button.hg-standardBtn[data-skbtn="@"]{max-width:60px}
 /*# sourceMappingURL=index.css.map */
</style>
