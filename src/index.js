import './styles.css'
import Input from './components/Input.vue'
import Button from './components/Button.vue'

export { Input, Button }

export default {
  install(app) {
    app.component('MzInput', Input)
    app.component('MzButton', Button)
  }
}

