import axios from "axios";
import ResaleVehicleCategoryNew from "../models/ResaleVehicleCategoryNew.js";
import ResaleVehicleCompanyNew from "../models/ResaleVehicleCompanyNew.js";
import ResaleVehicleModelNew from "../models/ResaleVehicleModelNew.js";
import ResaleVehicleTrimNew from "../models/ResaleVehicleTrimNew.js";
import ResaleYearsNew from "../models/ResaleYearsNew.js";

export const scrappingResaleValue = async(req,res) => {
   try {
    console.log("fdsbfb")
    let fetchCategoryData = await axios.get('https://orangebookvalue.com/get-data/home')
    const categoriesArray = Object.entries(fetchCategoryData?.data?.data?.categories).map(([id, name]) => ({ id, name }));
    for (const categories of categoriesArray) {
        if (categories != 'All Products' && categories != 'Top Products') {
            let createCategory
            const findCetegoryExitOrNot = await ResaleVehicleCategoryNew.findOne({
                where: {
                    category_name : categories?.name
                }
            })  
            if(findCetegoryExitOrNot){
                createCategory = findCetegoryExitOrNot
            }else{
                createCategory = await ResaleVehicleCategoryNew.create({
                   category_name: categories.name
               })
            }
            const fetchVehicleBrands = await axios.get(`https://orangebookvalue.com/mmyt?&category_id=${categories?.id?.trim()}&api_version=3`)
            if (fetchVehicleBrands.data.data) {
                for (const brands of fetchVehicleBrands.data.data) {
                    if (brands?.name != 'All Products' && brands?.name != 'Top Products') {
                        let createCompany
                        const findIsExitOrNot = await ResaleVehicleCompanyNew.findOne({
                            where: {
                                resale_vehicle_category_id: createCategory?.dataValues?.id,
                                name : brands?.name
                            }
                        }) 
                        if(findIsExitOrNot){
                            createCompany = findIsExitOrNot
                        }else{
                             createCompany = await ResaleVehicleCompanyNew.create({
                                resale_vehicle_category_id: createCategory?.dataValues?.id,
                                name: brands?.name
                            })
                        }
                        const fetchvehicleModelData = await axios.get(`https://orangebookvalue.com/mmyt?&category_id=${categories?.id?.trim()}&make=${brands?.name?.trim()?.replace(" ", "%20")}&api_version=3`)
                        if (fetchvehicleModelData.data.data) {
                            for (const model of fetchvehicleModelData.data.data) {
                                let createModel
                                const findModelExitOrNot = await ResaleVehicleModelNew.findOne({
                                    where: {
                                       name : model,
                                        resale_vehicle_company_id: createCompany.dataValues.id,
                                    }
                                }) 
                                if(findModelExitOrNot){
                                    createModel = findModelExitOrNot
                                }else{
                                    createModel = await ResaleVehicleModelNew.create({
                                       name: model,
                                       resale_vehicle_company_id: createCompany.dataValues.id,
                                       is_cron: 0
                                   })
                                }
                                const fetchVehicleYear = await axios.get(`https://orangebookvalue.com/mmyt?&category_id=${categories?.id?.trim()}&make=${brands?.name?.trim()?.replace(" ", "%20")}&model=${model?.trim()?.replace(" ", "%20")}&api_version=3`)
                                if (fetchVehicleYear?.data?.data) {
                                    console.log('fetchVehicleYear?.data?.data', fetchVehicleYear?.data?.data)
                                    for (const year of fetchVehicleYear.data.data) {
                                        let createVehicleyear
                                        let findVehicleYear = await ResaleYearsNew.findOne({
                                            where:{
                                                name: year,
                                                category_id: createCategory?.dataValues?.id,
                                                resale_vehicle_model_id: createModel.dataValues.id
                                            }
                                        })  
                                        if(findVehicleYear){
                                            createVehicleyear = findVehicleYear 
                                        }else{
                                            createVehicleyear = await ResaleYearsNew.create({
                                               name: year,
                                               category_id: createCategory?.dataValues?.id,
                                               resale_vehicle_model_id: createModel.dataValues.id
                                           })
                                        }
                                        const fetchVehicleTrims = await axios.get(`https://orangebookvalue.com/mmyt?&category_id=${categories?.id?.trim()}&make=${brands?.name?.trim()?.replace(" ", "%20")}&model=${model?.trim()?.replace(" ", "%20")}&year=${year?.trim()?.replace(" ", "%20")}&check_obv=1&api_version=3`)
                                        console.log('fetchVehicleTrims?.data?.data===>>', fetchVehicleTrims?.data?.data)
                                        if (fetchVehicleTrims?.data?.data) {
                                            for (const trims of fetchVehicleTrims?.data?.data?.result) {
                                                let createVehicleTrims
                                                const findTrimExitOrNot = await ResaleVehicleTrimNew.findOne({
                                                    where:{
                                                        name: trims,
                                                        resale_year_id: createVehicleyear?.dataValues?.id,
                                                        resale_vehicle_model_id: createModel.dataValues.id,    
                                                    }
                                                })
                                                if(findTrimExitOrNot){
                                                    createVehicleTrims = findTrimExitOrNot 
                                                }else{
                                                     createVehicleTrims = await ResaleVehicleTrimNew.create({
                                                        name: trims,
                                                        resale_year_id: createVehicleyear?.dataValues?.id,
                                                        resale_vehicle_model_id: createModel.dataValues.id,
                                                        is_cron: 0
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            }

        }
    }
   } catch (error) {
    console.log(error)
   }
}
     
