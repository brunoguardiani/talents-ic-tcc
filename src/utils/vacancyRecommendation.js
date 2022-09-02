import ContentBasedRecommender from 'content-based-recommender'
import JobRepository from "../repositories/JobRepository.js"


export const recommended_vacancy = async (profile) => {
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
    let jobs = await JobRepository.getAllJobs();
    jobs = jobs.rows 
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
        maxSimilarDocuments: 3
    });

    recommender.train(training_array);
    
    const bestJobs = recommender.getSimilarDocuments("objeto_de_treino");
    return bestJobs
}