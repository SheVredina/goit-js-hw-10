import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');



// Function to create and append an option to the breed select element
function createBreedOption(breed) {
       error.style.display = 'none';

  const option = document.createElement('option');
  option.value = breed.id;
  option.textContent = breed.name;
  breedSelect.appendChild(option);

}

// Function to display cat information
function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" width= "300" />
    <h3>${cat.breeds[0].name}</h3>
    <p> ${cat.breeds[0].description}</p>
    <p> ${cat.breeds[0].temperament}</p> `;
  catInfo.style.display = 'block';
}

// Event listener for breed select change
breedSelect.addEventListener('change', () => {
  
  const selectedBreedId = breedSelect.value;


  if (selectedBreedId) {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    error.style.display = 'none';

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        displayCatInfo(cat);
        loader.style.display = 'none';
      })
      .catch(() => {
        Notiflix.Notify.info(
          `❌Такого котика не найдено, поищите другого...`
        );
        // error.style.display = 'block';
        loader.style.display = 'none';
      });
  } else {
    catInfo.style.display = 'none';
  }
});

// Initial loading of breeds
// loader.style.display = 'block';

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => createBreedOption(breed));
    // breedSelect.style.display = 'block';
    loader.style.display = 'none';
  })
  .catch(() => {
    Notiflix.Notify.warning(
      `Oops! Something went wrong! Try reloading the page!`
    );
    // error.style.display = 'block';
    loader.style.display = 'none';
  });
