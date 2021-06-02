import { useEffect, useState } from 'react'
import classes from './StoryJump.js.module.scss'
import { scroller, animateScroll as scroll } from 'react-scroll'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { updateMoruroaFileCurrentStories } from '../../store'
import { useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'

const StoryJump = () => {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.language)
  const navigationItems = useSelector(
    (state) => state.moruroaFilesNavigationItems,
  )
  const allStories = useSelector((state) => state.moruroaFileAllStories)
  const history = useHistory()

  const [jump, setJump] = useState({
    current: null,
    prev: null,
    next: null,
  })
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.addEventListener('scroll', handleSetScrollListener)
    handleSetScrollListener()

    return () => {
      document.removeEventListener('scroll', handleSetScrollListener)
    }
  }, [])

  useEffect(() => {}, [navigationItems])

  useEffect(() => {
    handleScroll(window.location.hash.substr(1))
  }, [window.location.hash])

  useEffect(() => {
    const chapterNavigators = document.querySelectorAll('.story-navigator__btn')
    if (chapterNavigators.length > 0) {
      Array.from(chapterNavigators).forEach((btn) => {
        btn.onclick = handleSetChapterNavigationListeners
      })
    }
  })

  const handleSetChapterNavigationListeners = (e) => {
    const actualBtn = e.target.closest('.story-navigator__btn')
    if (actualBtn) {
      history.push('/' + language + actualBtn.dataset.navigate)
      scroll.scrollToTop()
    }
  }

  const handleSetScrollListener = () => {
    const headers = document.querySelectorAll('.story-header')
    const info = []
    Array.from(headers).forEach((header, i) => {
      const rect = header.getBoundingClientRect()
      info.push({
        id: i,
        header,
        rect,
      })
    })

    if (info) {
      let headerSlug = ''
      for (let i = 0; i < info.length; i++) {
        if (info[i].rect.top - 120 < 0) {
          const current = {
            slug: info[i].header.dataset.slug,
            id: info[i].header.id,
          }
          const next = info[i + 1]
            ? {
                slug: info[i + 1].header.dataset.slug,
                id: info[i + 1].header.id,
              }
            : null

          const prev = info[i - 1]
            ? {
                slug: info[i - 1].header.dataset.slug,
                id: info[i - 1].header.id,
              }
            : null

          if (
            jump.current?.id !== current.id ||
            jump.next?.id !== next.id ||
            jump.prev?.id !== prev.id
          ) {
            setJump({
              current,
              next,
              prev,
            })

            if (stories.length === 0) {
              setStories([...info])
            }
          }

          headerSlug = current.slug
        }
      }

      if (headerSlug) {
        document.title = headerSlug
      } else {
        document.title = language === 'en' ? 'Moruroa Files' : 'Mururoa Files'

        setJump({
          current: null,
          next: null,
          prev: null,
        })

        setStories([])
      }
    }
  }

  const handleScroll = (id) => {
    if (id) {
      const target = document.querySelector(`#${id}`)
      if (target) {
        scroller.scrollTo(id, {
          duration: 1500,
          delay: 80,
          smooth: 'easeInOutQuint',
          offset: -100,
        })
      } else {
        // update store
        const targetNav = navigationItems.find((nav) => nav.id === id)
        if (targetNav) {
          setLoading(true)
          const allStoriesState = [...allStories]
          const targetSection = allStoriesState.findIndex(
            (st) => st.src === targetNav.src,
          )
          const newStories = allStoriesState.slice(0, targetSection + 1)
          dispatch(updateMoruroaFileCurrentStories(newStories))

          setTimeout(() => {
            scroller.scrollTo(id, {
              duration: 1500,
              delay: 80,
              smooth: 'easeInOutQuint',
              offset: -100,
            })

            setLoading(false)
          }, 1100)
        }
      }
    }
  }

  return (
    <>
      <Loader active={loading} />
      <ol className={classes['stories-navigation']}>
        {navigationItems.map((story) => (
          <li
            onClick={() => handleScroll(story.id)}
            className={classNames(classes['story-navigation'], {
              [classes['story-navigation--active']]:
                story.id === jump?.current?.id,
            })}
            key={story.id}
          >
            {language === 'en' ? story.textEN : story.textFR}
          </li>
        ))}
      </ol>
    </>
  )
}

export default StoryJump
