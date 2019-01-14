import _ from 'lodash'

const createPublish = (store, machineNamespace = 'APP') =>
  (action, payload, updateHistory = false) =>
    store.dispatch({
      payload,
      type: `${machineNamespace}/${_.upperCase(_.kebabCase(action))}`
    })

export default createPublish
