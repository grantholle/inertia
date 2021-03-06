import Vue from 'vue'
import { InertiaApp, plugin } from '@inertiajs/inertia-vue'
import { Inertia } from '@inertiajs/inertia'

if (window.location.pathname.startsWith('/plugin/deprecated')) {
  Vue.use(InertiaApp)
} else if (! window.location.pathname.startsWith('/plugin/without')) {
  Vue.use(plugin)
}

const transformProps = props => {
  return {
    ... props,
    bar: 'transformed',
  }
}

const resolveErrors = page => {
  // Alerting the page object, to test that it is available.
  alert(page)

  // Return the custom resolved errors
  return {
    overloaded: 'manually',
  }
}

const app = document.getElementById('app')

window.testing = {}
window.testing.Inertia = Inertia
window.testing.vue = new Vue({
  render: h => h(InertiaApp, {
    props: {
      initialPage: window.initialPage,
      resolveComponent: name => {
        return import(`./Pages/${name}`).then(module => module.default)
      },
      ... (window.location.pathname.startsWith('/transform-props') ? { transformProps } : {}),
      ... (window.location.pathname.startsWith('/error-resolver') ? { resolveErrors } : {}),
    },
  }),
  methods: {
    tap: (value, callback) => {
      callback(value)
      return value
    },
  },
}).$mount(app)
