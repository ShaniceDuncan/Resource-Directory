let createButton = document.getElementById('button');
let modalOverlay = document.getElementById('modal-overlay');
let closeModalIcon = document.getElementById('close-modal-icon');
let nameOfWebsite = document.getElementById('nameOfWebsite');
let resourceForm = document.getElementById('resource-form');
let linkOfWebsite = document.getElementById('linkOfWebsite');
let descriptionOfWebsite = document.getElementById('descriptionOfWebsite');
let resourcesSection = document.getElementById('resources-section');

function revealModalOverlay () {
    modalOverlay.classList.remove('modal__overlay');
    modalOverlay.classList.add('modal__overlay__visible');
    nameOfWebsite.focus();
}

createButton.addEventListener('click', revealModalOverlay);


function closeBackModalOverlay() {
    if(modalOverlay.classList.contains('modal__overlay__visible')) {
        modalOverlay.classList.remove('modal__overlay__visible');
        modalOverlay.classList.add('modal__overlay');
    }
}

closeModalIcon.addEventListener('click', closeBackModalOverlay);


/////////////////////// Data Structure of App ///////////////////////////

//// Psuedo Code ////

// collect data & basic validation --> store in variables,
// variables --> store variables inside an object literal
// object --> store object in an array (final format of the data)
// array --> take the array and send it to local storage
// local storage --> fetch data
// fetched data -->  bring out as variables and display on UI w/o having to reload


// This array is like a faucet data doesn't stay but runs in and out
let resources = [];

function printResourcesOnUI() {
    // Empties the resourcesSection container everytime the function is fired. Used often when rendering things consistently to a particular UI. We empty, recreate.
    resourcesSection.innerHTML = '';

    resources.forEach((storer) => {
        let printSiteName = storer.siteName;
        let printSiteLink = storer.siteLink;
        let printSiteDescription = storer.siteDescription;

        // use commented HTML code as a guide to recreate with JS

        let resourceDIV = document.createElement('div');
        resourceDIV.classList.add('resource');

        let nameOfWebsiteDIV = document.createElement('div');
        nameOfWebsiteDIV.classList.add('name__of__website');

        let nameOfWebsiteText = document.createElement('a');
        nameOfWebsiteText.setAttribute('href', `${printSiteLink}`);
        nameOfWebsiteText.setAttribute('target', '_blank');
        nameOfWebsiteText.textContent = printSiteName;

        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-sharp', 'fa-solid', 'fa-trash');
        // EventListeners can be set in HTML (outdated), so we do it dynamically in JS. The parameter should be the most unique identifier, ex: website's link
        deleteIcon.setAttribute('onclick', `deleteResource('${printSiteLink}')`);

        let descriptionOfWebsiteDIV = document.createElement('div');
        descriptionOfWebsiteDIV.classList.add('description__of__website');

        let descriptionText = document.createElement('p');
        descriptionText.textContent = printSiteDescription;

        // append the recreated elements to their appropriate parent containers
        descriptionOfWebsiteDIV.append(descriptionText);
        nameOfWebsiteDIV.append(nameOfWebsiteText, deleteIcon);
        resourceDIV.append(nameOfWebsiteDIV, descriptionOfWebsiteDIV);
        resourcesSection.append(resourceDIV);
    }) 
};


function deleteResource(printSiteLink) {
    resources.forEach((resourceStorer, i) => {
        if(resourceStorer.siteLink === printSiteLink) {
            resources.splice(i, 1)
        }
    })

    localStorage.setItem('resources', JSON.stringify(resources));
    fetchResources();
}


// validate - always fetch only if what we want exists
function fetchResources() {
    if(localStorage.getItem('resources')) {
        resources = JSON.parse(localStorage.getItem('resources'));
    }

    printResourcesOnUI();
};
// The moment the app loads the data will be fetched
fetchResources();



resourceForm.addEventListener('submit', handleForm);
function handleForm(event) {
    // prevents default of auto clearing data if there's no backend
    event.preventDefault()
    let websiteName = nameOfWebsite.value;
    let websiteURL = linkOfWebsite.value;
    let description = descriptionOfWebsite.value;

    if(nameOfWebsite.value === '') {
        nameOfWebsite.style.border = '1px solid red';
    };

    if(linkOfWebsite.value === '') {
        linkOfWebsite.style.border === '1px solid red';
    };

    if(descriptionOfWebsite.value === '') {
        descriptionOfWebsite.style.border === '1px solid red';
    };

    const aCreatedResource = {
        siteName : websiteName,
        siteLink : websiteURL,
        siteDescription : description
    };

    resources.push(aCreatedResource);
    localStorage.setItem('resources', JSON.stringify(resources));
    fetchResources();
    resourceForm.reset();
    closeBackModalOverlay();

}
