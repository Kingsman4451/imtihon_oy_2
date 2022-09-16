import { read, write } from '#model'
import { InternalServerError } from '#errors'

const GET = (req, res, next) => {
  try {
    let subCategories = read("subcategories")
    let products = read("products")

    let { sub_category_id } = req.params
    if(sub_category_id) {
      let category = subCategories.find(category => category.sub_category_id == sub_category_id)
      category.products = products.filter(product => {
        return product.sub_category_id == category.sub_category_id
      })
      category.products.map(product => {return delete product.sub_category_id})
      res.status(200).send({
        statusCode: 200,
        message: "ok",
        data: category
      })
    }
    subCategories.map(category => {
      category.products = products.filter(product => {
        return product.sub_category_id == category.sub_category_id
      })
      category.products.map(product => {return delete product.sub_category_id})
      return category
    })

    

    res.status(200).send({
      statusCode: 200,
      message: "ok",
      data: subCategories
    })
    
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}


const POST = (req, res, next) => {
  try {
    let subCategories = read("subcategories")
    let { sub_category_name, category_id } = req.body
    let newCategory = {
      sub_category_id: subCategories.length ? subCategories.at(-1)?.sub_category_id + 1 : 1,
      category_id,
      sub_category_name
    }
    subCategories.push(newCategory)
    write("subcategories", subCategories)

    res.status(202).send({
      statusCode: 202,
      message: "created new sub-category",
      data: newCategory
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}

const PUT = (req, res, next) => {
  try {
    let subCategories = read("subcategories")
    let { sub_category_name, category_id } = req.body
    let { sub_category_id } = req.params

    let category = subCategories.find(category=>category.sub_category_id == sub_category_id)

    if(!category) {
      return res.status(400).json({ status: 404, message: 'Sub-category not found' })
    }

    category.sub_category_name = sub_category_name
    category.category_id = category_id
    write("subcategories", subCategories)

    res.status(202).send({
      statusCode: 202,
      message: "Sub-category updated",
      data: category
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}

const DELETE = (req, res, next) => {
  try {
    let subCategories = read("subcategories")
    let products = read("products")
    let { sub_category_id } = req.params

    let categoryIndex = subCategories.findIndex(category=>category.sub_category_id == sub_category_id)

    if(categoryIndex == -1) {
      return res.status(400).json({ status: 404, message: 'Sub-category not found' })
    }

    let deletedCaetgory = subCategories[categoryIndex]
    deletedCaetgory.products = products.filter(product => deletedCaetgory.sub_category_id == product.sub_category_id)

    subCategories.splice(categoryIndex, 1)
    products = products.filter(product => product.sub_category_id != deletedCaetgory.sub_category_id)
    deletedCaetgory.products.map(product => {return delete product.sub_category_id})

    write("subcategories", subCategories)
    write("products", products)
    
    res.status(202).send({
      statusCode: 202,
      message: "Sub-category deleted",
      data: deletedCaetgory
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