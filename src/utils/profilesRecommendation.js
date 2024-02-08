import ProfileRepository from "../repositories/ProfileRepository.js"
import { Recommendation } from "./recommendation.js";
import { Sequelize } from 'sequelize';
const { Op } = Sequelize;

export const recommended_users_to_job  = async (userId, job) => {
    const content = job.description + ' ' + job.title  + ' ' + job.scholarity
    let profiles = await ProfileRepository.getAllProfiles(
        {
            searchable:true, 
            id: {
                [Op.not]: userId
            }
        }
    )
    profiles = profiles.rows
    // let userAlreadyApplied = await getUsersThatAlreadyApplid()
    let training_array = []
    // Building 
    profiles.forEach(element => {
        const actually_element = element.dataValues
        const id = (actually_element.id).toString()
        const profile_content = actually_element.scholarity + " " 
                        + actually_element.knowledge + " "
                        + actually_element.technologies + " "
                        + actually_element.languages
        training_array.push({"id": id, "content": profile_content})
    });
    const recommender = new Recommendation(training_array, content, 10)
    let result = recommender.get_recommendation()
    result = await get_recommended_profiles(result)
    return result
}

const get_recommended_profiles  = async (recommendation_list) => {
    let ids_list = []
    recommendation_list.forEach(element => {
        ids_list.push(element.id)
    }) 
    let profiles = await ProfileRepository.getAllProfiles(
        {
            id :{
                [Op.in]: ids_list
            }
        }
    )// [profile1, profile2, ...]
    profiles = profiles.rows
    let dict_profiles =  {}
    profiles.forEach(element => {
        (
            dict_profiles[element.dataValues.id] = element.dataValues
        )
    })
    let processed_recomendation_list = []
    return Promise.all(
                recommendation_list.map(async item => {
                    processed_recomendation_list.push({...dict_profiles[item.id], ...item})
                }
            )
        ).then(() => {
        return processed_recomendation_list
    });
}