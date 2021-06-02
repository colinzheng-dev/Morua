import classes from './Button.module.scss'

const Button = (props) => {
  const { className } = props

  return (
    <button {...props} className={`${classes.button} ${className}`}>
      {props.children}
    </button>
  )
}

export default Button
