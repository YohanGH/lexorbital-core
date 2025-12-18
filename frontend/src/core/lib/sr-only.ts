/**
 * Class to hide visually but keep accessible to screen readers
 */
export const srOnly = "sr-only"

/**
 * Class to make an element visible only when focused
 */
export const visuallyHiddenUnlessFocused = `
  sr-only 
  focus:not-sr-only 
  focus:absolute 
  focus:top-0 
  focus:left-0 
  focus:z-50 
  focus:p-4 
  focus:bg-white 
  focus:text-black 
  focus:border 
  focus:border-primary-500
`
