import classes from './Loader.module.scss'
import { ReactComponent as LoadingIcon } from '../../assets/icons/loader.svg'

const Loader = ({ active }) => {
  return (
    <>
      {active && (
        <div className={classes.container}>
          <LoadingIcon className={classes.icon} />
          <span className={classes.text}>Loading, please wait</span>
        </div>
      )}
    </>
  )
}

export default Loader
