import { read, write } from '#model'
import { InternalServerError } from '#errors'

const GET = (req, res, next) => {
  try {
    let subCategories = read("subcategories")
    let products = read("products")

    let { categoryId, subCategoryId, model, color } = req.query
    let { product_id } = req.params

    if(!categoryId && !subCategoryId && !model && !color && !product_id){
      products = []
    }

    let categoredProducts = []
    if(categoryId){
      subCategories.map((category) => {
        products.map(product => {
          if(category.category_id == categoryId){
            if(category.sub_category_id == product.sub_category_id){
              return categoredProducts.push(product)
            }
          }
        })
        return categoredProducts
      })
      products = categoredProducts
    }

    products = products.filter(product => {
      let bySubCategoryId = subCategoryId ? product.sub_category_id == subCategoryId : true

      let byModel = model ? product.model.toLowerCase().includes(model.toLowerCase()) : true

      let byColor = color ? product.color.toLowerCase().includes(color.toLowerCase()) : true

      return  bySubCategoryId && byModel && byColor
    })

    if(product_id){
      products = products.find(product => product.product_id == product_id)
    }


    return res.status(200).json({
      statusCode: 200,
      message: 'ok',
      data: products
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}


const POST = (req, res, next) => {
  try {
    let products = read("products")

    let { sub_category_id, model, product_name, color, price } = req.body

    let newProduct = {
      product_id: products.length ? products.at(-1)?.product_id + 1 : 1,
      sub_category_id, model, product_name, color, price
    }

    products.push(newProduct)
    write("products", products)

    return res.status(202).json({
      statusCode: 202,
      message: 'new product created',
      data: newProduct
    })

  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}

const PUT = (req, res, next) => {
  try {
    let products = read("products")
    let { sub_category_id, model, product_name, color, price } = req.body
    let { product_id } = req.params

    let product = products.find(product => product.product_id == product_id)

    if(!product) {
      return res.status(400).json({ status: 404, message: 'Product not found' })
    }
    product.sub_category_id = sub_category_id ? sub_category_id : product.sub_category_id
    product.model = model ? model : product.model
    product.product_name = product_name ? product_name : product.product_name
    product.color = color ? color : product.color
    product.price = price ? price : product.price
    write("products", products)
    return res.status(202).json({
      statusCode: 202,
      message: 'product updated',
      data: product
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}

const DELETE = (req, res, next) => {
  try {
    let products = read("products")
    let { product_id } = req.params

    let productIndex = products.findIndex(product => product.product_id == product_id)

    if(productIndex == -1) {
      return res.status(400).json({ status: 404, message: 'Product not found' })
    }
    let deletedProduct = products[productIndex]
    products.splice(productIndex, 1)

    write("products", products)
    return res.status(202).json({
      statusCode: 202,
      message: 'product deleted',
      data: deletedProduct
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}


export default {
  GET,
  POST,
  PUT,
  DELETE
}