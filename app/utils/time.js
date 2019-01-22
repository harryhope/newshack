const format = (string, interval) =>
  interval === 1 ? ` ${string}` : ` ${string}s`

module.exports.timeSince = date => {
  const seconds = Math.floor((new Date() - date) / 1000)
  let interval = Math.floor(seconds / 31536000)

  if (interval >= 1) {
    return interval + format('year', interval)
  }
  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval + format('month', interval)
  }
  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval + format('day', interval)
  }
  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval + format('hour', interval)
  }
  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval + format('minute', interval)
  }
  return Math.floor(seconds) + format('second', interval)
}
