export const openInEditor = (baseUrl, file, line, column) => {
  // :${line}:${column}
  const _url = `${baseUrl}/__open-in-editor?file=${file}`
  console.log(_url);
  const promise = fetch(
    _url,
    {
      mode: 'no-cors',
    },
  )

  return promise
}