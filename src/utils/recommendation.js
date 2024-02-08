import ContentBasedRecommender from 'content-based-recommender'

export class Recommendation{
    constructor (training_array, content, maxSimilarDocuments=20){
        this.training_array = training_array
        this.content = content
        this.maxSimilarDocuments = maxSimilarDocuments
    }

    get_recommendation() {
        this.training_array.push({
            "id":"objeto_de_treino",
            "content": this.content
        })
        const recommender = new ContentBasedRecommender({
            maxSimilarDocuments: this.maxSimilarDocuments
        });
        recommender.train(this.training_array);
        
        const result = recommender.getSimilarDocuments("objeto_de_treino");

        return result
    }
}