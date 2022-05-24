// refresh result
let clearResults = element => (selectElement(element).innerHTML = '')

// creating the popUp div container
let programPopUpContainer = createElement('div')
programPopUpContainer.classList.add('containerPopUp')
document.body.append(programPopUpContainer)

// overlay bg for pop
let overLayDiv = createElement('div')
overLayDiv.classList.add('overLay')
document.body.append(overLayDiv)

// function called when pressing button to get more info
function popUpProgram (program) {
  // get clicked program object
  let programFound = program

  let programPopUpContainer = selectElement('.containerPopUp')
  programPopUpContainer.classList.add('active')
  selectElement('.overLay').classList.add('active')
  clearResults('.containerPopUp')

  document.body.append(programPopUpContainer)
  programPopUpContainer.append(interactWithPop(programFound))
  programPopUpContainer.append(addInfoProgram(programFound))

  return programPopUpContainer
}

// Function to create the close and heart bar of the popUp
function interactWithPop (program) {
  // takes url path, and stores what html file you're on
  let path = window.location.pathname
  let page = path.split('/').pop()

  let barContainer = createElement('div')
  barContainer.classList.add('barContainer')

  // creating closeIcon For popUp with listner to close
  let crossIconDiv = createElement('div')
  crossIconDiv.classList.add('imgCross')
  crossIconDiv.innerHTML = `<i class="fa-solid fa-xmark"></i>`
  // close popUp listener
  crossIconDiv.addEventListener('click', function () {
    selectElement('.overLay').classList.remove('active')
    selectElement('.containerPopUp').classList.remove('active')
    clearResults('.containerPopUp')

    buildTopMenu()
    document.querySelector('main').style.opacity = '1'

    // only run when on filter page
    if (page == 'filter.html') {
      renderPrograms()
    }

    likedPrograms()
    searchBar()
    closeSearchInSearch()
    selectElement('#searchInputBar').addEventListener(
      'keyup',
      searchingInSearch
    )
  })

  barContainer.append(crossIconDiv, headTitle(program), heartPopUp(program))
  return barContainer
}

// Title Course popUp
function headTitle (program) {
  let div = document.createElement('div')
  div.innerHTML = `<h3>${program.name}</h3>`

  return div
}

