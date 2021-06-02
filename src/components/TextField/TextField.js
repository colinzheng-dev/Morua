import classes from './TextField.module.scss'

const TextField = (props) => {
  const { className } = props

  return (
    <div className={classes.container}>
      <input
        type="text"
        {...props}
        className={`${classes.input} ${className}`}
      />
    </div>
  )
}

export default TextField
