 export default function nearestNeighbors(full_embeddings, word, neighbors=11) {
     /*  
        full_embeddings is a diction containing word: embedding pairs
        word is simply a word in the dictionary
    */

    return new Promise((resolve, reject) => {
        if (!(word in full_embeddings)) {
            reject(new Error("The word does not exists"));
        } else {
            //Get the word embbeding
            const word_embedding = full_embeddings[word];
    
            //Calculate the distance between the embedding to all other embedding
            const distances = Object.keys(full_embeddings).map(a_word => {
                return [a_word, euclidean_distance(word_embedding, full_embeddings[a_word])];
            });
    
            //Sort the distances array in descending order
            distances.sort((first, second) => {
                return first[1] - second[1];
            });
    
            //Get the first 10 neighbors
            resolve(distances.slice(1, neighbors));
        }
    });
}

function euclidean_distance(x1, x2) {
    let sum = 0;

    for (let i = 0; i !== x1.length; ++i) {
        sum += Math.pow(x1[i] - x2[i], 2);
    }

    return Math.sqrt(sum);
}

function cosin_distance(x1, x2) {
    /*
        TO BE IMPLEMENTED
    */
}