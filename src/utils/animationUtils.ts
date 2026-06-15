/*
 definition ::  Generally component fade in out
 createdDate :: 2023-07-14T11:17:09.000-05:00
*/
export const formAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/*
 definition ::  For input box error animation
 createdDate :: 2023-07-14T11:17:09.000-05:00
*/
export const inputBoxErrorAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

/*
 definition ::  For input box error animation
 createdDate :: 2023-07-14T11:17:09.000-05:00
*/
export const checkBoxErrorAnimation = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
  transition: { duration: 0.2 },
};

/*
 definition :: Dropdown animation for subheader
 createdDate :: 2023-09-08T09:55:36.000-05:00
*/
export const subHeaderDropdownAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

/*
 definition :: Dropdown animation for siderbar left
 createdDate :: 2023-09-08T09:55:36.000-05:00
*/
export const dropdownAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};
