const torch= require('torch-js')

function getResult(text){
    var cleanData= clearData(text)
    const tokenModel= torch.load('../ml/cvMailTokeniser.pkl')
    const token= tokenModel.forword(cleanData)
    console.log(token)
}

function clearData(text){
    var textLowerCase= text.toLowerCase()
    var textWithoutSubject= textLowerCase.replace(/subject: /g, "")
    var textWithoutReply= textWithoutSubject.replace(/re : /g, "")
    var textWithoutPunctuation = textWithoutReply.replace(/[^\w\s]|_/g, "")
    var cleanedText= textWithoutPunctuation.replace(/\s{2,}/g, " ")
    return cleanedText
}


module.exports= getResult