// like function for pop up
function heartPopUp (program) {
  // stores liked items in variable
  // concats array with stored items
  let storedLikedArray = JSON.parse(localStorage.getItem('likedArray'))
  if (storedLikedArray != null) {
    array = []
    array = array.concat(storedLikedArray)
  }
  let heartIconDiv = createElement('div')
  heartIconDiv.classList.add('imgHearth')

  heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`

  // looks for liked items and renders correct color heart
  // based on id in the stored array
  for (let likedArray of array) {
    if (likedArray.id == program.id) {
      heartIconDiv.classList.add('active')
      heartIconDiv.innerHTML = `<i class="fa-solid fa-heart"> </i>`
    }
  }

  // listener to save and remove course
  heartIconDiv.addEventListener('click', function () {
    if (heartIconDiv.classList.contains('active')) {
      heartIconDiv.classList.remove('active')
      heartIconDiv.innerHTML = `<i class="fa-regular fa-heart"></i>`
      let indexOfLikedArray = array.findIndex(
        element => program.id == element.id
      )
      array.splice(indexOfLikedArray, 1)
      // when an item is removed from the array store the other liked items
      // in local storage
      localStorage.setItem('likedArray', JSON.stringify(array))
    } else {
      heartIconDiv.classList.add(`active`)
      heartIconDiv.innerHTML = `<i class="fa-solid fa-heart"> </i>`
      array.push(program)
      // when an item is added to the array store the liked items
      // in local storage
      localStorage.setItem('likedArray', JSON.stringify(array))
    }
  })

  return heartIconDiv
}

// function to add inforomation about the program that is clicked
function addInfoProgram (program) {
  // creating the informationDivBox for the information of the program that is clicked
  let infoContainer = createElement('div')
  infoContainer.classList.add('infoContainer')
  // <h3 class="infoBoxHeader">${program.name}</h3> moved this to create title to have in header of popup
  infoContainer.innerHTML = `
    <div class="programInfoBox">
        <div class="info"> Land: ${getCountry(program)} </div>
        <div class="info"> Stad: ${getCity(program)} </div>
        <div class="info university"> Universitet: ${getUniversity(
          program
        )} </div>
        <div class="info"> Ämne: ${getFiled(program)} </div>
        <div class="info"> Nivå: ${getLevel(program)} </div>
        <div class="info"> Språk: ${findLangauge(program)} </div>
        <div class="info average"> Medelvärde av Kursen: ${getAllAverage(
          program
        )}/5 </div>
        <div class="info"> Teacher rating: ${getAverageTeachers(
          program
        )}/5 </div>
        <div class="info"> Students rating: ${getAverageStudents(
          program
        )}/5 </div>
        <div class="info"> Courses rating: ${getAverageCourses(
          program
        )}/5 </div>
        <div class="info commentsOfstudents"> Kommentarer från studenter </div>
    </div> `

  infoContainer.append(commentsProgram(program))
  return infoContainer
}

// function to get comments about the program that is clicked
function commentsProgram (id) {
  let commentContainer = createElement('div')
  commentContainer.classList.add('commentContainer')

  // find the id off the program id thats is match with id when called
  let programID = DB.PROGRAMMES.find(program => program.id == id.id)
  // filter the programs after comments id that is matched with the programId
  let comments = DB.COMMENTS_PROGRAMME.filter(
    comment => comment.programmeID == programID.id
  )

  // looping fro the comments and creating the information for eatch comment that is found
  for (let comment of comments) {
    let commentBox = createElement('div')
    commentBox.innerHTML = ` 
        ${starRatingStudent(comment)}
        <div class="commentText"> ${comment.text} </div>
        <div class="commentName"> ${comment.alias} </div> `
    commentContainer.append(commentBox)
  }
  return commentContainer
}

// find the country iD that is equal to the citys.country id
function findCountry (id) {
  return DB.COUNTRIES.find(country => country.id == findCity(id).countryID)
}
// get the name out of the country
function getCountry (id) {
  return findCountry(id).name
}

// find the city iD that is equal to the findUniversity.city id
function findCity (id) {
  return DB.CITIES.find(city => city.id == findUniversity(id).cityID)
}
// get the name out of the city
function getCity (id) {
  return findCity(id).name
}

// find the universitie iD that is equal to the program.university id
function findUniversity (id) {
  return DB.UNIVERSITIES.find(universitie => universitie.id == id.universityID)
}
// get the name out of the university
function getUniversity (id) {
  return findUniversity(id).name
}

// find the filed that is equal to the program.subject id
function findFiled (id) {
  return DB.FIELDS.find(filed => filed.id == id.subjectID)
}
// get the name of the filed
function getFiled (id) {
  return findFiled(id).name
}

/// !!! Working how to write in cleaner way ???
function getLevel (id) {
  return DB.LEVELS[id]
}

// find the langauge that is equal to the program language
function findLangauge (id) {
  return DB.LANGUAGES.find(language => language.id == id.language).name
}

// function to make new filter of the rating of the program
function getAverage (id) {
  return DB.COMMENTS_PROGRAMME.filter(
    program => program.programmeID == id.id
  ).map(rating => rating.stars)
}

// function to get the average scoure of the teacher
function getAverageTeachers (id) {
  let sumOfAverage = 0
  let ratingStudents = getAverage(id)

  ratingStudents.forEach(rating => {
    sumOfAverage += rating.teachers
  })

  return Math.round(sumOfAverage / ratingStudents.length)
}

// function to get the average scoure of the students students
function getAverageStudents (id) {
  let sumOfAverage = 0
  let ratingStudents = getAverage(id)

  ratingStudents.forEach(rating => {
    sumOfAverage += rating.students
  })

  return Math.round(sumOfAverage / ratingStudents.length)
}

// function to get the average scoure of the students courses
function getAverageCourses (id) {
  let sumOfAverage = 0
  let ratingStudents = getAverage(id)

  ratingStudents.forEach(rating => {
    sumOfAverage += rating.courses
  })

  return Math.round(sumOfAverage / ratingStudents.length)
}

// functoion to get the average in total of the program
function getAllAverage (id) {
  let sum = Math.round(
    getAverageTeachers(id) + getAverageStudents(id) + getAverageCourses(id)
  )
  return Math.round(sum / 3)
}

// function to get the average scoure given from the student
function studentRatingProgram (comments) {
  let sumOfRating = 0
  sumOfRating +=
    comments.stars.teachers + comments.stars.students + comments.stars.courses
  return Math.round(sumOfRating / 3)
}

function starRatingStudent (comments) {
  if (studentRatingProgram(comments) == 5) {
    return `            
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>`
  } else if (studentRatingProgram(comments) == 4) {
    return `            
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        `
  } else if (studentRatingProgram(comments) == 3) {
    return `            
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        `
  } else if (studentRatingProgram(comments) == 2) {
    return `            
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        `
  } else if (studentRatingProgram(comments) == 1) {
    return `            
        <i class="fa-solid fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        `
  } else {
    return `
        <i class="fa-regular fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>  
        <i class="fa-regular fa-star starStudent"></i>
        <i class="fa-regular fa-star starStudent"></i>
        `
  }
}
