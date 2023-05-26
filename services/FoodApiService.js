const APP_ID = '0022e75e'
const APP_KEY = '509117406bd888ad296d7498443d96f8'

export default {
  /**
   *
   * @param {String} method
   * @param {String} ressouces
   * @param {Array} urlParams
   * @param {Object} data
   * @returns
   */
  async call (method, ressouces, urlParams, data = null) {
    const HEADERS = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

    const BASE_URL = 'https://api.edamam.com/api/food-database/v2/'

    const urlParamsFormated = urlParams.map(({ name, value }) => {
      return `${name}=${value}`
    })

    const URL = `${BASE_URL}${ressouces}?app_id=${APP_ID}&app_key=${APP_KEY}${
      urlParamsFormated.length > 0 ? '&' + urlParamsFormated : ''
    }`

    console.log(URL)

    return fetch(URL, {
      method,
      headers: HEADERS,
      body: data
    })
      .then(async (response) => {
        return response
          .json()
          .then((json) => {
            return Promise.resolve(json)
          })
          .catch((error) => {
            Promise.reject(error)
          })
      })
      .catch((error) => {
        Promise.reject(error)
      })
  },
  getFoods (ingredient) {
    return this.call('GET', 'parser', [{ name: 'ingr', value: ingredient }])
  }
}
