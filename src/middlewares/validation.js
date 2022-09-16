import { loginSchema, validationCategories, validationCategoriesDelete, validationCategoriesPut, validationSubCategories, validationSubCategoriesPut, validationSubCategoriesDelete, validationProducts, validationProductsPut, validationProductsDelete } from "../utilts/validation.js"
import { ValidationError } from "../utilts/errors.js"


export default (req, res, next) =>{
  try {
    if(req.method == 'POST' && req.url == '/login'){
      let {error} = loginSchema.validate(req.body)
      if(error) throw error
    }


    if(req.method == 'POST' && req.url == '/admin/categories'){
      let {error} = validationCategories.validate({category_name: req.body.category_name})
      if(error) throw error
    }

    if(req.method == 'PUT' && req.url == `/admin/categories/${req.params.category_id}`){
      let {error} = validationCategoriesPut.validate({body: req.body, params: req.params})
      if(error) throw error
    }

    if(req.method == 'DELETE' && req.url == `/admin/categories/${req.params.category_id}`){
      let {error} = validationCategoriesDelete.validate({params: req.params})
      if(error) throw error
    }



    if(req.method == 'POST' && req.url == '/admin/subcategories'){
      let {error} = validationSubCategories.validate({sub_category_name: req.body.sub_category_name})
      if(error) throw error
    }

    if(req.method == 'PUT' && req.url == `/admin/subcategories/${req.params.sub_category_id}`){
      let {error} = validationSubCategoriesPut.validate({body: req.body, params: req.params})
      if(error) throw error
    }

    if(req.method == 'DELETE' && req.url == `/admin/subcategories/${req.params.sub_category_id}`){
      let {error} = validationSubCategoriesDelete.validate({params: req.params})
      if(error) throw error
    }




    if(req.method == 'POST' && req.url == '/admin/products'){
      let {error} = validationProducts.validate({...req.body})
      if(error) throw error
    }

    if(req.method == 'PUT' && req.url == `/admin/products/${req.params.product_id}`){
      let {error} = validationProductsPut.validate({body: req.body, params: req.params})
      if(error) throw error
    }

    if(req.method == 'DELETE' && req.url == `/admin/products/${req.params.product_id}`){
      let {error} = validationProductsDelete.validate({params: req.params})
      if(error) throw error
    }

    // if(req.method == 'POST' && req.url == '/admin/videos'){
    //   let {error} = validationVideo.validate({title: req.body.title, video: req.files.video.name})
    //   if(error) throw error
    // }



    // if(req.method == 'PUT' && req.url == `/admin/videos/${req.params.videoId}`){
    //   let {error} = validationVideoPut.validate({body: req.body, params: req.params})
    //   if(error) throw error
    // }


    return next()
  } catch (error) {
    return next(new ValidationError(401, error.message))
  }
}