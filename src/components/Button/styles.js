import { addOpacity } from '../../lib/utils'
const baseStyles = {
  display: 'inline-flex',
  appearance: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 250ms',
  userSelect: 'none',
  position: 'relative',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  lineHeight: '1.2',
  outline: 'none'
}

/**
 * Size values
 */
const sizes = {
  lg: {
    height: 12,
    minWidth: 12,
    fontSize: 'lg',
    px: 6,
    py: 4
  },
  md: {
    height: 10,
    minWidth: 10,
    fontSize: 'md',
    px: 4,
    py: 3
  },
  sm: {
    height: 8,
    minWidth: 8,
    fontSize: 'sm',
    px: 3,
    py: 2
  },
  xs: {
    height: 6,
    minWidth: 6,
    fontSize: 'xs',
    px: 2,
    py: 1
  }
}

/**
 * @description Determines size props
 * @param {Object} param0 Props object
 * @returns {Object} Size style props
 */
const sizeProps = ({ size }) => sizes[size]

/**
 * @description Get solid button style values
 * @param {Object} props - Style props object
 * @returns {Object} - Solid styles object
 */
const getSolidStyles = ({ color, colorMode }) => {
  let style = {
    light: {
      bg: `${color}.400`,
      color: `${color}.50`,
      _hover: {
        bg: `${color}.500`
      },
      _active: {
        bg: `${color}.600`
      }
    }
  }
  return style[colorMode]
}

/**
 * @description Get ghost button style values
 * @param {Object} props - Style Props
 * @returns {Object} - Ghost styles object
 */
const getGhostStyles = ({ color, colorMode, theme }) => {
  const _theme = theme()
  const _color = _theme.colors[color] && _theme.colors[color][200]
  let result = {
    light: {
      color: `${color}.400`,
      bg: `${color}.50`,
      _hover: {
        bg: `${color}.100`
      },
      _active: {
        bg: `${color}.200`
      }
    },
    dark: {
      color: `${color}.200`,
      bg: 'transparent',
      _hover: {
        bg: addOpacity(_color, 0.12)
      },
      _active: {
        bg: addOpacity(_color, 0.24)
      }
    }
  }
  return result[colorMode]
}

/**
 * @description Get flat button style values
 * @param {Object} props - Style Props
 * @returns {Object} - Ghost styles object
 */
const getFlatStyles = ({ color, colorMode, theme }) => {
  const _theme = theme()
  const _color = _theme.colors[color] && _theme.colors[color][200]
  let result = {
    light: {
      color: `${color}.400`,
      bg: 'transparent',
      _hover: {
        bg: `${color}.50`
      },
      _active: {
        bg: `${color}.100`
      }
    },
    dark: {
      color: `${color}.200`,
      bg: 'transparent',
      _hover: {
        bg: addOpacity(_color, 0.12)
      },
      _active: {
        bg: addOpacity(_color, 0.24)
      }
    }
  }
  return result[colorMode]
}

/**
 * @description Get outline button style values
 * @param {Object} props - Style props object
 * @returns {Object} - Solid styles object
 */
const getOutlineStyles = props => {
  const { color, colorMode } = props
  const borderColor = { light: 'gray.200', dark: 'whiteAlpha.300' }

  return {
    border: '1px',
    borderColor: color === 'gray' ? borderColor[colorMode] : 'current',
    ...getFlatStyles(props)
  }
}

/**
 * @description Get link button style values
 * @param {Object} props - Style props object
 * @returns {Object} - Solid styles object
 */
const getLinkStyles = ({ color, colorMode }) => {
  const _color = { light: `${color}.400`, dark: `${color}.200` }
  const _activeColor = { light: `${color}.700`, dark: `${color}.500` }
  return {
    p: 0,
    height: 'auto',
    lineHeight: 'normal',
    color: _color[colorMode],
    _hover: {
      textDecoration: 'underline'
    },
    _active: {
      color: _activeColor[colorMode]
    }
  }
}

/**
 * @description Determines styles for a given v
 * @param {Object} props - Props Object
 * @returns {Object} - Variant styles object
 */
const getVariantStyles = (props) => {
  switch (props.variant) {
    case 'solid':
      return getSolidStyles(props)
    case 'outline':
      return getOutlineStyles(props)
    case 'ghost':
      return getGhostStyles(props)
    case 'flat':
      return getFlatStyles(props)
    case 'link':
      return getLinkStyles(props)
    default:
      return {}
  }
}

/**
 * Button focus styles
 */
const focusStyles = {
  _focus: {
    outline: 'none',
    boxShadow: 'outline'
  }
}

/**
 * @description Generates Button styles based on passed variant props and theme colors.
 * @param {{color: String|Array<String>, theme: Object, colorMode: String, size: String|Array<String>}} props - Style props object
 * @returns {Object} Style object to be passed to styled component
 * @todo Pass the `theme` from the ThemeProvider context. Will need to create a context provider for theme.
 */
const createButtonStyles = (props) => {
  return {
    ...baseStyles,
    ...focusStyles,
    ...sizeProps(props),
    ...getVariantStyles(props)
  }
}

export default createButtonStyles
