import coinbaseApi from './services/coinbaseApi'
import generateProduct from './templates/products'
import PRODUCTS from './constants/products'

function addProduct(product, res) {
  const productTemplate = generateProduct(product, res)
  document.getElementById('products').insertAdjacentHTML('beforeend', productTemplate)
}

function main() {
  const products = Object.keys(PRODUCTS).map(productName => ({
    ...PRODUCTS[productName],
    apiCalls: PRODUCTS[productName].currencyPairs.map(currencyPair =>
      coinbaseApi.getSpotPrice(currencyPair)
    ),
  }))

  products.forEach((product) => {
    Promise.all(product.apiCalls).then((res) => {
      addProduct(product, res)
    })
  })
}

window.onload = main
