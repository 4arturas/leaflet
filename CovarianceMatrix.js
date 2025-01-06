// Sample data (each row is a data point, each column is a feature)
const data = [
    [2.5, 2.4],
    [0.5, 0.7],
    [2.2, 2.9],
    [1.9, 2.2],
    [3.1, 3.0],
    [2.3, 2.7],
    [2, 1.6],
    [1, 1.1],
    [1.5, 1.6],
    [1.1, 0.9]
];

/*@startuml
!define RECT(name,text) rectangle name as (text,white)
RECT(Step1, "Calculate the mean of each feature")
@enduml
Function to calculate the mean of each feature*/
function calculateMean(data) {
    const numFeatures = data[0].length;
    const numPoints = data.length;
    const means = new Array(numFeatures).fill(0);

    for (let i = 0; i < numPoints; i++) {
        for (let j = 0; j < numFeatures; j++) {
            means[j] += data[i][j];
        }
    }

    for (let j = 0; j < numFeatures; j++) {
        means[j] /= numPoints;
    }

    return means;
}

/*@startuml
!define RECT(name,text) rectangle name as (text,white)
RECT(Step2, "Calculate the covariance matrix")
@enduml
Function to calculate the covariance matrix*/
function calculateCovarianceMatrix(data) {
    const numFeatures = data[0].length;
    const numPoints = data.length;
    const means = calculateMean(data);
    const covarianceMatrix = Array.from({ length: numFeatures }, () => new Array(numFeatures).fill(0));

    for (let i = 0; i < numPoints; i++) {
        for (let j = 0; j < numFeatures; j++) {
            for (let k = 0; k < numFeatures; k++) {
                // @startuml
                // !define RECT(name,text) rectangle name as (text,white)
                // RECT(Step2a, "Compute each element of the covariance matrix")
                // @enduml
                covarianceMatrix[j][k] += (data[i][j] - means[j]) * (data[i][k] - means[k]);
            }
        }
    }

    for (let j = 0; j < numFeatures; j++) {
        for (let k = 0; k < numFeatures; k++) {
            // @startuml
            // !define RECT(name,text) rectangle name as (text,white)
            // RECT(Step2b, "Normalize by the number of data points minus one")
            // @enduml
            covarianceMatrix[j][k] /= numPoints - 1;
        }
    }

    return covarianceMatrix;
}

// Calculate the covariance matrix
const covarianceMatrix = calculateCovarianceMatrix(data);
console.log("Covariance Matrix:");
console.log(covarianceMatrix);
