const initState = {
  isSidebarOpen: false,
  language: localStorage.getItem('lang') || 'en',
  moruroaFilesNavigationItems: [
    {
      id: 'Poisoned-legacy',
      textEN: 'Poisoned legacy',
      textFR: 'Un héritage empoisonné',
      src: '[Nuclear Reconstruction Intro].md',
    },
    {
      id: 'ALDEBARAN',
      textEN: 'Cancer cluster in the Gambier Islands',
      textFR: 'Cluster de cancers aux îles Gambier',
      src: '[ALD-1 Introduction].md',
    },
    {
      id: 'ENCELADE',
      textEN: 'Forgotten victims of Encelade Test',
      textFR: 'Les oubliés de l’essai Encelade',
      src: '[ENC-1 Introduction].md',
    },
    {
      id: 'CENTAURE',
      textEN: "Tahiti's hidden contamination",
      textFR: 'La contamination cachée de Tahiti',
      src: '[CEN-1 Introduction].md',
    },
  ],
  moruroaFileAllStories: [],
  moruroaFileCurrentStories: [],
}

// Types
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE'
const UPDATE_MORUROA_FILE_ALL_STORIES = 'UPDATE_MORUROA_FILE_ALL_STORIES'
const UPDATE_MORUROA_FILE_CURRENT_STORIES =
  'UPDATE_MORUROA_FILE_CURRENT_STORIES'

// Actions
export const toggleSidebar = (status) => {
  return { type: TOGGLE_SIDEBAR, status }
}

export const changeLanguage = (lang) => {
  // change in local storage
  localStorage.setItem('lang', lang)
  return { type: UPDATE_LANGUAGE, lang }
}

export const updateMoruroaFileCurrentStories = (stories) => {
  return { type: UPDATE_MORUROA_FILE_CURRENT_STORIES, stories }
}

export const updateMoruroaFileAllStories = (stories) => {
  return { type: UPDATE_MORUROA_FILE_ALL_STORIES, stories }
}

// Reducers
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpen: action.status }
    case UPDATE_LANGUAGE:
      return { ...state, language: action.lang }
    case UPDATE_MORUROA_FILE_CURRENT_STORIES:
      return { ...state, moruroaFileCurrentStories: action.stories }
    case UPDATE_MORUROA_FILE_ALL_STORIES:
      return { ...state, moruroaFileAllStories: action.stories }

    default:
      return state
  }
}

export default rootReducer
