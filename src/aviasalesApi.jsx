export default class aviasalesApi {
  static async getSearchId() {
    const response = await fetch('https://front-test.dev.aviasales.ru/search')
    if (!response.ok) throw new Error('cant get searchId')
    const body = await response.json()
    return body.searchId
  }

  static async getTickets(searchId) {
    function timer(time) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
      })
    }

    await timer(3000)
    const response = await fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`)
    if (!response.ok) throw new Error('cant get tickets')
    const body = await response.json()
    return body
  }
}
