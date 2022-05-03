let fieldArray = [1, 5]
let languageArray = [1, 3]

function filter (){
    let result = DB.PROGRAMMES.filter((programmes) => fieldArray.includes(programmes.subjectID))
    let filterResult = result.filter((program)=> languageArray.includes(program.language))
    console.log(result)
    console.log(filterResult)
}