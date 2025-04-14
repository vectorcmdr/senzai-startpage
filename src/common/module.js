const components = {
  'search-bar': Search,
  'config-editor': ConfigEditor,
  'todo-list': Todo,
  'status-bar': Statusbar,
  'currency-compare': Currency,
  'current-time': Clock,
  'weather-forecast': Weather,
  'tabs-list': Tabs,
  'modal-popup': Modal
};

Object.keys(components).forEach(componentName => {
  if (!CONFIG.disabled.includes(componentName))
    customElements.define(componentName, components[componentName]);
});
