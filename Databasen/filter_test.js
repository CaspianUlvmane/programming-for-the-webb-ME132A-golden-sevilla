let fieldArray = [1, 5]
let languageArray = [1, 3]
let filterResults = []
// dataset
let o = {name: "whatever"}
console.log(o.name)
console.log(o["name"])
let k = "name"
console.log(o[k])

function filter (){
    // queryselector all of class filterButton .active if toggled on
    // let result = DB.PROGRAMMES
    // loop array of .active
    //      let data = JSON.parse(elemetHTML.dataset)
    //      let key = data.key
    //      let value = data.value
    //      result = result.filter(program => program[key] == value)
    let result = DB.PROGRAMMES.filter((programmes) => fieldArray.includes(programmes.subjectID))
    let filterResult = result.filter((program)=> languageArray.includes(program.language))
    console.log(result)
    console.log(filterResult)
}

//DB.PROGRAMMES.map(country/city)
//merge