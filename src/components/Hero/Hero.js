import classes from './Hero.module.scss'

import classNames from 'classnames'

const Hero = ({ title, align }) => {
  return (
    <header className={classes.container}>
      <div
        className={classNames(classes.content, {
          [classes.left]: align === 'left',
          [classes.right]: align === 'right',
        })}
      >
        <h1>{title}</h1>
      </div>
    </header>
  )
}

export default Hero
