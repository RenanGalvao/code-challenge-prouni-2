export function friendlyDateString(date: Date | string, hours = false, locales = 'pt-BR') {
  if (!(date instanceof Date) && date !== '') {
    date = new Date(date)
  } else {
    return ''
  }

  if (hours) {
    return date.toLocaleDateString(locales, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  } else {
    return date.toLocaleDateString(locales, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}
