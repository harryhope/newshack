import superagent from 'superagent'

const hackernews = 'https://hacker-news.firebaseio.com/v0'

export const getFeed = page =>
  superagent.get(`${hackernews}/${page}stories.json`)

export const paginate = (feed, number) =>
  feed.slice(
    number * 20,
    (number * 20) + 20
  )

export const hydrate = segments => {
  const promises = segments.map(id =>
    superagent.get(`${hackernews}/item/${id}.json`)
  )

  return Promise.all(promises).then(resps => resps.map(resp => resp.body))
}
