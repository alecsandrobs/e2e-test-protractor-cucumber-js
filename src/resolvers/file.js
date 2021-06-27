import path from 'path'

export default filePath => {
  filePath = path.resolve(__dirname, '..', 'files', filePath)
  return require(filePath)
}
