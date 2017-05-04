export const runCode = (code) => {
  return {
    type: 'RUN',
    payload: {code}
  }
}
