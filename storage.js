const fs = require('fs');
const path = require('path');

class Storage {
  constructor(path) {
    this.path = `data/${path}.json`;
  }

  get(key) {
    const data = fs.readFileSync(path.resolve(__dirname, this.path), 'UTF-8');
    const parsedData = JSON.parse(data);

    return parsedData[key];
  }

  create(key, value) {
    let data = fs.readFileSync(path.resolve(__dirname, this.path), 'UTF-8');
    let parsedData = JSON.parse(data)

    parsedData[key] = value;

    fs.writeFileSync(path.resolve(__dirname, this.path), JSON.stringify(parsedData), 'UTF-8')
  }

  update(key, value) {
    let data = fs.readFileSync(path.resolve(__dirname, this.path), 'UTF-8');
    let parsedData = JSON.parse(data)

    parsedData[key] = { ...parsedData[key], ...value };

    fs.writeFileSync(path.resolve(__dirname, this.path), JSON.stringify(parsedData), 'UTF-8')
  }

  delete(key) {
    let data = fs.readFileSync(path.resolve(__dirname, this.path), 'UTF-8');
    let parsedData = JSON.parse(data)

    delete parsedData[key];

    fs.writeFileSync(path.resolve(__dirname, this.path), JSON.stringify(parsedData), 'UTF-8')
  }
}

module.exports = {
  Storage
};
