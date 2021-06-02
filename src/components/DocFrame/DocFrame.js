import Iframe from 'react-iframe'

import classes from './DocFrame.module.scss'

function DocFrame(props) {
  const docPath = props.location.state.path
  return (
    <div className={classes['container']}> 
      <iframe className={classes['responsive-iframe']} src={docPath}></iframe>
    </div>
  )
}

export default DocFrame