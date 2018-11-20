const path = require('path')
const fs = require('fs')

module.exports = class LocalStorage {
  constructor(config) {
    this.config = config
    this.directory = config.fileStorage.directory
  }

  /**
   * Create a writeable stream to which we can write file data.
   *
   * @param {string} filename - The filename of the asset that needs to be written.
   * @return {object} - The writeable stream to store the data.
   */
  createWriteStream(filename) {
    return fs.createWriteStream(path.join(this.directory, filename), { encoding: 'binary' })
  }

  /**
   * Create a readable stream to which we can write file data.
   *
   * @param {string} filename - The filename of the asset that needs to be written.
   * @return {object} - The writeable stream to store the data.
   */
  createReadStream(filename) {
    return fs.createReadStream(path.join(this.directory, filename), { encoding: 'binary' })
  }

  /**
   * Delete a file.
   *
   * @param {string} filename - The filename of the asset that needs to be written.
   * @return {object} - The writeable stream to store the data.
   */
  deleteFile(filename, done) {
    fs.unlink(path.join(this.directory, filename), err => done(err))
  }
}
