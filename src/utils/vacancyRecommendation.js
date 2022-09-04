import ContentBasedRecommender from 'content-based-recommender'
import { JobAttrs } from '../models/JobAttrs.js';
import JobRepository from "../repositories/JobRepository.js"
import User_JobRepository from '../repositories/User_JobRepository.js';
import { Sequelize } from 'sequelize'
const { Op } = Sequelize

export const recommended_vacancy = async (userId, profile) => {
    const technologies = profile.technologies.split(";");
    const scholarity = [profile.scholarity];
    const languages = profile.languages.split(";");
    const knowledges = profile.knowledge.split(";")
    let content = []
    content = content.concat(technologies)
    content = content.concat(scholarity)
    content = content.concat(languages)
    content = content.concat(knowledges)
    content = content.toString()
    const createdAndAppliedJobs = new Set()
    let createdJobsByUser = await User_JobRepository.getJobsByUserId(userId, true)
    createdJobsByUser = createdJobsByUser.rows
    let appliedJobsByUser = await User_JobRepository.getJobsByUserId(userId, false)
    appliedJobsByUser = appliedJobsByUser.rows
    // id's dos jobs aplicados
    appliedJobsByUser.forEach(element => {
        const job = element.dataValues
        const id = (job.jobId).toString()
        createdAndAppliedJobs.add(id)
    });
    // id's dos jobs criados
    createdJobsByUser.forEach(element => {
        const job = element.dataValues
        const id = (job.jobId).toString()
        createdAndAppliedJobs.add(id)
    });
    let lista = Array.from(createdAndAppliedJobs)
    let jobs = await JobRepository.getOnlyJobsToRecommend(lista)
    let training_array = []
    jobs.forEach(element => {
            const actually_element = element.dataValues
            const id = (actually_element.id).toString()
            training_array.push({"id": id, "content": actually_element.description + " " 
                                            + actually_element.scholarity + " "
                                            + actually_element.title})
    });

    training_array.push({
        "id":"objeto_de_treino",
        "content": content
    })
    const recommender = new ContentBasedRecommender({
        maxSimilarDocuments: 20
    });
    recommender.train(training_array);
    
    const bestJobs = recommender.getSimilarDocuments("objeto_de_treino");
    return bestJobs
}